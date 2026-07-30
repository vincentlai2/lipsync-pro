export type Wav2LipTaskStatus =
  | 'pending'
  | 'running'
  | 'succeeded'
  | 'failed'
  | 'unknown';

export interface DashScopeCreateResponse {
  output?: {
    task_id?: string;
  };
  request_id?: string;
  [key: string]: unknown;
}

export interface DashScopeStatusResponse {
  output?: {
    task_id?: string;
    task_status?: string;
    video_url?: string;
    results?: {
      video_url?: string;
    };
    code?: string;
    message?: string;
  };
  request_id?: string;
  [key: string]: unknown;
}

export interface Wav2LipStatusResult {
  taskId: string;
  status: Wav2LipTaskStatus;
  outputUrl?: string;
  error?: string;
  providerResponse: DashScopeStatusResponse;
}
