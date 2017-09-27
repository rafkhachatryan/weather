var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var f = "data/info.json";
var mouth = ["january","february","march","april","may","june","july","august","september","october","november","december"];
var year = ["2009","2010","2011","2012","2013","2014","2015","2016"];
var urlbase  =  "https://pogoda.mail.ru/prognoz/erevan/";
var url = encodeURI("https://pogoda.mail.ru/prognoz/erevan/january-2009/");
var uri = [];

for (var i = 1;i<=12;i++)
{
    request(urlbase + mouth[i] + "-" + year[i] ,function(error,response,html){
    if(!error)
    {
    var $ = cheerio.load(html);
    $(".day__temperature").each(function(){
    var data = $(this);
    uri.push(data.text());
    fs.writeFile(f,JSON.stringify(uri));
    console.log(data.text());
    });
    }
});
}






