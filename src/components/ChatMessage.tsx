import { cn } from '@/lib/utils';
import { Message, Verdict } from '@/hooks/useFactCheck';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const VerdictBadge = ({ verdict }: { verdict: Verdict }) => {
  // if (!verdict) return null;

  const config = {
    "True": {
      icon: CheckCircle,
      label: 'TRUE',
      className: 'bg-verdict-true text-verdict-true-foreground',
    },
    "False": {
      icon: XCircle,
      label: 'FALSE',
      className: 'bg-verdict-false text-verdict-false-foreground',
    },
    "Ambiguous": {
      icon: HelpCircle,
      label: 'AMBIGUOUS',
      className: 'bg-verdict-ambiguous text-verdict-ambiguous-foreground',
    },
  };

  const { icon: Icon, label, className } = config[verdict];

  return (
    <div className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-hachi', className)}>
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.type === 'user';

  return (
    <div
      className={cn(
        'flex w-full mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 font-hachi',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-card border border-border rounded-bl-md shadow-sm'
        )}
      >
        {!isUser && message.verdict && (
          <div className="mb-2">
            <VerdictBadge verdict={message.verdict} />
          </div>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <span className="text-xs opacity-60 mt-1 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
