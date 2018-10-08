const _ = require('lodash');
const {By} = require('selenium-webdriver');

//스크래핑 헬퍼 
module.exports = class Helper {
    constructor(driver) {this.driver = driver;}

    //make new function structure. fn(fn(fn(...)))
    composeFunctions(...fns) {
        return (arg) => {
            return _.flattenDeep(fns).reduceRight((acc, fn) => {
                return fn(acc);
            }, arg)
        }
    }
    //get text . return string
    getElementText(selector, parentElement) {
        let element = parentElement || this.driver;

        return element.findElement(By.css(selector)).getText()
            .then((data) => data)
            .catch((err) => "Invoke Error in getElementText")
    }
    //** get all childs pairdata */
    getChildsTextObject(elements) {
        return (...selectors) => {
            return (...keys) => {
                let pairObject;
                let objectsFns = this.composeFunctions(this.pairObject, this.getChildsText(selectors));
                pairObject = objectsFns(elements)(keys);
                return pairObject;
            }
        }
    }
    //get childtext of elemeny by selectors. return array
    getChildsText(...selectors) {
        return (element) => {
            let childData = _.flattenDeep(selectors).map((selector) => {
                return this.getElementText(selector, element);
            });
            return Promise.all(childData).then(data => data).catch((err) => "Invoke Error getChildsText()");
        }
    }

    //make pair object using two keyArray, valueArray. return ({key:value,,,,})
    pairObject(elementObjArr) {
        return async (...keys) => {
            let keyArr = _.flattenDeep(keys);
            return _.zipObject(keyArr, (await elementObjArr));
        }
    }

    //print
    printKosdaq(stocks, key) {
        // _.mapKeys(stocks, (value, key) => {
            console.log("==============================================");
            console.log(stocks);
            console.log("==============================================");
        // })
    }
}
