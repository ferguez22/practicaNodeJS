// Creación y configuración del servidor
const http = require('http');
const app = require('./src/app');

// Configuración .env
require('dotenv').config();

// Creación del servidor
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Listeners
server.on('listening', () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => {
    console.log(error);
});