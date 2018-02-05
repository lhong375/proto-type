var express = require('express');
var app = express();
var redis = require('redis');
var bodyParser = require('body-parser');


app.use(express.static(__dirname));

app.listen(process.env.PORT || 3000, function() {
    console.log('Server listening at:'+(process.env.PORT || 3000));
});

// Create Redis Client
let client = redis.createClient({host : 'localhost', port : 6379});

client.on('connect', function(){
  console.log('Connected to Redis...');
});


///////////////////////////////////////////////////////////////////////////////////////

var key1 = "auto-tune:3690c1cf-845f-4383-a4f4-368dea656444:android";
var value1 = '{\"studio\":\"LindaSoft\",\"bundle\":\"com.lindasoft.tanks\",\"name\":\"Tanks\",\"project_id\":\"3690c1cf-845f-4383-a4f4-368dea656444\",\"platform_name\":\"android\",\"sampling_rate\":0.5}';
var key2 = "auto-tune:3690c1cf-845f-4383-a4f4-368dea656444:ios";
var value2 = '"{\"studio\":\"LindaSoft\",\"bundle\":\"com.lindasoft.tanks\",\"name\":\"Tanks\",\"project_id\":\"3690c1cf-845f-4383-a4f4-368dea656444\",\"platform_name\":\"ios\",\"sampling_rate\":0.5}"';
var testObj = {
	key1 : value1,
	key2 : value2
}

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
var jsonParser = bodyParser.json();

app.use (
	function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
	}
);

app.post('/saveConfigurations/:id', jsonParser, function(req, res, next) {
  console.log("server /saveConfigurations/"+req.params.id);
  let newConfig = req.body.newConfig;
  let dbKey = req.body.dbKey;
  console.log("will save new config for dbKey#"+dbKey, newConfig);
  if(dbKey && newConfig) {
    let newConfigStr = JSON.stringify(newConfig);
    client.set(dbKey, newConfigStr, function(err, reply) {
      if(err) {
        console.error(err);
        res.statusCode = 400;
        res.json(err);
        res.end();
      }
      console.log("save new config, success!");
      client.get(dbKey, function(err, reply) {
        if(err) {
          console.error(err);
          res.statusCode = 400;
          res.json(err);
          res.end();
        }
        console.log("after saving, retreive lates config, success!");
        var replyJson = Object.assign({}, {
          [dbKey]: JSON.parse(reply)
        });
        res.json(replyJson);
        res.end();
      }
      );
    });
  } else {
    res.statusCode = 400;
    res.json("missing dbKey or newConfig");
    res.end();
  }
  
});

app.get('/getAppInfo/:id', function(req, res, next){
  console.log("server /getAppInfo/"+ req.params.id);
  let id = req.params.id;//"auto-tune:3690c1cf-845f-4383-a4f4-368dea656444:android";//req.body.id;
  client.get(id, function(err, reply){
    if(!reply){
      console.log("getAppInfo, error!!",err);
      res.statusCode = 404;
      res.json(err);
      res.end();
    } else {
      console.log("getAppInfo, success!!",reply);
      res.json(reply);
      res.end();
    }
  });
  
});

app.get('/health', function(req, res, next){
  console.log("test /health");
  res.json(testObj);
  res.end();
  let id = "auto-tune:3690c1cf-845f-4383-a4f4-368dea656444:android";//req.body.id;
  client.get(id, function(err, reply){
    if(!reply){
    	console.log("error!!",err);
    } else {
       console.log("success!!",reply);
    }
  });
	
});

///////////////////////////////////////////////////////////////////////////////////////

