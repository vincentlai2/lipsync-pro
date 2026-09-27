type Metadata = Record<string, string | undefined> | null;

// Support both older invoice payloads and the Basil parent structure.
type EventObject = {
  metadata?: Metadata;
  subscription_details?: { metadata?: Metadata } | null;
  parent?: {
    subscription_details?: { metadata?: Metadata } | null;
  } | null;
  lines?: { data: { metadata?: Metadata }[] };
};

/** Only skip events with explicit foreign ownership; keep legacy events working. */
export function isForeignStripeEvent(
  object: EventObject,
  siteId: string
): boolean {
  const metadataSources = [
    object.metadata,
    object.subscription_details?.metadata,
    object.parent?.subscription_details?.metadata,
    ...(object.lines?.data.map((line) => line.metadata) ?? []),
  ];
  const owners = new Set(
    metadataSources.flatMap((metadata) =>
      [metadata?.siteId, metadata?.project]
        .map((owner) => owner?.trim().toLowerCase())
        .filter((owner): owner is string => Boolean(owner))
    )
  );

  // Conflicting metadata must fail visibly, never silently discard a payment.
  if (owners.size > 1) {
    throw new Error('Conflicting Stripe event ownership metadata');
  }

  return owners.size === 1 && !owners.has(siteId);
}
