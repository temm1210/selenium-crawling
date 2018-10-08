var KeeperInfo = require('../server-info/server-info').NodeKeeper;
var socket = require('socket.io-client')(`http://localhost:${KeeperInfo.port}`);


module.exports = function(serverInfo, onReceive) {
    socket.on('connect', () => {
        console.log(`---${serverInfo.name} connect to server: ${KeeperInfo.name}:${KeeperInfo.port})`);
        socket.emit('message', serverInfo);
    });
    
    
    socket.on('message',(microNodes) => {  
        onReceive(microNodes);
    });
    

    socket.on('disconnect', (reason) => {
        console.log(`---Client Close..${reason}`);
    });
    
    
    socket.on('reconnect_attempt', (number) => console.log(`###  RECONNECT TO KEEPER ${number} times`));  
}
