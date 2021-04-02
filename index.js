const PORT = 3000;

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html'); 
});


const server = app.listen(PORT, console.log('Server started, port', PORT));

const players = {};

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('registerNewPlayer', (user) => {
        let userRegistration = false;
        if (user.name.length > 7) {
            const id = Math.round(Math.random() * 1000000);

            players[id] = { name: user.name, id: id, registrationDate: Date.now(), online: true, 
                            builds: [
                                { x: 5, y: 2, clite: "base_clite" },
                            ], units: [] };

            userRegistration = true;

            socket.emit('registerNewPlayerFinish', true, players[id]);
            console.log('New user', user.name);
        }

        if ( !userRegistration ) 
            socket.emit('registerNewPlayerFinish', false, undefined);
    });

    socket.on('checkOnlineSuccessful', (id) => {
        players[id].online = true;
    });
    
    socket.on('disconnect', () => {
        for (let id in players) {
            players[id].online = false;
        }

        io.emit('checkOnline', true);
    });

    socket.on('sendMessage', (message) => {
        if (message)
            if (message.player)
                message.player = message.player.name;
        
        io.emit('sendMessageGet', (message));
    });
});

function update() {
    io.emit('sendPlayersList', function (players) {
        const result = players;

        //for (id in players) {
        //     result.push({ name: players[id].name });
        //}

        return result;
    }(players));

    setTimeout(update, 300);
}

update();