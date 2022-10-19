const express = require('express')
const cors = require('cors');
const {PORT} = require('./../config/config')
const trackRoutes = require('./routes/track.routes')

//Initializations
const app = express();

const whitelist = ['http://192.168.1.89:8081','http://localhost:8081', 'https://backend-spotyrap-production.up.railway.app'];
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

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


//routes
app.get('/',(req, res)=>{
    res.send("funciona????")
})  

app.use(trackRoutes)

app.listen(PORT)
console.log( `Servidor arriba ${PORT}` )  