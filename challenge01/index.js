const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


app.get('/', (req, res) => {

    const data = fs.readFileSync('./message_01.txt', 'utf8');
    let words = [];
    let result = "";

    data.split(' ').forEach((word) => {
        words[word.toLowerCase()] = words[word.toLowerCase()] ? words[word.toLowerCase()] + 1 : 1;
    });

    for (let word in words) {
        result += `${word}${words[word]}`;
    }

    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
