const express = require('express');
const app = express();
const fs = require("fs");
const zlib = require("zlib")
const port = 3030;

fs.createReadStream('./sample.txt').pipe(
    zlib.createGzip().pipe(fs.createWriteStream('./sample.zip'))
)

app.get('/', (req, res) => {
    const stream = fs.createReadStream('./sample.txt', 'utf-8');
    stream.on('data', (chunk) => {
        res.write(chunk)
    });
    stream.on('end', () => res.end())
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
