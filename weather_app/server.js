const express = require('express');
const request = require('request');
const bodyParser =require('body-parser');
let app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.get('/' ,function (req,res){
  res.render('index',{weather:null,error:null});
})

app.post('/',function(req,res){
    let apiKey ='2c3444b75767446aa85195a1d6340899';
    let city=req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
      if(err){
        res.render('index',{weather:null,error:'error please try again'})
      }else{
      let weather=JSON.parse(body)
        if (weather.main == undefined) {
          res.render('index',{weather:null,error:'please try again'}) }
        else{
      let weatherText=`It's ${weather.main.temp}degrees in ${weather.name}!`;
      res.render('index',{weather:weatherText,error:null});
    }
    }
    });
})

app.listen(PORT,function(err){
  if (err){
    console.log(err);
  }else{
    console.log('Example app listening on port 3000!');
  }
});
