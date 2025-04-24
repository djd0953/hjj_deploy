require('dotenv').config();
const { exec } = require('child_process');
const express = require('express');
const app = express();

// 필요한 포트 번호
if (!process.env.GITHUB_WEB_HOOK_PORT) {
  console.error('❌ PORT is not defined in .env file');
  process.exit(1);
}
const PORT = process.env.GITHUB_WEB_HOOK_PORT;

app.use(express.urlencoded({ extended: true }));

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Webhook server listening on port ${PORT}`);
});

app.post('/', (req, res) => {
    try {
      const body = JSON.parse(req.body.payload)
      if (!body.ref) throw new Error("No ref")

      const branchName = body.ref.split('/')[2];

      console.log('📩 Webhook received at', new Date().toISOString(), `Branch: ${branchName}`);
      if (branchName === 'main') {
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
      else {
        console.log('❌ Not main branch, ignoring');
        res.writeHead(200);
        res.end('Not main branch, ignoring');
      }
    }
    catch (err) {
      console.error('❌ Deploy failed:', err);
      res.writeHead(405); // Method Not Allowed
      res.end('Not allowed');
    }
})
