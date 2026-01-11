import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, ChatResponse } from "../../types/ChatType";
import { ChatService } from "../../service/ChatService";
import { useAppSelector } from "../../hooks/useAppRedux";

const DEBOUNCE_TIME = 15000;

export const useChatbox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const unsavedMessagesRef = useRef<ChatMessage[]>([]);
  const isSavingRef = useRef(false);

  const filterMessagesForSave = (msgs: ChatMessage[]): ChatMessage[] => {
    return msgs.filter(
      (msg) =>
        msg.content !== "Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau." &&
        msg.content !== "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại."
    );
  };

  const saveBatchToBackend = useCallback(async () => {
    if (
      !isAuthenticated ||
      unsavedMessagesRef.current.length === 0 ||
      isSavingRef.current
    ) {
      return;
    }

    const filteredMessages = filterMessagesForSave(unsavedMessagesRef.current);

    if (filteredMessages.length === 0) {
      unsavedMessagesRef.current = [];
      return;
    }

    isSavingRef.current = true;
    const messagesToSave = [...filteredMessages];
    unsavedMessagesRef.current = [];

    try {
      await ChatService.saveBatchMessages(messagesToSave);
    } catch (error) {
      console.error("Failed to save messages:", error);
      unsavedMessagesRef.current = [
        ...messagesToSave,
        ...unsavedMessagesRef.current,
      ];
    } finally {
      isSavingRef.current = false;
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
        content.trim(),
        user?.id
      );

      const aiMessage: ChatMessage = {
        content: aiResponse.message,
        sender: "ai",
        type:
          aiResponse.imageUrl ||
          (aiResponse.imageUrls && aiResponse.imageUrls.length > 0)
            ? "MEDIA"
            : "TEXT",
        timestamp: new Date().toISOString(),
        responseType: aiResponse.type || "Normal",
        imageUrl: aiResponse.imageUrl,
        imageUrls: aiResponse.imageUrls,
      };

      setMessages((prev) => [...prev, aiMessage]);

      unsavedMessagesRef.current.push(aiMessage);

      resetDebounceTimer();
    } catch (error) {
      console.error("Error sending message:", error);
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
    if (isAuthenticated && isOpen && !isHistoryLoaded) {
      ChatService.getChatHistory()
        .then((response) => {
          const data = (response as any).data || response;
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
          setIsHistoryLoaded(true);
        })
        .catch(() => {
          setIsHistoryLoaded(true);
        });
    }
  }, [isAuthenticated, isOpen, isHistoryLoaded]);

  useEffect(() => {
    if (!isAuthenticated) {
      setMessages([]);
      setIsHistoryLoaded(false);
      unsavedMessagesRef.current = [];
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (unsavedMessagesRef.current.length > 0) {
        const filteredMessages = filterMessagesForSave(
          unsavedMessagesRef.current
        );
        if (filteredMessages.length > 0) {
          navigator.sendBeacon(
            `${import.meta.env.VITE_BASE_API_URL}/chat/messages`,
            new Blob([JSON.stringify({ messages: filteredMessages })], {
              type: "application/json",
            })
          );
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveBatchToBackend();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      saveBatchToBackend();
    };
  }, [saveBatchToBackend]);

  const toggleChat = () => {
    if (isOpen && unsavedMessagesRef.current.length > 0) {
      saveBatchToBackend();
    }
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

export const ChatBox = () => {
  const {
    messages,
    isLoading,
    isOpen,
    isAuthenticated,
    sendMessage,
    toggleChat,
    clearChat,
  } = useChatbox();

  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await ChatService.clearChatHistory();
      clearChat();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to clear chat history:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessageContent = (msg: ChatMessage) => {
    const content = msg.content;
    const imageUrls = msg.imageUrls || (msg.imageUrl ? [msg.imageUrl] : []);

    if (imageUrls.length === 0) {
      return <div className="flex-1 whitespace-pre-wrap">{content}</div>;
    }
    const parts = content.split("[HÌNH ẢNH]");

    if (parts.length === 1) {
      const productRegex = /(\d+\.\s+[^\d]+?)(?=\d+\.\s+|$)/gs;
      const products = content.match(productRegex);

      if (
        products &&
        products.length > 0 &&
        imageUrls.length >= products.length
      ) {
        return (
          <div className="flex-1 whitespace-pre-wrap">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="mb-4 pb-3 border-b border-gray-100 last:border-b-0 last:mb-2"
              >
                <div className="whitespace-pre-wrap mb-2">{product.trim()}</div>
                {imageUrls[idx] && (
                  <div className="my-2 rounded-lg overflow-hidden max-w-[180px] shadow-sm">
                    <img
                      src={imageUrls[idx]}
                      alt={`Sản phẩm ${idx + 1}`}
                      loading="lazy"
                      onClick={() => openImageModal(imageUrls[idx])}
                      className="w-full h-auto max-h-36 object-cover block cursor-pointer rounded-md transition-transform duration-200 hover:scale-[1.03]"
                    />
                  </div>
                )}
              </div>
            ))}
            {content.replace(productRegex, "").trim() && (
              <div className="mt-2 pt-2 border-t border-gray-100 italic text-gray-500">
                {content.replace(productRegex, "").trim()}
              </div>
            )}
          </div>
        );
      }

      return (
        <div className="flex-1 whitespace-pre-wrap">
          {content}
          {imageUrls.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden max-w-[120px] shadow-sm"
                >
                  <img
                    src={url}
                    alt={`Hình ${idx + 1}`}
                    loading="lazy"
                    onClick={() => openImageModal(url)}
                    className="w-full h-auto max-h-24 object-cover block cursor-pointer rounded-md transition-transform duration-200 hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    let imageIndex = 0;
    return (
      <div className="flex-1 whitespace-pre-wrap">
        {parts.map((part, idx) => {
          const currentImageIndex = imageIndex;
          const hasImage =
            idx < parts.length - 1 && imageUrls[currentImageIndex];
          if (hasImage) imageIndex++;
          return (
            <span key={idx}>
              {part}
              {hasImage && (
                <div className="my-2 rounded-lg overflow-hidden max-w-[180px] shadow-sm">
                  <img
                    src={imageUrls[currentImageIndex]}
                    alt={`Hình ${currentImageIndex + 1}`}
                    loading="lazy"
                    onClick={() => openImageModal(imageUrls[currentImageIndex])}
                    className="w-full h-auto max-h-36 object-cover block cursor-pointer rounded-md transition-transform duration-200 hover:scale-[1.03]"
                  />
                </div>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white border-none cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 z-[1000] hover:scale-110 hover:shadow-xl"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-[1000] overflow-hidden max-md:w-full max-md:h-screen max-md:bottom-0 max-md:right-0 max-md:rounded-none">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 bg-primary text-white">
        <div className="flex items-center gap-2 font-semibold text-base">
          <span>Trợ lý Anreal Shop</span>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleDeleteClick}
              title="Xóa cuộc trò chuyện"
              className="bg-transparent border-none text-white cursor-pointer p-1.5 rounded opacity-80 transition-all duration-200 hover:bg-white/20 hover:opacity-100"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          )}
          <button
            onClick={toggleChat}
            className="bg-transparent border-none text-white cursor-pointer p-1 rounded transition-colors duration-200 hover:bg-white/20"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center gap-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-[75%] ${
                msg.sender === "user" ? "self-end" : "self-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-xl break-words leading-relaxed text-sm flex flex-col gap-2 ${
                  msg.sender === "user"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-white text-gray-700 border border-gray-200 rounded-bl-sm"
                }`}
              >
                {msg.sender === "ai" ? (
                  renderMessageContent(msg)
                ) : (
                  <div className="flex-1 whitespace-pre-wrap">
                    {msg.content}
                  </div>
                )}
              </div>
              <span
                className={`text-[11px] text-gray-500 mt-1 px-1 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                {formatTime(msg.timestamp)}
              </span>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex flex-col max-w-[75%] self-start">
            <div className="px-4 py-3 rounded-xl bg-white text-gray-700 border border-gray-200 rounded-bl-sm flex items-center gap-2">
              <span className="animate-pulse">Đang xử lý...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex p-4 bg-white border-t border-gray-200 gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm outline-none transition-colors duration-200 focus:border-primary disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="w-11 h-11 rounded-full border-none bg-primary text-white cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <svg
              className="animate-spin"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </form>

      {/* Image Modal */}
      {selectedImage && (
        <div
          onClick={closeImageModal}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[2000]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-10 -right-2.5 bg-white/20 border-none rounded-full w-9 h-9 cursor-pointer flex items-center justify-center text-white transition-all duration-200 hover:bg-white/30 hover:scale-110 max-md:top-2.5 max-md:right-2.5"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Xem ảnh đầy đủ"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          onClick={handleCancelDelete}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[2000]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-[320px] w-[90%] text-center shadow-2xl"
          >
            <h3 className="m-0 mb-2 text-lg font-semibold text-gray-800">
              Xóa cuộc trò chuyện?
            </h3>
            <p className="m-0 mb-5 text-sm text-gray-500 leading-relaxed">
              Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện? Hành động này
              không thể hoàn tác.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 border-none bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 border-none bg-red-500 text-white hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
