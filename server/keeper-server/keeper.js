var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var KeeperInfo = require('../server-info/server-info').NodeKeeper

//save all micro nodes and else nodes
var nodes = [];

io.on('connection', (socket) => {
    console.log('############## keeper open ############## \n',KeeperInfo );
    //******************** save new nodes ******************** 
    socket.on('message', (microInfo) => {
        nodes.push({
            key: socket.id,
            server: microInfo
        });
        console.log('keeper ############## receive message ############## \n',nodes );
        io.emit('message', nodes);
    })


    //******************** delete disconnected nodes ******************** 
    socket.on('disconnect', () => {
        deleteNode(socket)
    })

    socket.on('error', () => {
        deleteNode(socket)
    })
})

function deleteNode(socket) {
    let key = socket.id;
    let deleteNode = nodes.find((node) => {
        return node.key === key;
    })

    nodes = nodes.filter((node) => {
        return node.key !== deleteNode.key
    })
    console.log('############## disconnect node ############## \n',deleteNode );
    io.emit('message',nodes );
}
server.listen(KeeperInfo.port);