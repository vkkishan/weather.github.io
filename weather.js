//how create api
// bfaae0bd0de04150d4b5fbb2de123b93

// api.openweathermap.org/data/2.5/weather?q=surat&appid=bfaae0bd0de04150d4b5fbb2de123b93


const http = require("http");
const fs = require('fs');
var requests = require("requests");// installed karvu pade

const weatherFile = fs.readFileSync("weather.html","utf-8");

const replaceVal = (tempVal,orgVal) => {
    let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    return temperature;
};

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=surat&units=metric&appid=bfaae0bd0de04150d4b5fbb2de123b93')
        .on('data', (chunk) => {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata]
        //   console.log(arrData[0].main.temp);
        const realTimeData = arrData.map((val) => replaceVal(weatherFile,val))
        .join("");
        res.write(realTimeData);
            // console.log(realTimeData);
        })

        .on('end', (err) => {
          if (err) return console.log('connection closed due to errors', err);
          res.end();
        });
    }
});

server.listen(9000,"127.0.0.1");