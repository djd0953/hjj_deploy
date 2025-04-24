const http = require('http');
const { exec } = require('child_process');

// 필요한 포트 번호
const PORT = 9000;

// 간단한 보안용 GitHub Webhook 전용 POST 핸들러
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST') {

    console.log(req.parser);
    console.log('📩 Webhook received at', new Date().toISOString());

    // deploy.sh 실행
    //exec('/home/hjj0106/hjj-webhook/deploy.sh', (err, stdout, stderr) => {
      //if (err) {
        //console.error('❌ Deploy failed:', err);
        //return res.writeHead(500).end('Deploy failed');
      //}

      //console.log('✅ Deploy output:\n', stdout);
      //console.error('⚠️ Deploy stderr:\n', stderr);

      //res.writeHead(200);
      //res.end('Deploy complete');
    //});
  } else {
    res.writeHead(405); // Method Not Allowed
    res.end('Not allowed');
  }
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`🚀 Webhook server listening on port ${PORT}`);
});

