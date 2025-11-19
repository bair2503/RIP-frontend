const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');
const path = require('path');

const proxy = httpProxy.createProxyServer({
    target: 'https://localhost:3000',
    secure: false,
    changeOrigin: true
});

// Используем те же сертификаты что и Vite
const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.crt'))
};

const server = https.createServer(options, (req, res) => {
    console.log(`🔄 Tauri Proxy: ${req.method} ${req.url} -> https://localhost:3000${req.url}`);
    console.log('User-Agent:', req.headers['user-agent']);

    proxy.web(req, res, (err) => {
        if (err) {
            console.error('❌ Proxy error:', err);
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Proxy error');
            }
        }
    });
});

proxy.on('proxyRes', (proxyRes, req, res) => {
    console.log(`✅ ${proxyRes.statusCode} ${req.method} ${req.url}`);
});

proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
});

server.listen(3001, () => {
    console.log('🚀 Tauri HTTPS proxy running on port 3001 -> 3000');
    console.log('📊 Frontend: https://localhost:3000');
    console.log('📊 Tauri (via proxy): https://localhost:3001/RIP-frontend/');
    console.log('📈 Check Wireshark for traffic analysis');
});

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down proxy...');
    server.close();
    process.exit(0);
});