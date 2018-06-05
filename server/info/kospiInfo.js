
kospiTime = {
    id:"kospiTime",
    name:"//iframe[@src='/quote/kospi_hhmm.daum']",
    selector:"//tr[td[@class='datetime2']]",
    selectors:[
        ".datetime2:nth-of-type(1)",
        ".num2:nth-of-type(2)",
        ".num:nth-of-type(3) > span",
        ".num:nth-of-type(4)",
        ".num:nth-of-type(5)",
        ".num:nth-of-type(6)",
        ".num:nth-of-type(7)"
    ],
    keys:["date", "price", "expenses", "fluctuation", "total", "trade", "tradeCost"]
}

kospiDay = {
    id:"kospiDay",
    name:"//iframe[@src='/quote/kospi_yyyymmdd.daum']",
    selector:"//tr[td[@class='datetime2']]",
    selectors:[
      ".datetime2",
      ".num2:nth-of-type(2)",
      ".num:nth-of-type(3) > span",
      ".num:nth-of-type(4)",
      ".num:nth-of-type(5)",
      ".num:nth-of-type(6)",
      ".num2:nth-of-type(7)",
      ".num:nth-of-type(8)",
      ".num:nth-of-type(9)",
    ],
    keys:["date", "increase", "expenses", "fluctuation", "trade","tradeCost", "individual", "foreigner", "institution"]
}

module.exports = {
    kospiTime,
    kospiDay
}