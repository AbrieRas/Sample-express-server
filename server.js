const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the express server!');
});

// endpoint
app.get('/w', (req, res) => {
    res.send('You are smashing this!');
});

// start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
