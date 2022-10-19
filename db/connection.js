const { MongoClient } = require('mongodb')
const { DB_HOST, DB_USER,DB_PASSWORD, DB_NAME,DB_PORT } = require('./../config/config')

const uri =`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jagidr0.mongodb.net/test`
const client = new MongoClient(uri);

const getConnection = async ()=> {
  try {
    // Connect the client to the server (optional starting in v4.7)
    const rta = await client.connect();
    // Establish and verify connection
    let db =  rta.db(DB_NAME)//.command({ ping: 1 });

    console.log("Connected successfully to server");
     
    return db;
 
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}


module.exports = {
  getConnection
  };














