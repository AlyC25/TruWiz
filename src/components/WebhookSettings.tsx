import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Check, X, Link } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface WebhookSettingsProps {
  webhookUrl: string;
  onWebhookChange: (url: string) => void;
}

export const WebhookSettings = ({ webhookUrl, onWebhookChange }: WebhookSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(webhookUrl);

  const handleSave = () => {
    onWebhookChange(tempUrl);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempUrl(webhookUrl);
    setIsOpen(false);
  };

  const isConnected = webhookUrl.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl"
        >
          <Settings className="w-5 h-5" />
          <span
            className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background ${
              isConnected ? 'bg-verdict-true' : 'bg-verdict-false'
            }`}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="font-hachi">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Webhook Settings
          </DialogTitle>
          <DialogDescription>
            Connect to your n8n webhook to enable fact-checking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Webhook URL</label>
            <Input
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://your-n8n-instance.com/webhook/..."
              className="font-hachi"
            />
            <p className="text-xs text-muted-foreground">
              Enter your n8n webhook URL that will process fact-check requests
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-verdict-true' : 'bg-verdict-false'
              }`}
            />
            <span className="text-sm">
              {isConnected ? 'Connected' : 'Not connected'}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel} className="rounded-xl">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="rounded-xl">
            <Check className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
