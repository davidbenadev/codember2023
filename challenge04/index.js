const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


app.get('/', (req, res) => {

    const data = fs.readFileSync('./message_04.txt', 'utf8');
    let number = 33;
    let result = "";
    let valid = 0;

    data.split('\r\n').forEach((line) => {

        let file = line.split('-');
        let match = false;
        
        (file[0] === file[1]) ? match = true : match = false;

        if(!match) {
            let prevCharInvalid = false;

            file[1].split('').forEach((char) => {

                if(prevCharInvalid) return;

                let regex = new RegExp(char, "g");
                let count = file[0].match(regex).length;

                if(count !== 1) {
                    prevCharInvalid = true;
                }

            });
            
            if(!prevCharInvalid) match = true;
        }

        match ? valid++ : null;
        
        if(match && valid == number) {
            result = `File: ${file[0]}, Checksum: ${file[1]}, Count: ${valid}\n`;
        }
    });

    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
