import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Stripe } from 'stripe';
import { StripeProvider } from './stripe';
import { isForeignStripeEvent } from './stripe-event-ownership';

test('recognizes project metadata in old and Basil invoice payloads', () => {
  const metadata = { project: 'wav2lip.pro' };
  for (const object of [
    { metadata },
    { subscription_details: { metadata } },
    { parent: { subscription_details: { metadata } } },
    { lines: { data: [{ metadata }] } },
  ]) {
    assert.equal(isForeignStripeEvent(object, 'lipsync.pro'), true);
  }
});

test('preserves local and untagged historical events for both tenants', () => {
  for (const siteId of ['lipsync.pro', 'wav2lipia.com']) {
    assert.equal(isForeignStripeEvent({ metadata: { siteId } }, siteId), false);
    assert.equal(isForeignStripeEvent({}, siteId), false);
    assert.equal(isForeignStripeEvent({ metadata: {} }, siteId), false);
  }
  assert.equal(
    isForeignStripeEvent(
      { metadata: { siteId: 'wav2lipia.com' } },
      'lipsync.pro'
    ),
    true
  );
});

test('does not silently discard conflicting ownership', () => {
  assert.throws(() =>
    isForeignStripeEvent(
      { metadata: { siteId: 'lipsync.pro', project: 'wav2lip.pro' } },
      'lipsync.pro'
    )
  );
});

test('signed foreign events bypass business handlers; local failures still reject', async (t) => {
  // Synthetic credentials only; handlers are mocked before any database/API work.
  const previousKey = process.env.STRIPE_SECRET_KEY;
  const previousSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const secret = 'whsec_local_regression_test';
  process.env.STRIPE_SECRET_KEY = 'sk_test_local_regression_test';
  process.env.STRIPE_WEBHOOK_SECRET = secret;
  const provider = new StripeProvider();
  if (previousKey === undefined) delete process.env.STRIPE_SECRET_KEY;
  else process.env.STRIPE_SECRET_KEY = previousKey;
  if (previousSecret === undefined) delete process.env.STRIPE_WEBHOOK_SECRET;
  else process.env.STRIPE_WEBHOOK_SECRET = previousSecret;

  const handlers = provider as unknown as Record<string, () => Promise<void>>;
  const checkout = t.mock.method(handlers, 'onCheckoutCompleted', async () => {
    throw new Error('Local order processing failed');
  });
  const invoice = t.mock.method(handlers, 'onInvoicePaid', async () => {});
  const subscription = t.mock.method(
    handlers,
    'onUpdateSubscription',
    async () => {}
  );
  const stripe = new Stripe('sk_test_local_regression_test');
  const send = (type: string, object: object, validSignature = true) => {
    const payload = JSON.stringify({
      id: 'evt_local_regression_test',
      object: 'event',
      type,
      data: { object },
    });
    const signature = stripe.webhooks.generateTestHeaderString({
      payload,
      secret: validSignature ? secret : 'whsec_wrong',
    });
    return provider.handleWebhookEvent(payload, signature, 'lipsync.pro');
  };

  await send('checkout.session.completed', {
    metadata: { project: 'wav2lip.pro' },
  });
  await send('invoice.paid', {
    parent: { subscription_details: { metadata: { project: 'wav2lip.pro' } } },
  });
  await send('customer.subscription.updated', {
    metadata: { project: 'wav2lip.pro' },
  });
  assert.equal(checkout.mock.callCount(), 0);
  assert.equal(invoice.mock.callCount(), 0);
  assert.equal(subscription.mock.callCount(), 0);

  await assert.rejects(
    send('checkout.session.completed', { metadata: { siteId: 'lipsync.pro' } })
  );
  assert.equal(checkout.mock.callCount(), 1);
  await send('invoice.paid', {});
  assert.equal(invoice.mock.callCount(), 1);
  await assert.rejects(
    send('invoice.paid', { metadata: { project: 'wav2lip.pro' } }, false)
  );
  assert.equal(invoice.mock.callCount(), 1);
});
