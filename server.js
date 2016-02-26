const app           = require('express')(),
      bodyParser    = require('body-parser'),
      algorithm     = require('./algorithm.js'),
      port          = process.env.PORT | 3005;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
    res.send('Hello World!!');
});

app.post('/jsonify', function(req, res){
    console.log(req.body.data);
    res.send(algorithm(req.body.data));
});

app.listen(port, function(){
    console.log("LISTENING ON PORT " + port);
});