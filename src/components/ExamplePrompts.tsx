import { Sparkles, Check, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const examples = [
  {
    prompt: 'Humans need oxygen to survive.',
    type: 'true' as const,
    icon: Check,
  },
  {
    prompt: 'The Earth is flat.',
    type: 'false' as const,
    icon: X,
  },
  {
    prompt: 'Lightning never strikes twice.',
    type: 'ambiguous' as const,
    icon: HelpCircle,
  },
];

export const ExamplePrompts = ({ onSelectPrompt, disabled }: ExamplePromptsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCardStyles = (type: 'true' | 'false' | 'ambiguous') => {
    switch (type) {
      case 'true':
        return 'bg-verdict-true/50 border-verdict-true/30 hover:bg-verdict-true/60';
      case 'false':
        return 'bg-verdict-false/50 border-verdict-false/30 hover:bg-verdict-false/60';
      case 'ambiguous':
        return 'bg-verdict-ambiguous/50 border-verdict-ambiguous/30 hover:bg-verdict-ambiguous/60';
    }
  };

  const getIconStyles = (type: 'true' | 'false' | 'ambiguous') => {
    switch (type) {
      case 'true':
        return 'text-verdict-true-foreground bg-verdict-true/70';
      case 'false':
        return 'text-verdict-false-foreground bg-verdict-false/70';
      case 'ambiguous':
        return 'text-verdict-ambiguous-foreground bg-verdict-ambiguous/70';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <Button
        variant="outline"
        className="glass rounded-full px-6 py-5 text-sm font-hachi text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Example prompts +
      </Button>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in">
          {examples.map((example, i) => {
            const Icon = example.icon;
            return (
              <button
                key={i}
                onClick={() => {
                  onSelectPrompt(example.prompt);
                  setIsOpen(false);
                }}
                disabled={disabled}
                className={`
                  flex items-start gap-3 p-4 rounded-2xl border transition-all duration-200
                  ${getCardStyles(example.type)}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${getIconStyles(example.type)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-left text-sm font-hachi text-foreground">
                  Try: "{example.prompt}"
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};