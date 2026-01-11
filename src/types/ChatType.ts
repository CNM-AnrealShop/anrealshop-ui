export interface ChatMessage {
  id?: string;
  content: string;
  sender: "user" | "ai";
  type: "TEXT" | "MEDIA";
  timestamp: string;
  responseType?: "Greeting" | "NotFashion" | "Normal";
  imageUrl?: string;
  imageUrls?: string[];
}

export interface ChatResponse {
  message: string;
  type?: "Greeting" | "NotFashion" | "Normal";
  imageUrl?: string;
  imageUrls?: string[];
}

export interface ChatHistoryResponse {
  data: {
    messages: ChatMessage[];
    userId: string;
  };
  message: string;
}

export interface SaveBatchRequest {
  messages: ChatMessage[];
}

export interface SaveBatchResponse {
  data: {
    saved_count: number;
    user_id: string;
  };
  message: string;
}
