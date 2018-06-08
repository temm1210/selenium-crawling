
var server = require('http').createServer();
var io = require('socket.io')(server);
var scrapping = require('./scrape');
var cron = require('node-cron');
var scrapeInfos = require('../info/kospiInfo');
var _ = require('lodash');
var redis = require('redis');
var KospiDay = require('../model/KospiDay');
var redisClient = redis.createClient();
var keys = Object.keys(scrapeInfos);
var socket;

//"*/20 * 9-15 * * 1-5"
var cronKospi = cron.schedule("*/15 * 9-15 * * 1-5", async function() {
    try{
        let scrapeArr=[];
        if( socket && !socket.disconnected){
            keys.map((key) => {
                let scrapeObj =scrapping(scrapeInfos[key],1);
                scrapeArr.push(scrapeObj) 
            });
            let scrapeData = await Promise.all(scrapeArr).then(data => data).catch((err) => {throw "Error Cron"})
            let sendData = _.zipObject(keys, scrapeData);

            console.log('sendData:',sendData );
            socket.emit('message', sendData  );
        }
    } catch(err) {
        console.error(err);
        throw "Invoke Error In cronSchedule";
    }
});
// cron.schedule("* * 15 * * 1-5")
//* * 15 * * 1-5
var cronDB = cron.schedule("* * 15 * * 1-5", function() {
    keys.map(key => {
        redisClient.hgetall(key, (err, replies) => {
            if(replies){
                let list = [];
                let kospiKeys = Object.keys(replies);

                kospiKeys.map((key) => {
                    list.push(JSON.parse(replies[key]));
                });
    
                saveData(list, key);
            }
        });
    });
});


function saveData(data, key) {
    // let schema = key.toLowerCase().includes("day") ? KospiDay : KospiTime;
    // schema.create(data, (err, data) => {
    //     if(err) console.log(`Error CRON DB ${key}`);
    //     else console.log(`Success Save data ${key}`);         
    // })

    let schema = key.toLowerCase().includes("day");
    if(schema) {
        KospiDay.create(data, (err, data) => {
            if(err) console.log(`Error CRON DB ${key}`);
            else {
                console.log(`Success Save data ${key}`);         
                redisClient.del(key);
            }
        })
    }
}

module.exports = function wsSocket() {
    io.on('connection', (client) => {   
        socket = client;   
        client.on('disconnect', (reason) => {
            console.log("disconnect:",client.id);
        })
    })
}
server.listen(8080);