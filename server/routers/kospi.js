var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var redisClient = redis.createClient();
var KospiByDay = require('../model/KospiDay');
var {kospiTime, kospiDay} = require('../info/kospiInfo');

router.get('/', (req, res) => {   
    getRedisData([kospiTime.id, kospiDay.id], (obj) => {
        if(obj.length == 0){
            KospiByDay.find((err, kospiDays) => {
                
            })
        }
        res.json(obj);
    });
})

function getRedisData(hashes,callback) {

    let obj = {}; 
    let i = 0;
    let hashArr = _.flattenDeep(hashes);

    hashArr.map((hash) => {
        redisClient.hgetall(hash, (err, replies) => {
            
            let list = [];
            let keys = Object.keys(replies);
            keys.map((key) => {
                list.push( JSON.parse(replies[key]) );
            });
            obj[hash] = list;

            if(++i == hashArr.length) callback(obj)
        });
    })
}


module.exports = router;