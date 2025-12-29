import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Mic, Square, Loader2, Search } from 'lucide-react';
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
    <div className="glass-strong rounded-full flex items-center gap-2 px-4 py-2 shadow-lg">
      <Search className="w-5 h-5 text-muted-foreground shrink-0" />
      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a statement to fact-check..."
        className="flex-1 bg-transparent border-none outline-none font-hachi text-sm text-foreground placeholder:text-muted-foreground py-2"
        disabled={isLoading || disabled}
      />

      <Button
        size="icon"
        className="h-10 w-10 rounded-full shrink-0 bg-secondary hover:bg-secondary/80"
        onClick={handleSubmit}
        disabled={!input.trim() || isLoading || disabled}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-secondary-foreground" />
        ) : (
          <Check className="w-5 h-5 text-secondary-foreground" />
        )}
      </Button>

      <Button
        size="icon"
        variant={isRecording ? 'destructive' : 'ghost'}
        className={cn(
          'h-10 w-10 rounded-full shrink-0',
          !isRecording && 'bg-muted hover:bg-muted/80',
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
          <Mic className="w-5 h-5 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
};