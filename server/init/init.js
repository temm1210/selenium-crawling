var scrape = require('../scrape/scrape');
var {kospiTime, kospiDay} = require('../info/kospiInfo');


module.exports = function start(){
    scrape(kospiTime, 10);
    scrape(kospiDay, 10);
};