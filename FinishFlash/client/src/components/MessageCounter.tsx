interface MessageCounterProps {
  count: number;
}

export function MessageCounter({ count }: MessageCounterProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-card-foreground">受信回数</h3>
      </div>
      <div className="text-3xl font-bold text-accent mb-1" data-testid="message-count">
        {count}
      </div>
      <p className="text-sm text-muted-foreground">総受信メッセージ数</p>
    </div>
  );
}
