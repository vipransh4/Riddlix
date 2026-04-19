import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/chat", {
        messages: newMessages,
      });

      setMessages([
        ...newMessages,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error occurred" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">

      <div className="flex items-center justify-between mb-3 px-2">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
        </h2>
      </div>

      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4">

        {/* CHAT AREA */}
        <div className="h-72 overflow-y-auto space-y-3 pr-2 mb-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`px-4 py-2 rounded-xl text-sm max-w-[70%] ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}

          {/* 🔥 TYPING ANIMATION */}
          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-1 bg-muted px-3 py-2 rounded-xl">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="flex">
          <input
            className="flex-1 p-3 bg-white text-black border border-gray-300 rounded-l-lg outline-none  placeholder:text-gray-400"
            placeholder="Ask anything to your friend Riddlix..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
                }
            }}
            />

          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-primary to-secondary px-5 rounded-r-lg text-white font-semibold hover:opacity-90 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;