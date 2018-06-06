var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KospiDaySchema = new Schema({
    date: {type:String, unique:true},
    increase: {type:String},
    expenses: {type:String},
    fluctuation: {type:String},
    trade: {type:String},
    tradeCost: {type:String},
    individual: {type:String},
    foreigner: {type:String},
    institution: {type:String}
});
module.exports = mongoose.model("KospiDay", KospiDaySchema);