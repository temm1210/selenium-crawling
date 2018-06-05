var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KospiByDaySchema = new Schema({
    date: {type:Date, unique:true},
    increase: {type:Number},
    exp
})