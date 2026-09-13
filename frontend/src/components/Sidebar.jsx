import React from 'react';

export default function Sidebar({
    isOpen,
    toggle,
    conversations,
    currentConvId,
    onLoadConversation,
    onNewChat,
    onDeleteChat,
    token,
    setToken,
    isMobile
}) {
    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isOpen && isMobile ? "open" : ""}`}
                onClick={toggle}
            />

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <span>🤖</span> {!isOpen && !isMobile ? "" : "ContextAI"}
                    </div>
                    <button
                        className="new-chat-btn"
                        onClick={onNewChat}
                        title="New chat"
                    >
                        <span style={{ fontSize: '18px' }}>+</span>
                        {(!isOpen && !isMobile) ? "" : " New chat"}
                    </button>
                </div>

                <div className="sidebar-conversations">
                    {(!isOpen && !isMobile) ? (
                        // Band mode mein sirf icon ya patli line
                        <div className="sidebar-divider"></div>
                    ) : (
                        <div className="sidebar-label">chat history</div>
                    )}

                    {conversations.length === 0 && (isOpen || isMobile) && (
                        <div className="empty-state">no conversation</div>
                    )}

                    {conversations.map((conv) => (
                        <div
                            key={conv.conversation_id}
                            className={`conv-item ${conv.conversation_id === currentConvId ? "active" : ""}`}
                            onClick={() => onLoadConversation(conv.conversation_id)}
                            title={conv.title}
                        >
                            {(!isOpen && !isMobile) ? (
                                
                                <span className="conv-icon">💬</span>
                            ) : (
                                <>
                                    <span className="conv-title" style={{ flex: 1 }}>
                                        {conv.title.substring(0, 30)}{conv.title.length > 30 ? "..." : ""}
                                    </span>
                                    <span 
                                        className="delete-btn"
                                        onClick={(e) => { e.stopPropagation(); onDeleteChat(conv.conversation_id); }}
                                        title="Delete chat"
                                        style={{ fontSize: "12px", opacity: 0.7 }}
                                    >
                                        🗑️
                                    </span>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="sidebar-footer">
                    {(!isOpen && !isMobile) ? (
                        <div className="auth-icon" title={token.trim() ? "Token Active" : "Anonymous"}>
                            {token.trim() ? "🔐" : "🔓"}
                        </div>
                    ) : (
                        <div className="token-section" style={{ display: "none" }}>
                            <label>JWT Token</label>
                            <input
                                className="token-input"
                                type="password"
                                placeholder="Paste token..."
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                            <div className={`auth-badge ${token.trim() ? "authed" : "anon"}`}>
                                {token.trim() ? "🔐 Token active" : "🔓 Hello! stranger "}
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
