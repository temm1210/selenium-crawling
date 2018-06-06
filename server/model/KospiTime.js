var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KospiTime = new Schema({
    date: {type:String, unique:true},
    price: {type:String},
    expenses: {type:String},
    fluctuation: {type:String},
    total: {type:String},
    trade: {type:String},
    tradeCost: {type:String}
});

module.exports = mongoose.model("KospiTime", KospiTime)