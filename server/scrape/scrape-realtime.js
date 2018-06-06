
var server = require('http').createServer();
var io = require('socket.io')(server);
var scrapping = require('./scrape');
var cron = require('node-cron');
var scrapeInfos = require('../info/kospiInfo');
var _ = require('lodash');
var redis = require('redis');
var KospiDay = require('../model/KospiDay');
var KospiTime = require('../model/KospiTime');
var redisClient = redis.createClient();
var keys = Object.keys(scrapeInfos);
var socket;

//"*/20 * 9-15 * * 1-5"
var cronKospi = cron.schedule("*/10 * 0-5 * * 1-5", async function() {
    try{
        let scrapeArr=[];
        console.log('-----------------------')
        // if( socket && !socket.disconnected){
        //     keys.map((key) => {
        //         let scrapeObj =scrapping(scrapeInfos[key],1);
        //         scrapeArr.push(scrapeObj) 
        //     });
        //     let scrapeData = await Promise.all(scrapeArr).then(data => data).catch((err) => {throw "Error Cron"})
        //     let sendData = _.zipObject(keys, scrapeData);

        //     console.log('sendData:',sendData );
        //     socket.emit('message', sendData  );
        // }

    } catch(err) {
        console.error(err);
        throw "Invoke Error In cronSchedule";
    }
});
//* * 3 * * 1-5
var cronDB = cron.schedule("*/30 * 6 * * 1-5", function() {
    let obj = {}; 
    let i = 0;

    keys.map(key => {
        let kospiData = redisClient.hgetall(key, (err, replies) => {
            let list = [];
            let kospiKeys = Object.keys(replies);

            kospiKeys.map((key) => {
                list.push(JSON.parse(replies[key]));
            });

            obj[key] = list;
            if(++i == keys.length) saveData(obj);
        });
        
    });
});


function saveData(data) {
    let day = data.kospiDay;
    let time = data.kospiTime;

    
    keys.forEach((value,index) => {
        redisClient.del(key);
    })

    KospiDay.create(day, (error, data) => {
        if(error) console.log("Error CRON DB");
        else console.log("Success Save data:",data);       
    });

    KospiTime.create(time, (error, data) => {
        if(error) console.log("Error CRON DB");
        else console.log("Success Save data:",data);       
    });
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