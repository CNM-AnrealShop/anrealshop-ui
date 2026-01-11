import { axiosInstance } from "./AxiosInstant";
import { API_ENDPOINTS } from "../constant";
import type {
  ChatMessage,
  ChatResponse,
  ChatHistoryResponse,
  SaveBatchRequest,
  SaveBatchResponse,
} from "../types/ChatType";

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export const ChatService = {
  async sendMessageToAI(
    message: string,
    userId?: string
  ): Promise<ChatResponse> {
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatInput: message, userId: userId || null }),
      });

      if (!response.ok) {
        throw new Error("Thất bại gọi đến trợ lý AI");
      }

      const data = await response.json();
      return {
        message: data.message || "Xin lỗi, tôi không hiểu câu hỏi này.",
        type: data.type || "Normal",
        imageUrl: data.imageUrl || null,
        imageUrls: data.imageUrls || undefined,
      };
    } catch (error) {
      console.error("Error calling n8n webhook:", error);
      return {
        message: "Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau.",
        type: "Normal",
      };
    }
  },

  async saveBatchMessages(messages: ChatMessage[]): Promise<SaveBatchResponse> {
    const response = await axiosInstance.post<SaveBatchResponse>(
      API_ENDPOINTS.CHAT_AI.SAVE_MESSAGES,
      { messages } as SaveBatchRequest
    );
    return response.data;
  },

  async getChatHistory(limit: number = 50): Promise<ChatHistoryResponse> {
    const response = await axiosInstance.get<ChatHistoryResponse>(
      API_ENDPOINTS.CHAT_AI.GET_HISTORY(limit)
    );
    return response.data;
  },

  async clearChatHistory(): Promise<{
    data: { deleted_count: number; user_id: string };
    message: string;
  }> {
    const response = await axiosInstance.delete<{
      data: { deleted_count: number; user_id: string };
      message: string;
    }>(API_ENDPOINTS.CHAT_AI.CLEAR);
    return response.data;
  },
};
