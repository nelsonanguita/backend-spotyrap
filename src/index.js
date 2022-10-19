const express = require('express')
const cors = require('cors');
const {PORT} = require('./../config/config')
const trackRoutes = require('./routes/track.routes')

//Initializations
const app = express();

const whitelist = ['http://192.168.1.89:8081','http://localhost:8081', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

//routes
app.get('/',(req, res)=>{
    res.send("funciona????")
})  

app.use(trackRoutes)

app.listen(PORT)
console.log( `Servidor arriba ${PORT}` )  