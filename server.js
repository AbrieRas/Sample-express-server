const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Utility function to get the server's IP address
function getServerIp() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1'; // Default to localhost if no IP found
}

// GET request to modify text
app.get('/modify', (req, res) => {
    const queryText = req.query.text || 'Default text';
    const modifiedText = queryText.toUpperCase();
    res.send(`Modified GET text: ${modifiedText}`);
});

// POST request to modify text
app.post('/modify', (req, res) => {
    const bodyText = req.body.text || 'Default text';
    const modifiedText = bodyText.split('').reverse().join('');
    res.send(`Modified POST text: ${modifiedText}`);
});

// Start the server
app.listen(port, () => {
    const serverIp = getServerIp();
    console.log(`Server is running at http://${serverIp}:${port}`);
});
