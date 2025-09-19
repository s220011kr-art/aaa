import { useState, useEffect } from 'react';
import { FlashOverlay } from '@/components/FlashOverlay';
import { Button } from '@/components/ui/button';
import { firebaseService } from '@/lib/firebase';

export default function Home() {
  const [isFlashing, setIsFlashing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [messageCount, setMessageCount] = useState(0);
  const [lastMessage, setLastMessage] = useState<string>('');

  const triggerFlash = () => {
    if (isFlashing) return;
    
    setIsFlashing(true);
    setCountdown(5);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFlashing(false);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const testFlash = () => {
    triggerFlash();
  };

  const connectToFirebase = async () => {
    setConnectionStatus('connecting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/firebase-config');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const firebaseConfig = await response.json();
      console.log('Firebase設定を取得しました:', firebaseConfig);
      
      // 実際のFirebaseに接続
      await firebaseService.connect(firebaseConfig);
      
      // メッセージの監視を開始
      firebaseService.startListening('/messages', (data) => {
        console.log('新しいメッセージを受信:', data);
        setMessageCount(prev => prev + 1);
        setLastMessage(JSON.stringify(data));
        triggerFlash();
      });
      
      setConnectionStatus('connected');
      console.log('Firebase接続が完了しました');
      
    } catch (error) {
      console.error('接続エラー:', error);
      setConnectionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '不明なエラーが発生しました');
    }
  };

  const disconnectFromFirebase = () => {
    firebaseService.disconnect();
    setConnectionStatus('disconnected');
    setMessageCount(0);
    setLastMessage('');
    console.log('Firebaseから切断しました');
  };
  useEffect(() => {
    // アプリ起動時に接続を試行
    connectToFirebase();
    
    // クリーンアップ
    return () => {
      firebaseService.disconnect();
    };
  }, []);

  return (
    <>
      <FlashOverlay isFlashing={isFlashing} />
      
      <div className="min-h-screen bg-white" data-testid="main-container">
        {/* Firebase監視パネル */}
        <div className="fixed top-4 right-4 bg-white border border-gray-200 p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="text-lg font-semibold mb-3">Firebase監視システム</h3>
          
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <span 
                className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  connectionStatus === 'connected' ? 'bg-green-500' :
                  connectionStatus === 'connecting' ? 'bg-yellow-500' :
                  connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-500'
                }`}
              />
              <span className="text-sm">
                接続状態: {
                  connectionStatus === 'connected' ? '接続済み' :
                  connectionStatus === 'connecting' ? '接続中...' :
                  connectionStatus === 'error' ? 'エラー' : '切断中'
                }
              </span>
            </div>
            {errorMessage && (
              <p className="text-xs text-red-600 mb-2">{errorMessage}</p>
            )}
          </div>

          <div className="mb-3 text-sm">
            <p>受信メッセージ数: <span className="font-bold">{messageCount}</span></p>
            {lastMessage && (
              <p className="text-xs text-gray-600 mt-1">
                最新: {lastMessage.substring(0, 50)}...
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Button 
              onClick={testFlash} 
              className="w-full"
              disabled={isFlashing}
            >
              {isFlashing ? `点滅中 (${countdown}秒)` : 'テスト点滅'}
            </Button>
            
            {connectionStatus === 'connected' ? (
              <Button 
                onClick={disconnectFromFirebase} 
                variant="outline" 
                className="w-full"
              >
                切断
              </Button>
            ) : (
              <Button 
                onClick={connectToFirebase} 
                variant="outline" 
                className="w-full"
                disabled={connectionStatus === 'connecting'}
              >
                {connectionStatus === 'connecting' ? '接続中...' : '再接続'}
              </Button>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-500">
            <p>監視パス: /messages</p>
            <p>新しいデータが追加されると画面が緑色に点滅します</p>
          </div>
        </div>
      </div>
    </>
  );
}