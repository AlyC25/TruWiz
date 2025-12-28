import { useRef, useEffect, useState } from 'react';
import { useFactCheck } from '@/hooks/useFactCheck';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { WebhookSettings } from './WebhookSettings';
import { Sparkles, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FactChecker = () => {
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('factcheck-webhook-url') || '';
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, checkStatement, clearMessages, handleVoiceResponse } = useFactCheck({
    webhookUrl,
  });

  const { isRecording, isProcessing, toggleRecording } = useVoiceRecording({
    webhookUrl,
    onTranscription: (data) => {
      handleVoiceResponse(data);
    },
  });

  const handleWebhookChange = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem('factcheck-webhook-url', url);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const isConnected = webhookUrl.trim().length > 0;

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center relative">
            <Search className="w-6 h-6 text-primary" />
            <Sparkles className="w-3.5 h-3.5 text-primary absolute -top-1 -right-1" />
            <Sparkles className="w-3 h-3 text-primary absolute -bottom-1 -left-1" />
          </div>
          <div>
            <h1 className="font-hachi text-lg font-medium">Fact Checker</h1>
            <p className="text-xs text-muted-foreground font-hachi">
              Check if statements are true, false, or ambiguous
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearMessages}
              className="rounded-xl text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          )}
          <WebhookSettings
            webhookUrl={webhookUrl}
            onWebhookChange={handleWebhookChange}
          />
        </div>
      </header>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 chat-scroll"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 relative">
              <Search className="w-10 h-10 text-primary" />
              <Sparkles className="w-5 h-5 text-primary absolute -top-1.5 -right-1.5" />
              <Sparkles className="w-4 h-4 text-primary absolute -bottom-1.5 -left-1.5" />
            </div>
            <h2 className="text-xl font-hachi mb-2">Welcome!</h2>
            <p className="text-muted-foreground font-hachi text-sm max-w-sm">
              {isConnected
                ? 'Type a statement or use voice recording to check if it\'s true, false, or ambiguous.'
                : 'Click the settings icon to connect your n8n webhook first.'}
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput
        onSend={checkStatement}
        isLoading={isLoading}
        isRecording={isRecording}
        isProcessing={isProcessing}
        onToggleRecording={toggleRecording}
        disabled={!isConnected}
      />
    </div>
  );
};
