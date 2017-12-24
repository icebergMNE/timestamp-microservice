var express = require('express')
var time = require('strftime')

const app = express()

app.get('/', (req,res)=>{
    res.send('this is timestamp api')
});

app.get('/:datestring', (req,res)=>{
    // res.writeHead(200, { 'Content-Type': 'application/json' });

    const datestring = req.params.datestring;

    let response = {
        unix:null,
        natural:null
    }

    let unix = 0;
    
    response.unix = Number(datestring);
    response.natural = new Date(datestring);
    if(response.unix){
        // response.natural = new Date(unix);
        response.natural = time('%B %d, %Y', new Date(response.unix * 1000));

    }
    else if(response.natural.getFullYear() && response.natural.getMonth() && response.natural.getDay()){
        response.unix = response.natural.getTime()/1000;
        response.natural = time('%B %d, %Y', new Date(datestring));
    }        

    
    res.send(response);
    
})


app.listen(80);