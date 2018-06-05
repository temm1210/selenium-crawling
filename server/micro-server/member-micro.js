var express = require('express');
var bodyParser = require('body-parser');
var MicroMemberInfo = require('../server-info/server-info').MicroMember;
var connectToKeeper = require('../socket-client/connect-to-keeper');
var morgan = require('morgan');
var passport = require('passport');
var memberRoute = require('../routers/member');
var mongoose = require('mongoose');
var app = express();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/kospiMember');
const db = mongoose.connection;
db.once('open', () => {
    console.log(`MongoDB Member is Open`)
})
var app = express();

connectToKeeper(MicroMemberInfo, (microNodesInfo) => {
    console.log('##############  RECEIVE MESSAGE ############## \n', microNodesInfo); 
})

app.use(passport.initialize());
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({urlencoded:false}));

app.use('/member',memberRoute);


app.listen(MicroMemberInfo.port, 'localhost', () => {
    console.log(`\n************MicroBook PORT:${MicroMemberInfo.port} ************ \n`);    
})

//for test
module.exports = app;