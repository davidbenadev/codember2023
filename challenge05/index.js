const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;


app.get('/', (req, res) => {

    let message = '';

    const data = fs.readFileSync('./message_05.csv', 'utf8');

    data.split('\r\n').forEach(element => {

        try {
            let row = element.split(',');
            let isValid = true;       

            let alphanumericregex = /^[a-zA-Z0-9]+$/;
            let emailregex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
            let numberregex = /^[0-9]+$/;
            let textregex = /^[a-zA-Z ]+$/;
    
            // Reglas de validación:
            // - id: existe y es alfanumérica
            let id = row[0] ? row[0] : null;
            isValid = alphanumericregex.test(id);
            
            if(!isValid) throw new Error(row[1] ? row[1] : null);
    
            // - username: existe y es alfanumérico
            let username = row[1] ? row[1] : null;
            isValid = alphanumericregex.test(username);

            if(!isValid) throw new Error(row[1] ? row[1] : null);

            // - email: existe y es válido (sigue el patrón user@dominio.com)
            let email = row[2] ? row[2] : null;
            isValid = emailregex.test(email);

            if(!isValid) throw new Error(row[1] ? row[1] : null);

            // - age: es opcional pero si aparece es un número
            if(row[3] !== undefined && row[3] !== null && row[3] !== '') {
                let age = row[3];
                isValid = numberregex.test(age);
                if(!isValid) throw new Error(row[1] ? row[1] : null);
            }

            // - location: es opcional pero si aparece es una cadena de texto
            if(row[4] !== undefined && row[4] !== null && row[4] !== '') {
                let location = row[4];
                isValid = textregex.test(location);
                if(!isValid) throw new Error(row[1] ? row[1] : null);
            }            

        }
        catch(err) {
            let username = err.message;
            if(username !== null) message += username[0];
            return;            
        }
    });

    res.send(message);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
