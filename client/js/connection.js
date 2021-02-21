const socket = io();

console.log('Client connected!');

socket.on('checkOnline', () => {
    socket.emit('checkOnlineSuccessful', Player.id)
});
