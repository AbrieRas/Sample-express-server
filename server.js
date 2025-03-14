const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_VALUE = process.env.SECRET_VALUE || 'Default Secret';
const ALLOWED_IP = process.env.ALLOWED_IP || '';

// middleware
const ipFilter = (req, res, next) => {
    const clientIp2 = req.headers['x-forwarded-for'] || req.ip;
    console.log('Client IP:', clientIp2);
    console.log('env ip: ', ALLOWED_IP);
    // const clientIp = req.ip || req.connection.remoteAddress;
    if (clientIp === clientIp2) {
        next();
    } else {
        res.status(403).send('Access denied');
    }
};

// home
app.get('/', (req, res) => {
    res.send('Welcome to the express server!');
});

// text
app.get('/text', (req, res) => {
    res.send('You are smashing this!');
});

// environment variable
app.get('/environment', (req, res) => {
    res.send(`Secret Value: ${SECRET_VALUE}`);
});

// secret message
app.get('/secret', cors(), ipFilter, (req, res) => {
    res.send('You have accessed a restricted endpoint!');
});

// start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
