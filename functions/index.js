const functions = require('firebase-functions');
const express = require('express');
const cors = require("cors");
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const axios = require('axios');

app.get('/', (req, res)=>{
    console.log('root req.body');
    console.log(req.body);

    res.status(200).send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="https://frames-api-t.web.app/images/cat.png" />
                <meta property="fc:frame:button:1" content="Green" />
                <meta property="fc:frame:button:2" content="Purple" />
                <meta property="fc:frame:button:3" content="Red" />
                <meta property="fc:frame:button:4" content="Blue" />
            </head>
            <body>
                hi app
            </body>
        </html>
    `)
});

app.get('/test', (req, res)=>{
    console.log('GET test req.body');
    console.log(req.body);
    res.sendFile(path.join(__dirname,'pages/','test.html'));
});

app.post('/test', async (req, res)=>{
    console.log('POST test req.body');
    console.log(req.body);

    const url = `http://127.0.0.1:2281/v1/submitMessage`;

    const postConfig = {
        headers: { "Content-Type": "application/octet-stream" },
        auth: { username: "username", password: "password" },
    };

    // Encode the message into a Buffer (of bytes)
    //const messageBytes = Buffer.from(Message.encode(castAdd).finish());

    try {
        const response = await axios.post(url, messageBytes, postConfig);
        console.log('response');
        console.log(response);
    } catch (e) {
        console.log('error');
        console.log(e);
    }

    res.send(200);
});

exports.app = functions.https.onRequest(app);