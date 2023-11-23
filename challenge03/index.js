const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


app.get('/', (req, res) => {

    const data = fs.readFileSync('./message_03.txt', 'utf8');
    let number = 13;
    let result = "";
    let valid = 0;
    let invalid = 0;

    data.split('\n').forEach((line) => {
        let words = line.split(' ');
        let range = words[0].split('-');
        let letter = words[1].split(':')[0];
        let password = words[2];
        let count = 0;

        password.split('').forEach(element => {
            element === letter ? count++ : count;            
        });
        
        (count >= range[0] && count <= range[1]) ? valid++ : invalid++;

        if(invalid === number) {
            result += `Password: ${password}, Letter: ${letter}, Range: ${range[0]}-${range[1]}, Count: ${invalid}\n`;
        }

    });

    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
