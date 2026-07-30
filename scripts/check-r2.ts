import { randomUUID } from 'crypto';
import { config } from 'dotenv';

config({ path: '.env.local' });
config();

const required = [
  'STORAGE_REGION',
  'STORAGE_ENDPOINT',
  'STORAGE_BUCKET_NAME',
  'STORAGE_ACCESS_KEY_ID',
  'STORAGE_SECRET_ACCESS_KEY',
];

const missing = required.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`Missing storage env: ${missing.join(', ')}`);
  process.exit(1);
}

async function main() {
  const { uploadFile } = await import('../src/storage');
  const marker = `wav2lip-fr-r2-check-${new Date().toISOString()}-${randomUUID()}`;
  const result = await uploadFile(
    Buffer.from(marker),
    'r2-check.txt',
    'text/plain',
    'wav2lip/health'
  );

  console.log('R2 upload OK.');
  console.log(`key: ${result.key}`);
  console.log(`url: ${result.url}`);

  const response = await fetch(result.url);
  if (!response.ok) {
    console.warn(
      `Public URL is not readable yet: ${response.status} ${response.statusText}`
    );
    console.warn(
      'Upload works, but DashScope needs STORAGE_PUBLIC_URL to be publicly readable.'
    );
    return;
  }

  const text = await response.text();
  if (text !== marker) {
    console.warn(
      'Public URL responded, but content did not match test marker.'
    );
    return;
  }

  console.log('Public URL read OK.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
