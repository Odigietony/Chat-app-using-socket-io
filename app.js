const express = require('express');//import the express framework.
const app = express();//initialise express 

const http = require('http').Server(app);
const socket_io = require('socket.io')(http);

const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

app.use('/static', express.static(path.join(__dirname, 'static')));

//Fire a connect and disconnect event each time user connects or disconnects(reload the page).
socket_io.on('connection', (socket) => {
     console.log('User connected...');
     socket.on('chat message', (msg) => {
         console.log('Message: ' + msg);
         socket_io.emit('chat message', msg);
     });
});
 
const port = process.env.PORT || 3500;//setting the environment port that assigns a port number
http.listen(port, () => {
    console.log(`Listening on port ${ port }`);
