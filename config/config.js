require('dotenv').config();

const config = {
      PORT : process.env.PORT || 3000,

     DB_HOST : process.env.DB_HOST ,
     DB_USER : process.env.DB_USER ,
     DB_PASSWORD : process.env.DB_PASSWORD ,

     DB_NAME : process.env.DB_NAME,
     DB_PORT : process.env.PORT || 27017

}

module.exports = config;

