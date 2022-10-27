const multer = require('multer');
const jsmediatags = require("jsmediatags");
const { Readable } = require("stream");
const { ObjectID, GridFSBucket, MongoMissingCredentialsError } = require("mongodb");

const { getConnection } = require("../db/connection");

const upLoadFile = async(req, res) => {
    

    const storage = multer.memoryStorage();
    const upload = multer({
        storage,
        // limits: {
        //     fields: 1, // 1 non-file field
        //     fileSize: 9000000, // 9mb maximum size
        //     files: 10, // maximum 1 file
        //     parts: 3, // files + fields
        //     },
    }); 
    upload.array('tracks')
    (req, res, async(err) => {
       
         if(!req.files){
           res.send("Files was not found");
           return;  
         }
         try {
            let audios = req.files
            for(let audio of audios){
                buscaNombre(audio)             
            }

            res.sendStatus(201).send("Archivos subidos");

         } catch (error) {
           console.log(error);
           res.sendStatus(400);
         }
     
       });
}

 function buscaNombre2(listado) {
    let nombre={}
    jsmediatags.read(listado.buffer, {
        onSuccess:   function(tag) {
              
       
        //console.log(tag.tags.artist);
        //console.log(tag.tags.title);
        },
        onError: function(error) {
        console.log(':(', error.type, error.info);
        }
    });
}

function buscaNombre(listado) {
        
    new Promise((resolve, reject) => {
        new jsmediatags.Reader(listado.buffer)
          .read({
            onSuccess: (tag) => {
              console.log('Success!');
              let nombre={
                "artist":tag.tags.artist,
                "title":tag.tags.title
              }
              resolve(nombre);
            },
            onError: (error) => {
              console.log('Error');
              reject(error);
            }
        });
      })
        .then(tagInfo => {
          // handle the onSuccess return
        //   console.log(tagInfo)
          return guardar(tagInfo, listado)

        })
        .catch(error => {
          // handle errors
        });

}

const guardar = async(titulos, track)=>{
console.log("guardar")
    const db = await getConnection();

    let metadata =titulos;
    let trackName = titulos.title;

    const bucket = new GridFSBucket(db, {
        bucketName: "tracks",
      });
    const readableTrackStream = new Readable();
          
    readableTrackStream.push(track.buffer);
    readableTrackStream.push(null);

    let uploadStream =  bucket.openUploadStream(trackName,{metadata, contentType: null, aliases: null});

    readableTrackStream.pipe(uploadStream);

    uploadStream.on("error", () => {
        return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on("finish", () => {
            // return res
            //   .status(201)
            //   .json({
            //     message:
            //       "File uploaded successfully, stored under Mongo ObjectID: arriba" + audio.originalname,
            //   });
     });



}

module.exports = upLoadFile;
