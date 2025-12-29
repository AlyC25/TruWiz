import { useRef, useEffect, useState } from 'react';
import { useFactCheck } from '@/hooks/useFactCheck';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { WebhookSettings } from './WebhookSettings';
import { SparkleBackground } from './SparkleBackground';
import { ExamplePrompts } from './ExamplePrompts';
import { Trash2, Search } from 'lucide-react';
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
    <div className="relative min-h-screen bg-background">
      <SparkleBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between py-8">
          <div className="flex-1" />
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-10 h-10 text-primary" />
              <h1 className="font-hachi text-3xl md:text-4xl font-medium text-foreground">Fact Checker</h1>
            </div>
            <p className="text-sm text-muted-foreground font-hachi">
              Check if statements are true, false, or ambiguous
            </p>
          </div>
          <div className="flex-1 flex justify-end items-start gap-1">
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
              {/* Main Logo */}
              <div className="w-28 h-28 rounded-3xl glass-strong flex items-center justify-center mb-6 shadow-lg">
                <Search className="w-16 h-16 text-primary/70" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-hachi mb-3 text-foreground">Welcome!</h2>
              <p className="text-muted-foreground font-hachi text-sm max-w-md mb-8">
                {isConnected
                  ? 'Type a statement or use voice recording to check if it\'s true, false, or ambiguous.'
                  : 'Click the settings icon to connect your n8n webhook first.'}
              </p>

              <ExamplePrompts 
                onSelectPrompt={checkStatement} 
                disabled={!isConnected || isLoading}
              />
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto py-4 chat-scroll"
            >
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="glass rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="py-4">
          <ChatInput
            onSend={checkStatement}
            isLoading={isLoading}
            isRecording={isRecording}
            isProcessing={isProcessing}
            onToggleRecording={toggleRecording}
            disabled={!isConnected}
          />
        </div>
      </div>
    </div>
  );
};