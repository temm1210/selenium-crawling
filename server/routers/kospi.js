const express = require('express');
const router = express.Router();
const redis = require('redis');
const redisClient = redis.createClient();
var {kospiTime, kospiDay} = require('../info/kospiInfo');

router.get('/', (req, res) => {   
    let dat = {}

    let optionTime = [ kospiTime.id, 'By', 'date_*','DESC'];
    let optionDay = [ kospiDay.id, 'By', 'date_*','DESC'];

    redisClient.multi()
        .sort( optionTime, function(err, values) {
                if(err) throw "Invoke Error in Router.get('/')"
                dat[kospiTime.id] = values.map( (value) => JSON.parse(value));
            }
        )
        .sort(optionDay, function(err, values) {
                if(err) throw "Invoke Error in Router.get('/')"
                dat[kospiDay.id] = values.map( (value) => JSON.parse(value)); 
            }
        )
        .exec((err, result) => res.json(dat)
    )
})

function sorting(key) {
    redisClient.sort(
        key,
        'By',
        'date_*',
        function(err, values) {
            if(err) {
                console.error(err);
                throw "Invoke Error in Router.get('/')"
            }
            else return values;
        }
    )
}

module.exports = router;