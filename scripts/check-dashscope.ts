import { config } from 'dotenv';

config({ path: '.env.local' });
config();

const apiKey =
  process.env.ALIBABA_DASHSCOPE_API_KEY || process.env.DASHSCOPE_API_KEY;

if (!apiKey) {
  console.error(
    'Missing ALIBABA_DASHSCOPE_API_KEY or DASHSCOPE_API_KEY in .env.local'
  );
  process.exit(1);
}

async function main() {
  const response = await fetch(
    'https://dashscope.aliyuncs.com/api/v1/tasks/not-a-real-task-id',
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const text = await response.text();
  let data: unknown = text;
  try {
    data = JSON.parse(text);
  } catch {}

  if (response.status === 401 || response.status === 403) {
    console.error('DashScope auth failed. Check API key or permissions.');
    console.error(data);
    process.exit(1);
  }

  if (response.status === 404 || response.status === 400) {
    console.log('DashScope auth looks OK.');
    console.log(
      'The test task is intentionally invalid, so this response is expected.'
    );
    console.log(data);
    return;
  }

  if (!response.ok) {
    console.error(`DashScope request failed with status ${response.status}.`);
    console.error(data);
    process.exit(1);
  }

  console.log('DashScope request succeeded.');
  console.log(data);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
