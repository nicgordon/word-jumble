import io from 'socket.io-client';

const socket = io(window.__config.gameServer);
module.exports = socket;
