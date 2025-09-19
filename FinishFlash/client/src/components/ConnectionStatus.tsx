interface ConnectionStatusProps {
  isConnected: boolean;
}

export function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-card-foreground">接続状態</h3>
        <div className="flex items-center">
          <span 
            className={`status-indicator ${
              isConnected ? 'status-connected pulse' : 'status-disconnected'
            }`}
            data-testid="connection-indicator"
          />
          <span 
            className={`text-sm font-medium ${
              isConnected ? 'text-green-600' : 'text-red-600'
            }`}
            data-testid="connection-status"
          >
            {isConnected ? '接続中' : '切断中'}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Firebase Realtime Database</p>
    </div>
  );
}
