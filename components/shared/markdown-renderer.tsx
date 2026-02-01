"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="w-full text-text-muted">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold tracking-tighter text-accent mb-8 mt-12 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold tracking-tight text-text-base mb-6 mt-12 border-b border-white/10 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-accent/80 mb-4 mt-8">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-text-muted leading-relaxed mb-6 font-light">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-8 space-y-2 text-text-muted">
              {children}
            </ul>
          ),
          li: ({ children }) => <li className="font-light">{children}</li>,

          code: ({ children, className }) => {
            const isInline = !className?.includes("language-");

            return isInline ? (
              <code className="bg-accent/10 text-accent px-1.5 py-0.5 rounded-md text-sm font-mono">
                {children}
              </code>
            ) : (
              <code className="block w-full">{children}</code>
            );
          },

          pre: ({ children }) => (
            <pre className="bg-bg-base/50 border border-white/5 rounded-2xl p-6 mb-8 overflow-x-auto backdrop-blur-sm font-mono text-sm leading-relaxed text-text-base">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent hover:underline decoration-accent/30 underline-offset-4 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-white/10 my-12" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
