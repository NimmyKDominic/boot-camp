const request =require('request');
const argv = require('yargs').argv;

let apiKey ='2c3444b75767446aa85195a1d6340899';
let city = argv.c ||'Boston';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

request(url, function (err, response, body) {
  if(err){
  console.log('error:', err);
}else{
  let weather =JSON.parse(body);
  let message=`It's ${weather.main.temp}degrees in ${weather.name}!`;
  console.log(message);
}
});
