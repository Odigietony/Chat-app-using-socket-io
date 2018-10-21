const express = require('express');//import the express framework.
const app = express();//initialise express 
const socket = require('socket.io');
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use( '/scripts', express.static(path.join(__dirname, 'scripts')));

//Setting the environment port that assigns a port number
const port = process.env.PORT || 3500;
const server = app.listen(port, () => {
    console.log(`Listening on port ${ port }`);
});

//Socket Setup
const socket_io = socket(server);

//Listen for a connection and Fire a connect 
//and disconnect event each time user connects 
//or disconnects(reload the page).
socket_io.on('connection', (socket) => {
    console.log('User connected...', socket.id);

    //Listen for a chat message from client, collect the message data
    //in the msg parameter.
    socket.on('chat message', (msg) => {
        console.log(msg.Username + ": " +  msg.Message);

        //Send message back to client.
        socket_io.emit('chat message', msg);
    });

    socket.on('is typing', (data) => {
        socket.broadcast.emit('is typing', data);
    });
});