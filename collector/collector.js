var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var forEach = require('async-foreach').forEach;
var f = "data/info.json";       
var mouth = ["january","february","march","april","may","june","july","august","september","october","november","december"];
var year = ["2009","2010","2011","2012","2013","2014","2015","2016"];
var urlbase  =  "https://pogoda.mail.ru/prognoz/erevan/";
var url = encodeURI("https://pogoda.mail.ru/prognoz/erevan/january-2009/");
var uri = [];
var mydata ;
var a;
var amis,tari;
//var arr = [];

forEach(year, function(yea, index, arr) 
{
  forEach(mouth, function(mou, index, arr) {
       var day = 1;

        request(urlbase + mou + "-" + yea ,function(error,response,html){
        console.log('-----------------'+ mou + "-" + yea+'-----------------');
        if(!error)
        {
            var $ = cheerio.load(html);
            $("div > .day__temperature").each(function(){
                var data = $(this);
                a = ClearData(data.text());
                a = a.split('°');
                console.log(a);
                console.log("--------------------------------" +  "\n" + data.text() + mou + yea);

                 var mydata={
                    'aravot':a[0],
                    'gisher':a[1],
                    'amis':mou,
                    'tari':yea,
                    'or':day
                 };
                 uri.push(mydata);
                 fs.writeFile(f,JSON.stringify(uri)); 
                 day++;
            });

        
        }
        });
    });



});




function ClearData(str){
    str = str.trim();
    return str.replace(/[\t \n]/g, "");
}
































/*





foreach(amis in mouth)
{
    foreach(tari in year)
    {
    request(urlbase +  + "-" + year[i] ,function(error,response,html){
    if(!error)
    {
    var $ = cheerio.load(html);
    $("div > .day__temperature").each(function(){
    var data = $(this);
    a = ClearData(data.text());
    a = a.split('°');
    console.log(a);
    console.log("--------------------------------" +  "\n" + data.text() + mouth[i] + year[i]);

     mydata={
        'aravot':a[0],
        'gisher':a[1]
     };
     uri.push(mydata);
     fs.writeFile(f,JSON.stringify(uri));
    });

    
    }

});    }
}*/
















