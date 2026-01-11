import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, ChatResponse } from "../../types/ChatType";
import { ChatService } from "../../service/ChatService";
import { useAppSelector } from "../../hooks/useAppRedux";
import "./ChatBox.css";

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
      return <div className="chatbox-message-text">{content}</div>;
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
          <div className="chatbox-message-text">
            {products.map((product, idx) => (
              <div key={idx} className="chatbox-product-block">
                <div className="chatbox-product-text">{product.trim()}</div>
                {imageUrls[idx] && (
                  <div className="chatbox-message-image">
                    <img
                      src={imageUrls[idx]}
                      alt={`Sản phẩm ${idx + 1}`}
                      loading="lazy"
                      onClick={() => openImageModal(imageUrls[idx])}
                    />
                  </div>
                )}
              </div>
            ))}
            {content.replace(productRegex, "").trim() && (
              <div className="chatbox-footer-text">
                {content.replace(productRegex, "").trim()}
              </div>
            )}
          </div>
        );
      }

      return (
        <div className="chatbox-message-text">
          {content}
          {imageUrls.length > 0 && (
            <div className="chatbox-message-images-inline">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="chatbox-message-image">
                  <img
                    src={url}
                    alt={`Hình ${idx + 1}`}
                    loading="lazy"
                    onClick={() => openImageModal(url)}
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
      <div className="chatbox-message-text">
        {parts.map((part, idx) => {
          const currentImageIndex = imageIndex;
          const hasImage =
            idx < parts.length - 1 && imageUrls[currentImageIndex];
          if (hasImage) imageIndex++;
          return (
            <span key={idx}>
              {part}
              {hasImage && (
                <div className="chatbox-message-image-inline">
                  <img
                    src={imageUrls[currentImageIndex]}
                    alt={`Hình ${currentImageIndex + 1}`}
                    loading="lazy"
                    onClick={() => openImageModal(imageUrls[currentImageIndex])}
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
      <button className="chatbox-toggle-btn" onClick={toggleChat}>
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
    <div className="chatbox-container">
      <div className="chatbox-header">
        <div className="chatbox-header-title">
          <span>Trợ lý Anreal Shop</span>
        </div>
        <div className="chatbox-header-actions">
          {messages.length > 0 && (
            <button
              className="chatbox-delete-btn"
              onClick={handleDeleteClick}
              title="Xóa cuộc trò chuyện"
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
          <button className="chatbox-close-btn" onClick={toggleChat}>
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

      <div className="chatbox-messages">
        {messages.length === 0 ? (
          <div className="chatbox-welcome">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chatbox-message ${
                msg.sender === "user"
                  ? "chatbox-message-user"
                  : "chatbox-message-ai"
              }`}
            >
              <div className="chatbox-message-content">
                {msg.sender === "ai" ? (
                  renderMessageContent(msg)
                ) : (
                  <div className="chatbox-message-text">{msg.content}</div>
                )}
              </div>
              <span className="chatbox-message-time">
                {formatTime(msg.timestamp)}
              </span>
            </div>
          ))
        )}

        {isLoading && (
          <div className="chatbox-message chatbox-message-ai">
            <div className="chatbox-message-content chatbox-typing">
              Đang xử lý...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="chatbox-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chatbox-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="chatbox-send-btn"
          disabled={isLoading || !input.trim()}
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

      {selectedImage && (
        <div className="chatbox-image-modal" onClick={closeImageModal}>
          <div
            className="chatbox-image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="chatbox-image-modal-close"
              onClick={closeImageModal}
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
            <img src={selectedImage} alt="Xem ảnh đầy đủ" />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="chatbox-delete-modal" onClick={handleCancelDelete}>
          <div
            className="chatbox-delete-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Xóa cuộc trò chuyện ?</h3>
            <p>
              Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện? Hành động này
              không thể hoàn tác.
            </p>
            <div className="chatbox-delete-modal-actions">
              <button
                className="chatbox-delete-modal-cancel"
                onClick={handleCancelDelete}
                disabled={isDeleting}
              >
                Hủy
              </button>
              <button
                className="chatbox-delete-modal-confirm"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
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
