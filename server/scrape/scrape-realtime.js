
var server = require('http').createServer();
var io = require('socket.io')(server);
var scrapping = require('./scrape');
var cron = require('node-cron');

var scrapeInfos = require('../info/kospiInfo');
var scrapeData={};
var keys = Object.keys(scrapeInfos);
var length = keys.length;
var i = 0;
var socket;


cron.schedule("*/20 * 9-15 * * 1-5", async function() {
    try{
        scrapeData[keys[i]] = await scrapping(scrapeInfos[keys[i++]],1);

        if( !socket.disconnected){
            console.log('sendData:',scrapeData);
            socket.emit('message', scrapeData );
        }
        if(i >= length) i = 0;
    } catch(err) {
        console.error(err);
        throw "Invoke Error In cronSchedule";
    }
}).start();

module.exports = function wsSocket() {
    io.on('connection', (client) => {   
        socket = client;   
        client.on('disconnect', (reason) => {
            console.log("disconnect:",client.id);
        })
    })
}
server.listen(8080);