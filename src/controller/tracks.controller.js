const { ObjectID, GridFSBucket, MongoMissingCredentialsError } = require("mongodb");
const { Readable } = require("stream");
const { getConnection } = require("../../db/connection");
const multer = require('multer');

const jsmediatags = require("jsmediatags");

const getTrack = async(req, res) => {
  let trackID;
  try {
    trackID = new ObjectID(req.params.trackID);
  } catch (error) {
    return res.status(400).json({ message: "Invalid track in URL parameter." });
  }

  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  const db = await getConnection();

  let bucket = new GridFSBucket(db, {
    bucketName: "tracks",
  });

  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("error", () => {
    res.sendStatus(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });
};

const uploadTrack =  async(req, res) => {

  const db = await getConnection();
 // const storage = multer.memoryStorage();
  // const upload = multer({
     
  //   storage
  //  // limits: {
  //  //   fields: 1, // 1 non-file field
  //  //   fileSize: 9000000, // 9mb maximum size
  //   //  files: 2, // maximum 1 file
  //   //  parts: 3, // files + fields
  //   //},
  // }); 

  upLoadFile()
  (req, res, (err) => {
   //upload.array('tracks'), function(req, res) {



      console.log(req.files)

    if(!req.files){
      res.send("Files was not found");
      return;  
    }
  
    if (err) {
      // return res.status(400).json({message: 'Upload Request Validation Failed'});
      return res.status(400).json({ message: err.message });
    } else if (req.body.originalname) {
      return res.status(400).json({ message: "No track name in request body" });
    }
    
    try {
      
      let audios = req.files
         
    // return res.status(201).json({ message: err.message });
    //  res.end();
    const readableTrackStream = new Readable();
    const bucket = new GridFSBucket(db, {
      bucketName: "tracks",
    });
      let uploadStream;
      for(let audio of audios){


          //convert buffer to readable stream
        
          readableTrackStream.push(audio.buffer);
          readableTrackStream.push(null);
          

        
          //let trackName =metadata.title;
          let trackName =audio.originalname;
          
          //let uploadStream =  bucket.openUploadStream(trackName,{metadata, contentType: null, aliases: null});
         //uploadStream+=( bucket.openUploadStream(trackName));
          //let id = uploadStream.id;

          // uploadStream.on("error", () => {
          //   return res.status(500).json({ message: "Error uploading file" });
          // });

        //  uploadStream.on("finish", () => {
            // return res
            //   .status(201)
            //   .json({
            //     message:
            //       "File uploaded successfully, stored under Mongo ObjectID: arriba" + audio.originalname,
            //   });
        //  });






      }

    //  console.log(uploadStream)
    //  readableTrackStream.pipe(uploadStream);


    //  res.sendStatus(201).send({message: 'Archivos subido!'});
    //  res.end()
    //  return res;

    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }

  });
};


const result = async(meta, db) =>{

  console.log(db)
  let bucket = new GridFSBucket(db, {
    bucketName: "tracks",
  });
  //let trackName = req.body.name;
  let trackName = meta.title;
  


 jsmediatags.read(ubicacion, {
    onSuccess:  function(tag) {
      metadata ={
        "artist": tag.tags.artist,
        "title" :tag.tags.title
      }
     
      


      trackName = metadata.title

  let uploadStream =  bucket.openUploadStream(trackName,{metadata, contentType: null, aliases: null});
      
  let id = uploadStream.id;
  readableTrackStream.pipe(uploadStream);

  uploadStream.on("error", () => {
    return res.status(500).json({ message: "Error uploading file" });
  });

  uploadStream.on("finish", () => {
    return res
      .status(201)
      .json({
        message:
          "File uploaded successfully, stored under Mongo ObjectID: aqui? " + id,
      });
  });

       
    },
    onError: function(error) {
      console.log(':(', error.type, error.info);
    }
  })





}
  
 const metadata2 = (ubicacion)=> jsmediatags.read(ubicacion, {
    onSuccess:  function(tag) {
      meta ={
        "artist": tag.tags.artist,
        "title" :tag.tags.title
      }
       
    },
    onError: function(error) {
      console.log(':(', error.type, error.info);
    }
  })

const getList = async (req, res) => {
  try {
    const db = await getConnection();
    const documentos = await db.collection("tracks.files");
    let documentList = await documentos.find({}).toArray()//.then((ans) => {
    res.send(documentList);  

  } catch (error) {
    console.log(error)
  }
  
    
};


module.exports = {
  getTrack,
  uploadTrack,
  getList
  
};
