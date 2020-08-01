var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

// using css / js / assets
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

// send index file
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

// declare last player id
server.lastPlayderID = 0;

// temp server connection
server.listen(process.env.PORT || 8081, function () {
    console.log('http://127.0.0.1:'+ server.address().port);
});

// when connected
io.on('connection',function(socket){

    console.log('player entered');
    // console.log('socket.broadcast:', socket.broadcast);

    // add new player to world
    socket.on('newplayer',function(){

        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
        };

        console.log('socket.player:', socket.player);
        
        // function return player list in array
        socket.emit('allplayers', getAllPlayers());

        // show new player to all the hosts
        socket.broadcast.emit('newplayer', socket.player);

        // when move player position (might be action will fill this stuffs)
        socket.on('click', function (data) {
            console.log('click to '+ data.x +', '+ data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move', socket.player);
        });

        // when player quit do remove work
        socket.on('disconnect', function () {
            io.emit('remove', socket.player.id);
        });
    });
});


function getAllPlayers(){
    var players = [];
    console.log('io.sockets.connected:', io.sockets.connected);

    Object.keys(io.sockets.connected).forEach( function (socketID) {

        var player = io.sockets.connected[socketID].player;

        console.log('player:', player);

        if(player) {
            players.push(player);
        };
    });

    console.log('players:', players);

    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
