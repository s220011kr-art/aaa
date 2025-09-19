@@ .. @@
 export async function registerRoutes(app: Express): Promise<Server> {
   // Firebase config endpoint for client
   app.get("/api/firebase-config", (req, res) => {
     res.json({
      apiKey: "AIzaSyDjxcu1zjbA0GVJnVRXuxGMArAIVoGB-ac",
      authDomain: "eigajouei-b3c8d.firebaseapp.com",
      databaseURL: "https://eigajouei-b3c8d-default-rtdb.firebaseio.com",
      projectId: "eigajouei-b3c8d",
      storageBucket: "eigajouei-b3c8d.firebasestorage.app",
      messagingSenderId: "34849523565",
      appId: "1:34849523565:web:0142640e8b61132f60bc64"
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