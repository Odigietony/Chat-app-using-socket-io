$(() => {
    //Make Connection.
    let socket = io();

    //Submit message from client to server
    $('form').submit(() => {
        socket.emit('chat message', {
           Username: $('#username').val(), 
           Message: $('#message').val()
        });
        $('#message').val('');
        return false;
    });

    $('#message').keypress(() => {
        socket.emit('is typing', $('#username').val());
    });

    //Recieve message from server and 
    //Display message from server back to all connected clients.
    socket.on('chat message', (msg) => {
        $('#feedback').html('');
        $('#messages').append($('<li>').prepend($('<strong>').text(msg.Username + ": " + msg.Message)));
    });

    socket.on('is typing', (data) => {
        $('#feedback').html('<em>' + data + ' is typing a message...' + '</em>');
    })
});