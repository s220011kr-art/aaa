import { Button } from '@/components/ui/button';

export interface LogMessage {
  id: string;
  content: string;
  timestamp: string;
  isNew?: boolean;
}

interface MessageLogProps {
  messages: LogMessage[];
  onClearLog: () => void;
}

export function MessageLog({ messages, onClearLog }: MessageLogProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-card-foreground">受信ログ</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearLog}
          className="text-sm text-muted-foreground hover:text-foreground"
          data-testid="button-clear-log"
        >
          ログをクリア
        </Button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto" data-testid="message-log">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`log-item px-3 py-2 rounded-md bg-muted/50 ${
                message.isNew ? 'new' : ''
              }`}
              data-testid={`log-message-${message.id}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {message.content}
                </span>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                5秒間の点滅を実行しました
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground" data-testid="empty-log-message">
            <p>まだメッセージを受信していません</p>
            <p className="text-xs mt-1">
              Firebaseから"finish"メッセージが送信されると、ここに表示されます
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
