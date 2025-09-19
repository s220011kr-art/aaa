import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, onChildAdded, Database } from 'firebase/database';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export class FirebaseService {
  private app: any = null;
  private database: Database | null = null;
  private unsubscribe: (() => void) | null = null;

  async connect(config: FirebaseConfig): Promise<void> {
    try {
      // Avoid duplicate app error during HMR/reconnects
      this.app = getApps().length ? getApp() : initializeApp(config);
      this.database = getDatabase(this.app);
      console.log('Firebase接続が確立されました');
    } catch (error) {
      console.error('Firebase接続エラー:', error);
      throw new Error('Firebase接続に失敗しました');
    }
  }

  startListening(path: string, onMessage: (data: any) => void): void {
    if (!this.database) {
      throw new Error('Firebaseに接続されていません');
    }

    const dbRef = ref(this.database, path);
    this.unsubscribe = onChildAdded(dbRef, (snapshot: any) => {
      const data = snapshot.val();
      console.log('New data added to Firebase:', snapshot.key, data);
      
      // Trigger flash for any new data added
      onMessage(data);
    }, (error: any) => {
      console.error('Firebase監視エラー:', error);
    });
  }

  stopListening(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      console.log('Firebase監視を停止しました');
    }
  }

  disconnect(): void {
    this.stopListening();
    this.database = null;
    this.app = null;
    console.log('Firebaseから切断しました');
  }

  isConnected(): boolean {
    return this.database !== null;
  }
}

export const firebaseService = new FirebaseService();
