var kospiDay = require('./model/KospiDay');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Kospi-test');
const db = mongoose.connection;
db.once('open', () => {
    console.log(`MongoDB kospiByTime is Open`)
})


var arr = [
    { 
        date: '18.06.05',
        increase: '2,453.76',
        expenses: '6.00',
        fluctuation: '+0.25%',
        trade: '501,363',
        tradeCost: '7,344,810',
        individual: '+920',
        foreigner: '-86',
        institution: '-950' 
    },
    {
        date: '18.06.052',
        increase: '2,453.761',
        expenses: '6.001',
        fluctuation: '+0.251%',
        trade: '501,3631',
        tradeCost: '7,344,8101',
        individual: '+9201',
        foreigner: '-861',
        institution: '-9501'       
    }
    ,
    {
        date: '18.06.053',
        increase: '2,453.761',
        expenses: '6.001',
        fluctuation: '+0.251%',
        trade: '501,3631',
        tradeCost: '7,344,8101',
        individual: '+9201',
        foreigner: '-861',
        institution: '-9501'       
    }
    ,
    {
        date: '18.06.054',
        increase: '2,453.761',
        expenses: '6.001',
        fluctuation: '+0.251%',
        trade: '501,3631',
        tradeCost: '7,344,8101',
        individual: '+9201',
        foreigner: '-861',
        institution: '-9501'       
    }
    ,
    {
        date: '18.06.055',
        increase: '2,453.761',
        expenses: '6.001',
        fluctuation: '+0.251%',
        trade: '501,3631',
        tradeCost: '7,344,8101',
        individual: '+9201',
        foreigner: '-861',
        institution: '-9501'       
    }
    ,
    {
        date: '18.06.056',
        increase: '2,453.761',
        expenses: '6.001',
        fluctuation: '+0.251%',
        trade: '501,3631',
        tradeCost: '7,344,8101',
        individual: '+9201',
        foreigner: '-861',
        institution: '-9501'       
    }
    ,
    {
        date: '18.06.057',
        increase: '2,453.761',
        expenses: '6.001',
        fluctuation: '+0.251%',
        trade: '501,3631',
        tradeCost: '7,344,8101',
        individual: '+9201',
        foreigner: '-861',
        institution: '-9501'       
    }
    ,
    {
        date: '18.06.058',
        increase: '2,453.761',
        expenses: '6.001',
        fluctuation: '+0.251%',
        trade: '501,3631',
        tradeCost: '7,344,8101',
        individual: '+9201',
        foreigner: '-861',
        institution: '-9501'       
    }
    ,
    {
        date: '18.06.059',
        increase: '2,453.761',
        expenses: '6.001',
        fluctuation: '+0.251%',
        trade: '501,3631',
        tradeCost: '7,344,8101',
        individual: '+9201',
        foreigner: '-861',
        institution: '-9501'       
    }
    ,
    {
        date: '18.06.010',
        increase: '2,453.761',
        expenses: '6.001',
        fluctuation: '+0.251%',
        trade: '501,3631',
        tradeCost: '7,344,8101',
        individual: '+9201',
        foreigner: '-861',
        institution: '-9501'       
    }
]

console.log(arr.length);
// kospiDay.create(arr,function(error,data) {
//     console.log(data)
// })

kospiDay.create(    {
    date: '18.06.011',
    increase: '2,453.761',
    expenses: '6.001',
    fluctuation: '+0.251%',
    trade: '501,3631',
    tradeCost: '7,344,8101',
    individual: '+9201',
    foreigner: '-861',
    institution: '-9501'       
},function(error,data) {
    console.log(data)
})
