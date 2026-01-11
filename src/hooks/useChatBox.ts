import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, ChatResponse } from "../types/ChatType";
import { ChatService } from "../service/ChatService";
import { useAppSelector } from "./useAppRedux";

const DEBOUNCE_TIME = 15000;

export const useChatbox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const unsavedMessagesRef = useRef<ChatMessage[]>([]);

  const filterMessagesForSave = (msgs: ChatMessage[]): ChatMessage[] => {
    return msgs.filter(
      (msg) =>
        msg.content !== "Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau." &&
        msg.content !== "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại."
    );
  };

  const saveBatchToBackend = useCallback(async () => {
    if (!isAuthenticated || unsavedMessagesRef.current.length === 0) {
      return;
    }

    const filteredMessages = filterMessagesForSave(unsavedMessagesRef.current);

    if (filteredMessages.length === 0) {
      unsavedMessagesRef.current = [];
      return;
    }

    try {
      await ChatService.saveBatchMessages(filteredMessages);
      unsavedMessagesRef.current = [];
    } catch (error) {
      console.error("Thất bại trong việc lưu message:", error);
    }
  }, [isAuthenticated]);

  const resetDebounceTimer = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      saveBatchToBackend();
    }, DEBOUNCE_TIME);
  }, [saveBatchToBackend]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      content: content.trim(),
      sender: "user",
      type: "TEXT",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    unsavedMessagesRef.current.push(userMessage);
    setIsLoading(true);

    try {
      const aiResponse: ChatResponse = await ChatService.sendMessageToAI(
        content.trim()
      );

      const aiMessage: ChatMessage = {
        content: aiResponse.message,
        sender: "ai",
        type: aiResponse.imageUrl ? "MEDIA" : "TEXT",
        timestamp: new Date().toISOString(),
        responseType: aiResponse.type || "Normal",
        imageUrl: aiResponse.imageUrl,
      };

      setMessages((prev) => [...prev, aiMessage]);
      unsavedMessagesRef.current.push(aiMessage);

      resetDebounceTimer();
    } catch (error) {
      const errorMessage: ChatMessage = {
        content: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.",
        sender: "ai",
        type: "TEXT",
        timestamp: new Date().toISOString(),
        responseType: "Normal",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isOpen && messages.length === 0) {
      ChatService.getChatHistory()
        .then((response) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = (response as any).data || response;
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        })
        .catch((error) => {
          console.error("Thất bại trong việc lấy lịch sử chat:", error);
        });
    }
  }, [isAuthenticated, isOpen, messages.length]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (unsavedMessagesRef.current.length > 0) {
        saveBatchToBackend();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      saveBatchToBackend();
    };
  }, [saveBatchToBackend]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const clearChat = () => {
    setMessages([]);
    unsavedMessagesRef.current = [];
  };

  return {
    messages,
    isLoading,
    isOpen,
    isAuthenticated,
    sendMessage,
    toggleChat,
    clearChat,
  };
};
