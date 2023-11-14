const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


app.get('/', (req, res) => {

    const data = fs.readFileSync('./message_02.txt', 'utf8');
    let result = "";
    let initialValue = 0;

    // "#" Incrementa el valor numérico en 1.
    // "@" Decrementa el valor numérico en 1.
    // "*" Multiplica el valor numérico por sí mismo.
    // "&" Imprime el valor numérico actual.

    data.split('').forEach((symbol) => {
        switch (symbol) {
            case '#':
                initialValue++;
                break;
            case '@':
                initialValue--;
                break;
            case '*':
                initialValue *= initialValue;
                break;
            case '&':
                result += initialValue;
                break;        
            default:
                break;
        }
    });

    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
