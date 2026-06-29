import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Message from "./components/Message";
import WelcomeScreen from "./components/WelcomeScreen";
import InputArea from "./components/InputArea";

// const API_BASE = import.meta.env.VITE_API_URL || "";
// Purana: const API_BASE = import.meta.env.VITE_API_URL || "";
// Naya:
const API_BASE = "http://localhost:8000";

const useMobile = () => {
  const [isMob, setIsMob] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMob(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMob;
};

export default function App() {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [load, setLoad] = useState(false);
  const [convs, setConvs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [token, setToken] = useState("");

  const isMob = useMobile();
  const [sideOpen, setSideOpen] = useState(!isMob); 
  const endRef = useRef(null);

  useEffect(() => {
    setSideOpen(!isMob);
  }, [isMob]);

  const getHeaders = (json = false) => {
    const headers = {};
    if (json) headers["Content-Type"] = "application/json";
    if (token.trim()) headers["Authorization"] = `Bearer ${token.trim()}`;
    return headers;
  };

  const fetchConvs = async () => {
    try {
      const res = await fetch(`${API_BASE}/conversations`, { headers: getHeaders() });
      if (res.ok) setConvs(await res.json());
    } catch { }
  };

  const fetchConvData = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/conversations/${id}`, { headers: getHeaders() });
      if (!res.ok) return;
      const data = await res.json();
      const temp = [];
      data.forEach((m) => {
        temp.push({ role: "user", content: m.prompt });
        temp.push({ role: "ai", content: m.response });
      });
      setMsgs(temp);
      setActiveId(id);
      if (isMob) setSideOpen(false);
    } catch { }
  };

  const sendMsg = async (text) => {
    const prompt = text || input.trim();
    if (!prompt || load) return;

    setInput("");
    setMsgs((prev) => [...prev, { role: "user", content: prompt }]);
    setLoad(true);

    try {
      const body = { prompt };
      if (activeId) body.conversation_id = activeId;

      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        setMsgs((prev) => [...prev, { role: "ai", content: `❌ Error: ${err.detail || "Something went wrong"}` }]);
        return;
      }

      const data = await res.json();
      setMsgs((prev) => [...prev, { role: "ai", content: data.response }]);
      setActiveId(data.conversation_id);
      fetchConvs();
    } catch (err) {
      setMsgs((prev) => [...prev, { role: "ai", content: `❌ Connection error: ${err.message}` }]);
    } finally {
      setLoad(false);
    }
  };

  const clearChat = () => {
    setMsgs([]);
    setActiveId(null);
    if (isMob) setSideOpen(false);
  };

  const exportChat = () => {
    if (msgs.length === 0) return;
    const txt = msgs.map((m) => `${m.role.toUpperCase()}: ${m.content}\n`).join("\n");
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-${activeId || "session"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, load]);

  useEffect(() => { 
    fetchConvs(); 
  }, [token]);

  return (
    <div className="app-container">
      <Sidebar
        isOpen={sideOpen}
        toggle={() => setSideOpen(!sideOpen)}
        conversations={convs}
        currentConvId={activeId}
        onLoadConversation={fetchConvData}
        onNewChat={clearChat}
        token={token}
        setToken={setToken}
        isMobile={isMob}
      />

      <main className="main-area">
        <header className="chat-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="chat-header-left">
            <button className="menu-btn" onClick={() => setSideOpen(!sideOpen)}>
              {isMob || !sideOpen ? "☰" : "✖"}
            </button>
            <span style={{ fontWeight: 600, fontSize: 15 }}>ContextAI</span>
            <span className="model-badge">Gemini-2.0-flash</span>
          </div>
          
          {msgs.length > 0 && (
            <button 
              onClick={exportChat} 
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "inherit",
                padding: "4px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                marginRight: "15px"
              }}
            >
              📥 Export Chat
            </button>
          )}
        </header>

        <div className="messages-container">
          {msgs.length === 0 ? (
            <WelcomeScreen onSuggestionClick={sendMsg} />
          ) : (
            <>
              {msgs.map((m, i) => (
                <Message key={i} role={m.role} content={m.content} />
              ))}
              {load && (
                <div className="message ai">
                  <div className="message-avatar">🤖</div>
                  <div className="message-bubble">
                    <div className="typing-dots"><span></span><span></span><span></span></div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </>
          )}
        </div>

        <InputArea
          input={input}
          setInput={setInput}
          onSend={() => sendMsg()}
          loading={load}
        />
      </main>
    </div>
  );
}