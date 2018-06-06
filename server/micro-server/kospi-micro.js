var express = require('express');
var MicroKospiInfo = require('../server-info/server-info').MicroKospi;
var connectToKeeper = require('../socket-client/connect-to-keeper');
var morgan = require('morgan');
var kospiRoute = require('../routers/kospi');
var mongoose = require('mongoose');
var scrapeRealtime = require('../scrape/scrape-realtime');

var app = express();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Kospi');
const db = mongoose.connection;

app.use(morgan('combined'));
db.once('open', () => {
    console.log(`MongoDB Kospi is Open`)
})


connectToKeeper(MicroKospiInfo, (microNodesInfo) => {
    console.log('##############  RECEIVE MESSAGE ############## \n', microNodesInfo); 
})

scrapeRealtime();

app.use('/kospi',kospiRoute);
app.listen(MicroKospiInfo.port, 'localhost', () => {
    console.log(`\n************MicroBook PORT:${MicroKospiInfo.port} ************ \n`);    
})

//for test
module.exports = app;