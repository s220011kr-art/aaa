import { useState, useEffect } from 'react';
import { FlashOverlay } from '@/components/FlashOverlay';
import { firebaseService } from '@/lib/firebase';

export default function Home() {
  const [isFlashing, setIsFlashing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const triggerFlash = () => {
    if (isFlashing) return;
    
    setIsFlashing(true);
    let timeLeft = 5;
    setCountdown(timeLeft);
    
    const timer = setInterval(() => {
      timeLeft--;
      setCountdown(timeLeft);
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        setIsFlashing(false);
        setCountdown(5);
      }
    }, 1000);
  };

  const connectToFirebase = async () => {
    try {
      // Fetch Firebase config from server
      const configResponse = await fetch('/api/firebase-config');
      const firebaseConfig = await configResponse.json();
      
      await firebaseService.connect(firebaseConfig);
      
      firebaseService.startListening('/messages', (data) => {
        // Flash when any new data is added
        triggerFlash();
      });
      
      console.log('Firebase接続が完了しました');
    } catch (error) {
      console.error('Firebase接続エラー:', error);
    }
  };

  useEffect(() => {
    // アプリ起動時に自動的にFirebaseに接続
    connectToFirebase();
    
    return () => {
      firebaseService.disconnect();
    };
  }, []);

  return (
    <>
      <FlashOverlay isFlashing={isFlashing} />
      
      <div className="min-h-screen bg-white" data-testid="main-container">
        {/* 真っ白な画面 - メッセージ受信時のみ点滅 */}
      </div>
    </>
  );
}