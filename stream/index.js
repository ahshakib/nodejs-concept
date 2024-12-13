const express = require('express');
const app = express();
const fs = require("fs");
const port = 3030;

app.get('/', (req, res) => {
    fs.readFile("./sample.txt", (err, data) => {
        res.end(data);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
