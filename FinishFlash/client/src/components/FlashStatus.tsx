interface FlashStatusProps {
  isFlashing: boolean;
  countdown: number;
}

export function FlashStatus({ isFlashing, countdown }: FlashStatusProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-card-foreground">点滅状態</h3>
        <div className="flex items-center">
          <span 
            className={`text-sm font-medium ${
              isFlashing ? 'text-primary' : 'text-muted-foreground'
            }`}
            data-testid="flash-status"
          >
            {isFlashing ? '点滅中' : '待機中'}
          </span>
        </div>
      </div>
      
      {isFlashing ? (
        <div data-testid="countdown-container">
          <div className="text-2xl font-bold text-primary mb-1" data-testid="countdown">
            {countdown}
          </div>
          <p className="text-sm text-muted-foreground">秒後に終了</p>
        </div>
      ) : (
        <div data-testid="standby-container">
          <div className="text-2xl font-bold text-muted-foreground mb-1">--</div>
          <p className="text-sm text-muted-foreground">メッセージ待機中</p>
        </div>
      )}
    </div>
  );
}
