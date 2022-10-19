const { ObjectID, GridFSBucket } = require("mongodb");
const multer = require("multer");
const { Readable } = require("stream");
const { getConnection } = require("../../db/connection");

const getTrack2 = async (req, res) => {
  const lista = await db.listCollections().toArray();
  var rta = lista.filter((c) => c.name === "music");

  res.send("track");
};

const getTrack = (req, res) => {
  let trackID;
  try {
    trackID = new ObjectID(req.params.trackID);
  } catch (error) {
    return res.status(400).json({ message: "Invalid track in URL parameter." });
  }

  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  const db = getConnection();

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

const uploadTrack = (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: {
      fields: 1, // 1 non-file field
      fileSize: 9000000, // 9mb maximum size
      files: 1, // maximum 1 file
      parts: 3, // files + fields
    },
  }); //.array()
  //var upload = multer().array('image', 3);
  upload.single("track")(req, res, (err) => {
    if (err) {
      console.log(err);
      // return res.status(400).json({message: 'Upload Request Validation Failed'});
      return res.status(400).json({ message: err.message });
    } else if (!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }

    let trackName = req.body.name;

    // convert buffer to readable stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    const db = getConnection();
    let bucket = new GridFSBucket(db, {
      bucketName: "tracks",
    });

    let uploadStream = bucket.openUploadStream(trackName);
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
            "File uploaded successfully, stored under Mongo ObjectID: " + id,
        });
    });
  });
};

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

const prueba = async(req, res) =>{
  res.send("holaaa")
}

module.exports = {
  getTrack,
  uploadTrack,
  getList,
  prueba
};
