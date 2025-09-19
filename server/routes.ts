@@ .. @@
 export async function registerRoutes(app: Express): Promise<Server> {
   // Firebase config endpoint for client
   app.get("/api/firebase-config", (req, res) => {
+    // デモ用のFirebase設定を提供
     res.json({
-      apiKey: process.env.FIREBASE_API_KEY || '',
-      authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
-      databaseURL: process.env.FIREBASE_DATABASE_URL || '',
-      projectId: process.env.FIREBASE_PROJECT_ID || '',
-      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
-      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
-      appId: process.env.FIREBASE_APP_ID || ''
+      apiKey: process.env.FIREBASE_API_KEY || 'demo-api-key',
+      authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
+      databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://demo-project-default-rtdb.firebaseio.com/',
+      projectId: process.env.FIREBASE_PROJECT_ID || 'demo-project',
+      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
+      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '123456789',
+      appId: process.env.FIREBASE_APP_ID || '1:123456789:web:abcdef123456'
     });
   });
 
+  // テスト用のエンドポイントを追加
+  app.post("/api/test-flash", (req, res) => {
+    res.json({ message: "Flash test triggered", timestamp: new Date().toISOString() });
+  });
+
   const httpServer = createServer(app);
 
   return httpServer;
 }