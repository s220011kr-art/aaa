import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ConfigurationPanelProps {
  onConnect: (databaseUrl: string, watchPath: string) => void;
  onDisconnect: () => void;
  isConnected: boolean;
  isConnecting: boolean;
}

export function ConfigurationPanel({ 
  onConnect, 
  onDisconnect, 
  isConnected, 
  isConnecting 
}: ConfigurationPanelProps) {
  const [databaseUrl, setDatabaseUrl] = useState('');
  const [watchPath, setWatchPath] = useState('/messages/status');

  const handleConnect = () => {
    if (databaseUrl.trim()) {
      onConnect(databaseUrl.trim(), watchPath.trim());
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
      <h3 className="text-lg font-medium text-card-foreground mb-4">設定</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="database-url" className="block text-sm font-medium text-foreground mb-2">
            データベース URL
          </Label>
          <Input
            id="database-url"
            type="text"
            placeholder="https://your-project.firebaseio.com"
            value={databaseUrl}
            onChange={(e) => setDatabaseUrl(e.target.value)}
            disabled={isConnected}
            data-testid="input-database-url"
          />
        </div>
        <div>
          <Label htmlFor="watch-path" className="block text-sm font-medium text-foreground mb-2">
            監視パス
          </Label>
          <Input
            id="watch-path"
            type="text"
            placeholder="/messages/status"
            value={watchPath}
            onChange={(e) => setWatchPath(e.target.value)}
            disabled={isConnected}
            data-testid="input-watch-path"
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          onClick={handleConnect}
          disabled={isConnected || isConnecting || !databaseUrl.trim()}
          data-testid="button-connect"
        >
          {isConnecting ? '接続中...' : '接続開始'}
        </Button>
        <Button
          variant="secondary"
          onClick={onDisconnect}
          disabled={!isConnected}
          data-testid="button-disconnect"
        >
          切断
        </Button>
      </div>
    </div>
  );
}
