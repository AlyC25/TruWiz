import { useState, useCallback } from 'react';

export type Verdict = 'true' | 'false' | 'ambiguous' | null;

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  verdict?: Verdict;
  explanation?: string;
  timestamp: Date;
}

interface UseFactCheckOptions {
  webhookUrl: string;
}

export const useFactCheck = ({ webhookUrl }: UseFactCheckOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const checkStatement = useCallback(async (statement: string) => {
    if (!statement.trim() || !webhookUrl) return;

    // Add user message
    const userMessage = addMessage({
      type: 'user',
      content: statement,
    });

    setIsLoading(true);

    try {
      // Build chat history including the new message
      // const chatHistory = [...messages, userMessage].map(msg => ({
      //   role: msg.type,
      //   content: msg.content,
      //   verdict: msg.verdict,
      //   timestamp: msg.timestamp.toISOString(),
      // }));

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'text',
          statement: statement.trim(),
          // chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to check statement');
      }

      const data = await response.json();

      // Add assistant response
      addMessage({
        type: 'assistant',
        content: data.explanation || 'Analysis complete.',
        verdict: data.verdict as Verdict,
        explanation: data.explanation,
      });
    } catch (error) {
      console.error('Error checking statement:', error);
      addMessage({
        type: 'assistant',
        content: 'Sorry, I couldn\'t process that. Please check your webhook connection.',
        verdict: null,
      });
    } finally {
      setIsLoading(false);
    }
  }, [webhookUrl, addMessage, messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const handleVoiceResponse = useCallback((data: {
    transcription?: string;
    verdict?: string;
    explanation?: string;
  }) => {
    // Add user message with transcription
    if (data.transcription) {
      addMessage({
        type: 'user',
        content: data.transcription,
      });
    }

    // Add assistant response
    if (data.explanation || data.verdict) {
      addMessage({
        type: 'assistant',
        content: data.explanation || 'Analysis complete.',
        verdict: data.verdict as Verdict,
        explanation: data.explanation,
      });
    }
  }, [addMessage]);

  return {
    messages,
    isLoading,
    checkStatement,
    clearMessages,
    addMessage,
    handleVoiceResponse,
  };
};
