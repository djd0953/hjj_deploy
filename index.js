const { exec } = require('child_process');
const express = require('express');
const app = express();

// 필요한 포트 번호
const PORT = 9000;

app.use(express.json())

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Webhook server listening on port ${PORT}`);
});

app.post('/', (req, res) => {
    try {
      if (!req.body.ref) throw new Error("No ref")

      console.log('📩 Webhook received at', new Date().toISOString());
      if (req.body.ref === 'refs/heads/main') {
        // deploy.sh 실행
        exec('/home/hjj0106/hjj-webhook/deploy.sh', (err, stdout, stderr) => {
          if (err) {
            console.error('❌ Deploy failed:', err);
            return res.writeHead(500).end('Deploy failed');
          }
    
          console.log('✅ Deploy output:\n', stdout);
          console.error('⚠️ Deploy stderr:\n', stderr);
    
          res.writeHead(200);
          res.end('Deploy complete');
        });
      }
    }
    catch (error) {
      console.error('❌ Deploy failed:', err);
      res.writeHead(405); // Method Not Allowed
      res.end('Not allowed');
    }
})
