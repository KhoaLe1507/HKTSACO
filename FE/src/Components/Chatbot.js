import React, { useState, useRef, useEffect } from "react";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [chatContext, setChatContext] = useState(null);

  useEffect(() => {
    window.setChatContext = (ctx) => setChatContext(ctx);
    window.resetChatContext = () => setChatContext(null); 
  }, []);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Handle copy button clicks
    const handleCopyClick = async (e) => {
      if (e.target.classList.contains('copy-btn')) {
        const encodedCode = e.target.getAttribute('data-code');
        if (encodedCode) {
          const code = decodeURIComponent(encodedCode);
          await copyToClipboard(code);
          
          // Visual feedback
          const originalText = e.target.textContent;
          e.target.textContent = '✅ Copied!';
          e.target.style.background = '#10b981';
          
          setTimeout(() => {
            e.target.textContent = originalText;
            e.target.style.background = '#4f46e5';
          }, 2000);
        }
      }
    };

    document.addEventListener('click', handleCopyClick);
    return () => document.removeEventListener('click', handleCopyClick);
  }, []);

  useEffect(scrollToBottom, [messages]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show success feedback
      console.log('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatGeminiText = (text) => {
    let formatted = text;
    let codeBlockId = 0;

    // Xử lý code blocks với syntax highlighting
    formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
      const lang = language || 'text';
      const cleanCode = code.trim();
      const blockId = `code-${codeBlockId++}`;
      
      return `<div class="code-block" id="${blockId}">
        <div class="code-header">
          <span class="code-language">${lang}</span>
          <button class="copy-btn" data-code="${encodeURIComponent(cleanCode)}" type="button">📋 Copy</button>
        </div>
        <pre class="code-content"><code>${cleanCode}</code></pre>
      </div>`;
    });

    // Xử lý inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Xử lý bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="bold-text">$1</strong>');

    // Xử lý italic text
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic-text">$1</em>');

    // Xử lý headers
    formatted = formatted.replace(/^### (.*$)/gm, '<h3 class="header-3">$1</h3>');
    formatted = formatted.replace(/^## (.*$)/gm, '<h2 class="header-2">$1</h2>');
    formatted = formatted.replace(/^# (.*$)/gm, '<h1 class="header-1">$1</h1>');

    // Xử lý lists
    formatted = formatted.replace(/^\* (.*$)/gm, '<li class="list-item">$1</li>');
    formatted = formatted.replace(/^- (.*$)/gm, '<li class="list-item">$1</li>');
    formatted = formatted.replace(/(\n<li class="list-item">.*?<\/li>)+/gs, (match) => {
      return `<ul class="bullet-list">${match}</ul>`;
    });

    // Xử lý numbered lists
    formatted = formatted.replace(/^\d+\. (.*$)/gm, '<li class="numbered-item">$1</li>');
    formatted = formatted.replace(/(\n<li class="numbered-item">.*?<\/li>)+/gs, (match) => {
      return `<ol class="numbered-list">${match}</ol>`;
    });

    // Xử lý links
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="link">$1</a>');

    // Xử lý line breaks
    formatted = formatted.replace(/\n\n/g, '</p><p class="paragraph">');
    formatted = formatted.replace(/\n/g, '<br/>');

    // Wrap in paragraph if not already wrapped
    if (!formatted.includes('<p class="paragraph">') && !formatted.includes('<div class="code-block">')) {
      formatted = `<p class="paragraph">${formatted}</p>`;
    }

    return formatted;
  };

  const typeMessage = async (text, messageIndex) => {
    setIsTyping(true);
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + ' ';
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[messageIndex] = {
          ...newMessages[messageIndex],
          text: formatGeminiText(currentText.trim())
        };
        return newMessages;
      });
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input, timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Resize textarea back to original size
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }

    try {
    if (chatContext) {
      console.log(" Context gửi đi:");
      console.log("Type:", chatContext.type);
      console.log("ID (parseInt):", parseInt(chatContext.id));
    } else {
      console.log(" Không có context được gửi.");
    }
    const res = await fetch("https://localhost:7157/api/chatbot/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: input,
        context: chatContext ?? { type: "unknown", id: -1 }// gửi thêm context đã set từ trang
      }),
    });

      const data = await res.json();
      console.log("📨 Phản hồi gốc từ API:", data);

      const botMessage = { 
        from: "bot", 
        text: "", 
        timestamp: new Date(),
        isComplete: false 
      };
      
      setMessages([...newMessages, botMessage]);
      setIsLoading(false);
      
      // Type animation for bot response
      await typeMessage(data.reply, newMessages.length);
      
    } catch (err) {
      setMessages([
        ...newMessages,
        { 
          from: "bot", 
          text: formatGeminiText("❌ **Lỗi kết nối:** Không thể kết nối đến chatbot. Vui lòng thử lại sau."),
          timestamp: new Date(),
          isError: true
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = '40px';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      <style jsx>{`
        .chat-container * {
          box-sizing: border-box;
        }
        
        .code-block {
          background: #1e1e1e;
          border-radius: 12px;
          margin: 16px 0;
          overflow: hidden;
          border: 1px solid #374151;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .code-header {
          background: #374151;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #4b5563;
        }
        
        .code-language {
          color: #d1d5db;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .copy-btn {
          background: #4f46e5;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        
        .copy-btn:hover {
          background: #6366f1;
          transform: translateY(-1px);
        }
        
        .copy-btn:active {
          transform: translateY(0);
        }
        
        .code-content {
          margin: 0;
          padding: 20px;
          overflow-x: auto;
          background: #1e1e1e;
          font-family: 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          font-size: 14px;
          line-height: 1.6;
          color: #e5e7eb;
        }
        
        .code-content::-webkit-scrollbar {
          height: 8px;
        }
        
        .code-content::-webkit-scrollbar-track {
          background: #374151;
        }
        
        .code-content::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 4px;
        }
        
        .code-content::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        .inline-code {
          background: #f3f4f6;
          color: #dc2626;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Fira Code', Monaco, monospace;
          font-size: 13px;
          border: 1px solid #e5e7eb;
        }
        
        .bold-text {
          color: #1f2937;
          font-weight: 700;
        }
        
        .italic-text {
          color: #4b5563;
          font-style: italic;
        }
        
        .header-1, .header-2, .header-3 {
          margin: 16px 0 8px 0;
          font-weight: 700;
          line-height: 1.3;
        }
        
        .header-1 {
          font-size: 20px;
          color: #1f2937;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 4px;
        }
        
        .header-2 {
          font-size: 18px;
          color: #374151;
        }
        
        .header-3 {
          font-size: 16px;
          color: #4b5563;
        }
        
        .bullet-list, .numbered-list {
          margin: 12px 0;
          padding-left: 20px;
        }
        
        .list-item, .numbered-item {
          margin: 4px 0;
          line-height: 1.5;
        }
        
        .link {
          color: #4f46e5;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        
        .link:hover {
          border-bottom-color: #4f46e5;
        }
        
        .paragraph {
          margin: 8px 0;
          line-height: 1.6;
          color: #374151;
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
          font-style: italic;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .bounce {
          animation: bounce 0.3s ease;
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message-bubble {
          max-width: 85%;
          word-wrap: break-word;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .user-bubble {
          animation: slideInLeft 0.3s ease;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="chat-container" style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
        {!isOpen ? (
          <button
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => scrollToBottom(), 100); // 👈 cuộn xuống cuối
            }}
            
            className="bounce"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
          >
            🤖
          </button>
        ) : (
          <div
            className="fade-in"
            style={{
              width: "420px",
              height: "600px",
              background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              overflow: "hidden",
              backdropFilter: "blur(10px)"
            }}
          >
            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "20px 20px 0 0"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px"
                }}>
                  🤖
                </div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "700" }}>AlgoExpert</div>
                  <div style={{ fontSize: "12px", opacity: "0.8" }}>
                    {isLoading ? "Đang xử lý..." : isTyping ? "Đang soạn tin..." : "Sẵn sàng hỗ trợ"}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  color: "white",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              background: "#f8fafc",
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}>
              {messages.length === 0 && (
                <div style={{ textAlign: "center", color: "#64748b", padding: "40px 20px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>👋</div>
                  <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                    Xin chào! Mình là <strong>AlgoExpert</strong> 🤖
                  </div>
                  <div style={{ fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-line" }}>
                    Mình sẽ hỗ trợ bạn trong quá trình học thuật toán, từ lý thuyết đến bài tập.{'\n\n'}
                    💡 <strong>Gợi ý:</strong> Hãy vào đúng trang bài học hoặc bài tập trước khi đặt câu hỏi, để mình hiểu rõ hơn bạn đang cần gì nhé!
                  </div>
                </div>
              )}

              
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-bubble ${message.from === 'user' ? 'user-bubble' : ''}`}
                  style={{
                    alignSelf: message.from === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%"
                  }}
                >
                  <div style={{
                    background: message.from === "user" 
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : message.isError
                        ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                        : "white",
                    color: message.from === "user" ? "white" : "#1f2937",
                    padding: "12px 16px",
                    borderRadius: message.from === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    border: message.from === "bot" ? "1px solid #e2e8f0" : "none"
                  }}>
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: message.from === "user" ? message.text : message.text 
                      }}
                      style={{ wordBreak: "break-word" }}
                    />
                    <div style={{
                      fontSize: "11px",
                      opacity: "0.7",
                      marginTop: "4px",
                      textAlign: message.from === "user" ? "right" : "left"
                    }}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="message-bubble" style={{ alignSelf: "flex-start", maxWidth: "85%" }}>
                  <div style={{
                    background: "white",
                    padding: "16px",
                    borderRadius: "20px 20px 20px 4px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "1px solid #e2e8f0"
                  }}>
                    <div className="typing-indicator">
                      <span>●</span>
                      <span>●</span>
                      <span>●</span>
                      <span style={{ marginLeft: "8px" }}>Đang suy nghĩ...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: "20px",
              background: "white",
              borderTop: "1px solid #e2e8f0",
              borderRadius: "0 0 20px 20px"
            }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập câu hỏi của bạn..."
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    minHeight: "40px",
                    maxHeight: "120px",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    resize: "none",
                    outline: "none",
                    transition: "border-color 0.2s",
                    backgroundColor: isLoading ? "#f8fafc" : "white"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  style={{
                    width: "44px",
                    height: "44px",
                    background: input.trim() && !isLoading 
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "#e2e8f0",
                    color: input.trim() && !isLoading ? "white" : "#9ca3af",
                    border: "none",
                    borderRadius: "50%",
                    cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    transition: "all 0.2s",
                    transform: isLoading ? "scale(0.95)" : "scale(1)"
                  }}
                >
                  {isLoading ? "⏳" : "📤"}
                </button>
              </div>
              <div style={{
                fontSize: "11px",
                color: "#9ca3af",
                textAlign: "center",
                marginTop: "8px"
              }}>
                Nhấn Enter để gửi, Shift + Enter để xuống dòng
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatBot;