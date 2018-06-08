"use strict";

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var initSrcape = require('./init/init');
var kospi = require('./routers/kospi');
var bodyParser = require('body-parser');
var connectToKeeper = require('./socket-client/connect-to-keeper');
var GateInfo = require('./server-info/server-info').Gate;
var axios = require('axios');
var path = require('path');

var nodes = []
var app = express();

process.setMaxListeners(15);

connectToKeeper(GateInfo, (microNodes) => {
    nodes = microNodes;
    console.log('############## receive message ############## \n',nodes );
    console.log('############## ############## ############## \n');
});

initSrcape();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.resolve(__dirname,'..','client/dist/angularpwa')));
app.use('/', onRequest);

app.listen(GateInfo.port, 'localhost', () => {
    console.log(`express server open on ${GateInfo.port} port`)
})

function onRequest(req, res) {
    request(req, res, callback)  
}

//********************************** request handle **********************//
function callback(response, res) {
    console.log('Wow Good!!', response);
    res.json(response.data);   
}

function request(req, res, callback) {
    let basePath = requestPath(req.path);
    let microNode = findMicroService(basePath);
    console.log('http://localhost:${microNode.port}${req.url}:',`http//localhost:${microNode.port}${req.url}`)

    let config = {
        method:req.method,
        url:`http://localhost:${microNode.port}${req.url}`     
    }

    if(req.method === "POST" || req.method === "PUT")
        config.data = req.body;

    axios(config).then( response => process.nextTick(callback, response, res))
}

//*********************************** util function **************************** */
function requestPath(url) {
    let splitToken = '/';
    let urls = url.split( splitToken );
    let path = splitToken + urls[1];
    return path;
}

function findMicroService(path) {
    console.log('path:',path)
    return nodes.find((node) => node.server.path === path).server;
}
