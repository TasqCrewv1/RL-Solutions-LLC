import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Sparkles, ExternalLink } from 'lucide-react';
import PhoneNumber from './PhoneNumber';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'What services do you offer?',
  'Do I need a permit?',
  'How does the estimate process work?',
  'What areas do you serve?',
  "What's the difference between composite and wood decking?",
  'Can you remodel bathrooms?',
  'Do you install accessibility ramps?',
  'How long do projects usually take?',
];

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi, I'm RL — the RL Solutions Virtual Project Assistant. I can answer questions about our services, pricing ranges, materials, timelines, warranties, and more. What can I help you with today?",
};

function RLIcon({ size = 24 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
      style={{ width: size, height: size }}
    >
      <Sparkles size={size * 0.55} strokeWidth={2} />
    </div>
  );
}

interface MessagePart {
  type: 'text' | 'link' | 'bold';
  content: string;
  href?: string;
}

function parseMarkdown(text: string): MessagePart[] {
  const parts: MessagePart[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const boldRegex = /\*\*([^*]+)\*\*/g;

  const tokens: { start: number; end: number; type: 'link' | 'bold'; content: string; href?: string }[] = [];

  let match: RegExpExecArray | null;
  while ((match = linkRegex.exec(text)) !== null) {
    tokens.push({ start: match.index, end: match.index + match[0].length, type: 'link', content: match[1], href: match[2] });
  }
  while ((match = boldRegex.exec(text)) !== null) {
    tokens.push({ start: match.index, end: match.index + match[0].length, type: 'bold', content: match[1] });
  }

  tokens.sort((a, b) => a.start - b.start);

  const filtered: typeof tokens = [];
  for (const t of tokens) {
    if (filtered.length === 0 || t.start >= filtered[filtered.length - 1].end) {
      filtered.push(t);
    }
  }

  let cursor = 0;
  for (const t of filtered) {
    if (t.start > cursor) {
      parts.push({ type: 'text', content: text.slice(cursor, t.start) });
    }
    parts.push({ type: t.type, content: t.content, href: t.href });
    cursor = t.end;
  }
  if (cursor < text.length) {
    parts.push({ type: 'text', content: text.slice(cursor) });
  }
  return parts;
}

function MessageBubble({ message, onNavigate }: { message: Message; onNavigate: (path: string) => void }) {
  const isUser = message.role === 'user';
  const parts = useMemo(() => isUser ? [{ type: 'text' as const, content: message.content }] : parseMarkdown(message.content), [isUser, message.content]);

  const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//');
  const isTelOrMail = (href: string) => href.startsWith('tel:') || href.startsWith('mailto:');

  return (
    <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && <RLIcon size={30} />}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
          isUser
            ? 'bg-slate-900 text-white'
            : 'bg-slate-50 text-slate-800'
        }`}
      >
        <p className="whitespace-pre-wrap text-pretty">
          {parts.map((part, i) => {
            if (part.type === 'link' && part.href) {
              if (isInternal(part.href)) {
                return (
                  <button
                    key={i}
                    onClick={() => onNavigate(part.href!)}
                    className="font-semibold text-orange-600 underline decoration-orange-300 underline-offset-2 transition-colors hover:text-orange-700 hover:decoration-orange-500"
                  >
                    {part.content}
                  </button>
                );
              }
              if (isTelOrMail(part.href)) {
                return (
                  <a
                    key={i}
                    href={part.href}
                    className="font-semibold text-orange-600 underline decoration-orange-300 underline-offset-2 transition-colors hover:text-orange-700 hover:decoration-orange-500"
                  >
                    {part.content}
                  </a>
                );
              }
              return (
                <a
                  key={i}
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-orange-600 underline decoration-orange-300 underline-offset-2 transition-colors hover:text-orange-700 hover:decoration-orange-500"
                >
                  {part.content}
                  <ExternalLink size={11} className="ml-0.5 inline-block align-baseline" />
                </a>
              );
            }
            if (part.type === 'bold') {
              return <strong key={i}>{part.content}</strong>;
            }
            return <span key={i}>{part.content}</span>;
          })}
        </p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <RLIcon size={30} />
      <div className="flex items-center gap-1 rounded-2xl bg-slate-50 px-4 py-3.5">
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
      </div>
    </div>
  );
}

export default function MasonAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const srLiveRef = useRef<HTMLDivElement>(null);

  const handleNavigate = useCallback((path: string) => {
    setIsOpen(false);
    navigate(path);
  }, [navigate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMessage: Message = { role: 'user', content: trimmed };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');
      setLoading(true);
      setHasInteracted(true);

      const apiMessages = newMessages
        .filter((m, i) => i === 0 || m.role === 'user' || true)
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        const resp = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mason-chat`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ messages: apiMessages }),
          },
        );

        const data = await resp.json();

        if (!resp.ok) {
          const errMsg =
            data?.error ??
            "I'm having trouble right now. Please try again, or call 302-402-3070 and Jeremiah will help you directly.";
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: errMsg },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: data.reply },
          ]);
        }
        if (srLiveRef.current) {
          srLiveRef.current.textContent = 'RL has responded';
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "I'm having trouble connecting right now. Please try again in a moment, or call 302-402-3070 and Jeremiah will help you directly.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        ref={srLiveRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Floating button */}
      <button
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close RL chat' : 'Open RL chat assistant'}
        aria-expanded={isOpen}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 ${
          isOpen
            ? 'rotate-90 bg-slate-900 text-white'
            : 'bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:scale-105 hover:shadow-2xl'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && !hasInteracted && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500" />
          </span>
        )}
      </button>

      {/* Notification badge before first interaction */}
      {!isOpen && !hasInteracted && (
        <div className="fixed bottom-24 right-6 z-40 animate-fade-up rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100 max-w-[200px] hidden sm:block">
          <p className="text-xs font-600 text-slate-900">Need help?</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
            Ask RL anything about our services.
          </p>
          <div className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 bg-white" />
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex h-[min(560px,calc(100vh-8rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-100 animate-scale-in"
          role="dialog"
          aria-label="Chat with RL"
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 bg-white px-5 py-4">
            <RLIcon size={40} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-base font-600 text-slate-900">
                  RL
                </h2>
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
              </div>
              <p className="text-[11px] font-500 text-slate-500">
                RL Solutions Virtual Project Assistant
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto px-5 py-4"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} onNavigate={handleNavigate} />
            ))}

            {loading && <TypingIndicator />}

            {/* Suggested questions — show after welcome or after assistant replies */}
            {messages.length === 1 && !loading && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-600 uppercase tracking-wider text-slate-400">
                  Suggested questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-500 text-slate-600 transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-100 bg-white px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask RL a question..."
                aria-label="Type your question"
                disabled={loading}
                maxLength={500}
                className="flex-1 rounded-full border-2 border-slate-100 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-orange-500 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-orange-500 text-white transition-all duration-200 hover:bg-orange-600 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-400">
              RL can help with general questions. For firm quotes, call <PhoneNumber className="font-600 text-orange-600" />.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
