import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, Square, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  isRecording: boolean;
  isProcessing: boolean;
  onToggleRecording: () => void;
  disabled?: boolean;
}

export const ChatInput = ({
  onSend,
  isLoading,
  isRecording,
  isProcessing,
  onToggleRecording,
  disabled,
}: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !isLoading && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 bg-card border-t border-border">
      <div className="flex-1 relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a statement to fact-check..."
          className="min-h-[52px] max-h-32 resize-none pr-12 font-hachi rounded-xl bg-background border-border"
          disabled={isLoading || disabled}
        />
      </div>

      <Button
        size="icon"
        variant={isRecording ? 'destructive' : 'secondary'}
        className={cn(
          'h-[52px] w-[52px] rounded-xl shrink-0',
          isRecording && 'recording-pulse'
        )}
        onClick={onToggleRecording}
        disabled={isLoading || isProcessing || disabled}
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isRecording ? (
          <Square className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </Button>

      <Button
        size="icon"
        className="h-[52px] w-[52px] rounded-xl shrink-0"
        onClick={handleSubmit}
        disabled={!input.trim() || isLoading || disabled}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};
