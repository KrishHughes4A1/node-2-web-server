const express = require('express');
var app = express();
const hbs=require('hbs');
const fs = require('fs');
const port = process.env.PORT||8080;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');



app.use((res,req,next)=>{
    var now = new Date().toString();
    fs.appendFile('Loger.txt',now + res.url + res.method,(err)=>{

    });
    // console.log(now);
next();
});
// app.use((req,res,next)=>{
//     res.render('err.hbs');
// });
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return(new Date().getFullYear());
});
hbs.registerHelper('screamIt',(text)=>{
return(text.toUpperCase());
});
app.get('/',(req,res)=>{
res.render('home.hbs',{
    message : 'Welcome to my website',
    pageTitle : 'Home page'
});
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'AboutPage'
    });
});
app.get('/bad',(req,res)=>{
    res.send({'error':'Unable to process your request'});
});
app.get('/help',(req,res)=>{
app.render();
})
app.listen(port,()=>{
    console.log('Server is running on 8080');
});