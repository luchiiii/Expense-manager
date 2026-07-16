import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function ExpenseChat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl shadow-sm p-5 flex flex-col h-96">
      <h2 className="text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-3">
        Ask about your spending
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
        {messages.length === 0 && (
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
            Try: "How much did I spend on food this month?" or "What's my
            biggest category?"
          </p>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`text-sm rounded-xl px-3 py-2 max-w-[85%] ${
              m.role === "user"
                ? "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 ml-auto"
                : "bg-[#F1F5F9] dark:bg-[#334155] text-[#0F172A] dark:text-[#F8FAFC]"
            }`}
          >
            {m.parts.map((part, i) =>
              part.type === "text" ? <span key={i}>{part.text}</span> : null,
            )}
          </div>
        ))}

        {isLoading && (
          <div className="text-sm italic text-[#64748B] dark:text-[#94A3B8]">
            Thinking...
          </div>
        )}

        {error && (
          <div className="text-sm bg-red-50 border border-red-200 text-red-600 rounded-xl px-3 py-2">
            Something went wrong: {error.message || "please try again."}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your expenses..."
          disabled={isLoading}
          className="flex-1 border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] rounded-xl px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 text-white rounded-xl px-4 py-2 text-sm disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
