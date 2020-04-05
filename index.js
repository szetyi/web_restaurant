const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Build filepath

    let filePath = path.join(
        __dirname, 'public',
         req.url === '/' ? 'index.html' : req.url);

    // Extension of file
    let extName = path.extname(filePath);

    // Initial content type
    let concentType = 'text/html';

    // Check extension and set content type

    switch(extName) {
        case '.js':
            concentType = 'text/javascript';
            break;
        case '.css':
            concentType = 'text/css';
            break;
        case '.png':
            concentType = 'image/png';
            break;
        case '.jfif':
            concentType = 'image/jpeg';
            break;
        case '.jpeg':
            concentType = 'image/jpeg';
            break;
        case '.json':
            concentType = 'application/json';
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {

        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, {'Content-Type': concentType});
            res.end(content);
        }


    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

