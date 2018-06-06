var {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var Helper = require('./helper');
var redis = require('redis');
var redisClient = redis.createClient();

module.exports = async function scrapping(object, number) {
    redisClient.on("error", (err) => {
        console.log("Error " + err);
    })
    // let ser = new chrome.ServiceBuilder(args.chromeDriver).build();
    var chromeOptions = new chrome.Options()
        .addArguments("--headless")
        .addArguments("--disable-gpu")
        .addArguments("--no-sandbox")
        
    var driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();    
    
    var SeleniumHelper = new Helper(driver);

    try{
        await driver.get('http://finance.daum.net/quote/kospi.daum?nil_stock=refresh');

        await driver.switchTo().defaultContent();
        await driver.switchTo().frame(driver.findElement(By.xpath(object.name)));

        let i = 1;
        let redisKey = object.id;
        let kospiTrsByDay
        let scrapeData;
        let key;
        const reg = /[.,:]/g;
        
        while(i <= number) {
            kospiTrsByDay = await driver.findElement((By.xpath(`/descendant::tr[td[@class='datetime2']][${i++}]`)));
            scrapeData = await SeleniumHelper.getChildsTextObject(kospiTrsByDay)(object.selectors)(object.keys);
            key = scrapeData.date.replace(reg, "");
            redisClient.hmset(redisKey,[key, JSON.stringify(scrapeData)])
        }
        return scrapeData;
    }catch(err){
        console.log(err);
    }finally{
        await driver.quit();
    }
};
