
export type MediaType = 'IMAGE' | 'VIDEO';

export interface ItemError {
  field: string;
  message: string;
}

export interface ErrorResponseDto {
  code: string;
  message: string;
  timestamp: string;
  traceId?: string;
  details?: Array<ItemError>;
}

export interface MediaDto {
  isUploading?: boolean;
  isUploaded?: boolean;
  file?: File;
  id?: string;
  thumbnailUrl: string;
  url: string;
  type: MediaType;
}

export interface RejectRequest {
  reason: string;
}