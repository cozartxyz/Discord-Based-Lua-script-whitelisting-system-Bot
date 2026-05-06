const app = require('express')()
const md5 = require('md5')
const { Userdb } = require('../database/index')
const { connect } = require('mongoose')

connect('mongodb here').then(() => console.log('Connected to MongoDB'))

app.listen(80)
console.log('API Listening on port: 80')

const API_KEY = "key"

app.use(function (req, res, next) { 
res.header('Access-Control-Allow-Origin', '*') 
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key') 
next()
  })

var regularKeys = []

app.get('/', (req, res) => {
    res.send("API homepage")

})

app.use((req, res, next) => { 
const apiKey = req.get('API-Key') 
if (!apiKey || apiKey !== API_KEY) { 
res.status(401).json({error: 'unauthorised'}) 
} else { 
  next() 
}})


app.get('/getkey', (req, res) => {
var hash = Math.floor(Math.random() * 696969)
  
    var hasher = (md5(hash));
  
    var reguKey = hasher
  
    const keyer = {
        regKey: reguKey,
    }
    res.json(keyer);
    regularKeys.push(reguKey)
    
    console.log(`Key generated successfully: `+ `${reguKey}`)
  
})


app.param('key', function(req, res, next, key) {
    const modified = key
    req.key = modified;
    next();
});

app.param('hwid', function(req, res, next, hwid) {
    const modified = hwid
    req.hwid = modified;
    next();
});

app.param('exploit', function(req, res, next, exploit) {
    const modified = exploit
    req.exploit = modified;
    next();
});

app.param('userid', function(req, res, next, userid) {
    const modified = userid
    req.userid = modified;
    next();
});

app.get('/check/:key/:userid', function(req, res){
  if (regularKeys.includes(req.key)) {
    
        Userdb.create({
          key: req.key,
          hwid: "0",
          userId: "0",
          exploit: "0",
          discordId: req.userid
        })
          
        var response = "Key-Found"
    regularKeys = regularKeys.filter(item2 => item2 !== req.key)
              
        } else {
            response = "Key-Not-Found"
      }
      
        const statuser = {
            status: response
        }
        res.json(statuser);

})

app.get('/register/:key/:hwid/:exploit/:userid', async function(req, res){

  const findKey = await Userdb.findOne({ key: req.key })
  
  var response = "Key-Found"

  if(!findKey){
    response = "Key-Not-Found"
    } else { 

if (findKey.hwid == "0"){ 
    await Userdb.findOneAndUpdate(req.key,{
      hwid: req.hwid,
      userId: req.userid,
      exploit: req.exploit
    })
} else {
  response = "Key-Not-Found"
}
  }
  
    const statuser = {
        status: response,
    }
    res.json(statuser);
})


app.get('/login/:key/:hwid/', async function(req, res){
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddres
  console.log(ip+' - Maked New Request For This EndPoint /login')
  
  const findKey = await Userdb.findOne({ key: req.key })
  const checkHwid = await Userdb.findOne({ hwid: req.hwid })
  
    
  var resp = "Whitelisted"  
  
  if(!findKey){
    resp = "Not Whitelisted"
    } else if(!checkHwid) {
      resp = "Not Whitelisted"
  } else {
      if(req.key !== checkHwid.key){
        resp = "Not Whitelisted"
    }
    }
  
      const status = {
        message: resp
      }
      res.json(status);
  })

 
  
