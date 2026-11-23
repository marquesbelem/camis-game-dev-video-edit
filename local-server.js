const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
};

const server = http.createServer((req, res) => {
  req.on('error', () => {});
  res.on('error', () => {});

  const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
  const safePath = path.normalize(path.join(ROOT, decodedUrl));

  if (!safePath.startsWith(ROOT) || !fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not Found');
  }

  const stat = fs.statSync(safePath);
  const fileSize = stat.size;
  const ext = path.extname(safePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      res.writeHead(416, { 'Content-Range': `bytes */${fileSize}` });
      return res.end();
    }

    const chunksize = end - start + 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    });

    const stream = fs.createReadStream(safePath, { start, end });
    req.on('close', () => stream.destroy());
    res.on('close', () => stream.destroy());
    stream.on('error', () => res.end());
    stream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    });

    const stream = fs.createReadStream(safePath);
    req.on('close', () => stream.destroy());
    res.on('close', () => stream.destroy());
    stream.on('error', () => res.end());
    stream.pipe(res);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Media server active on http://127.0.0.1:${PORT}`);
});
