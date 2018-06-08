var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var redisClient = redis.createClient();
var KospiByDay = require('../model/KospiDay');
var {kospiTime, kospiDay} = require('../info/kospiInfo');

router.get('/', async (req, res) => {   
    let obj = {};

    console.log('-------------1--------------------');
    let [kospiTimes, kospiDays] =  await Promise.all( [getRedisData(kospiTime.id),getRedisData(kospiDay.id)] )
    console.log('-------------2--------------------');
    console.log("kospiTimes:",kospiTimes);
    console.log("kospiDays:",kospiDays);
    if(kospiDays === null){
        kospiDays = await KospiByDay.find();
    }
    obj[kospiTime.id] = kospiTimes;
    obj[kospiDay.id] = kospiDays;

    console.log("obj:",obj);

    res.json(obj);
})

function getRedisData(hash) {
    return new Promise(function(resolve, reject) {
        redisClient.hgetall(hash, (err, replies) => {
            if(err) reject(new Error("Redis Promise Error"));

            if(replies){
                let list = [];
                let keys = Object.keys(replies);
                keys.map((key) => {
                    list.push( JSON.parse(replies[key]) );
                });
                resolve(list);
            } else {
                resolve(null);
            }
            
        });
    })
}


module.exports = router;