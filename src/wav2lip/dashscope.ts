import type {
  DashScopeCreateResponse,
  DashScopeStatusResponse,
  Wav2LipStatusResult,
  Wav2LipTaskStatus,
} from './types';

const API_BASE_URL = 'https://dashscope.aliyuncs.com';
const VIDEO_SYNTHESIS_ENDPOINT =
  '/api/v1/services/aigc/image2video/video-synthesis/';
const FACE_DETECT_ENDPOINT = '/api/v1/services/aigc/image2video/face-detect';
const TASK_STATUS_ENDPOINT = '/api/v1/tasks/';

type Wav2LipProviderMode = 'videoretalk' | 'emo';

interface EmoDetectResponse {
  output?: {
    check_pass?: boolean;
    humanoid?: boolean;
    face_bbox?: number[];
    ext_bbox?: number[];
    code?: string;
    message?: string;
  };
  request_id?: string;
  [key: string]: unknown;
}

export class Wav2LipProviderError extends Error {
  code?: string;
  details?: unknown;

  constructor(message: string, code?: string, details?: unknown) {
    super(message);
    this.name = 'Wav2LipProviderError';
    this.code = code;
    this.details = details;
  }
}

function getDashScopeApiKey() {
  const apiKey =
    process.env.ALIBABA_DASHSCOPE_API_KEY || process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    throw new Wav2LipProviderError(
      'Missing ALIBABA_DASHSCOPE_API_KEY or DASHSCOPE_API_KEY environment variable'
    );
  }
  return apiKey;
}

async function dashScopeRequest<T>(
  method: 'GET' | 'POST',
  path: string,
  body?: unknown,
  extraHeaders?: HeadersInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${getDashScopeApiKey()}`,
      'Content-Type': 'application/json',
      'X-DashScope-OssResourceResolve': 'enable',
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Wav2LipProviderError(
      errorData.message || `DashScope request failed: ${response.status}`,
      errorData.code,
      errorData
    );
  }

  return response.json() as Promise<T>;
}

export async function createDashScopeWav2LipTask({
  videoUrl,
  audioUrl,
  refImageUrl,
  videoExtension = false,
}: {
  videoUrl: string;
  audioUrl: string;
  refImageUrl?: string;
  videoExtension?: boolean;
}) {
  const data = await dashScopeRequest<DashScopeCreateResponse>(
    'POST',
    VIDEO_SYNTHESIS_ENDPOINT,
    {
      model: 'videoretalk',
      input: {
        video_url: videoUrl,
        audio_url: audioUrl,
        ...(refImageUrl ? { ref_image_url: refImageUrl } : {}),
      },
      parameters: {
        video_extension: videoExtension,
      },
    },
    {
      'X-DashScope-Async': 'enable',
    }
  );

  const taskId = data.output?.task_id;
  if (!taskId) {
    throw new Wav2LipProviderError('DashScope response missing task_id');
  }

  return {
    taskId,
    providerResponse: {
      providerMode: 'videoretalk' satisfies Wav2LipProviderMode,
      createResponse: data,
    },
  };
}

export async function createDashScopeEmoTask({
  imageUrl,
  audioUrl,
}: {
  imageUrl: string;
  audioUrl: string;
}) {
  const detectData = await dashScopeRequest<EmoDetectResponse>(
    'POST',
    FACE_DETECT_ENDPOINT,
    {
      model: 'emo-detect-v1',
      input: {
        image_url: imageUrl,
      },
      parameters: {
        ratio: '1:1',
      },
    }
  );

  if (!detectData.output?.check_pass) {
    throw new Wav2LipProviderError(
      detectData.output?.message ||
        'No valid face was detected in the reference image',
      detectData.output?.code,
      detectData
    );
  }

  const { face_bbox: faceBbox, ext_bbox: extBbox } = detectData.output;
  if (!faceBbox || !extBbox) {
    throw new Wav2LipProviderError(
      'DashScope EMO detection response missing face bounding boxes',
      undefined,
      detectData
    );
  }

  const createData = await dashScopeRequest<DashScopeCreateResponse>(
    'POST',
    VIDEO_SYNTHESIS_ENDPOINT,
    {
      model: 'emo-v1',
      input: {
        image_url: imageUrl,
        audio_url: audioUrl,
        face_bbox: faceBbox,
        ext_bbox: extBbox,
      },
      parameters: {
        style_level: 'normal',
      },
    },
    {
      'X-DashScope-Async': 'enable',
    }
  );

  const taskId = createData.output?.task_id;
  if (!taskId) {
    throw new Wav2LipProviderError('DashScope EMO response missing task_id');
  }

  return {
    taskId,
    providerResponse: {
      providerMode: 'emo' satisfies Wav2LipProviderMode,
      detectResponse: detectData,
      createResponse: createData,
    },
  };
}

function mapDashScopeStatus(status?: string): Wav2LipTaskStatus {
  switch (status) {
    case 'PENDING':
      return 'pending';
    case 'PRE-PROCESSING':
    case 'RUNNING':
    case 'POST-PROCESSING':
      return 'running';
    case 'SUCCEEDED':
      return 'succeeded';
    case 'FAILED':
      return 'failed';
    case 'UNKNOWN':
      return 'unknown';
    default:
      return 'unknown';
  }
}

export async function queryDashScopeWav2LipTask(
  taskId: string
): Promise<Wav2LipStatusResult> {
  const data = await dashScopeRequest<DashScopeStatusResponse>(
    'GET',
    `${TASK_STATUS_ENDPOINT}${taskId}`
  );

  if (!data.output?.task_id) {
    throw new Wav2LipProviderError('DashScope status response missing task_id');
  }

  return {
    taskId: data.output.task_id,
    status: mapDashScopeStatus(data.output.task_status),
    outputUrl: data.output.video_url || data.output.results?.video_url,
    error: data.output.message || data.output.code,
    providerResponse: data,
  };
}
