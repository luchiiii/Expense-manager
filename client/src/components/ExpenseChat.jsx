import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/chat`
  : "/api/chat";

// Funtion to help with gemini formatting to render text with bold segments.
function renderWithBold(text) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((segment, i) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return <strong key={i}>{segment.slice(2, -2)}</strong>;
    }
    return <span key={i}>{segment}</span>;
  });
}

export default function ExpenseChat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: API_URL,
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
    <div className="bg-surface border border-line rounded-sm p-6 flex flex-col h-96">
      <h2 className="font-display text-xl font-semibold text-ink mb-4">
        Ask about your spending
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
        {messages.length === 0 && (
          <p className="text-sm text-ink-soft italic">
            Try: "How much did I spend on food this month?" or "What's my
            biggest category?"
          </p>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`text-sm rounded-sm px-3 py-2 max-w-[85%] ${
              m.role === "user"
                ? "bg-forest text-white ml-auto"
                : "bg-paper text-ink border border-line"
            }`}
          >
            {m.parts.map((part, i) =>
              part.type === "text" ? (
                <span key={i}>{renderWithBold(part.text)}</span>
              ) : null,
            )}
          </div>
        ))}

        {isLoading && (
          <div className="text-sm italic text-ink-soft">Thinking...</div>
        )}

        {error && (
          <div className="text-sm bg-surface border-2 border-stamp-red text-stamp-red rounded-sm px-3 py-2">
            Something went wrong: {error.message || "please try again."}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your expenses..."
          disabled={isLoading}
          className="flex-1 border-0 border-b-2 border-line bg-transparent px-1 py-2 text-sm text-ink focus:outline-none focus:border-forest transition"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-forest hover:bg-forest-dark text-white rounded-sm px-5 py-2 text-xs font-semibold uppercase tracking-widest disabled:opacity-50 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
