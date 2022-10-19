const {Router} = require('express')
const router = Router();
const { getTrack, uploadTrack, getList, prueba} = require('../controller/tracks.controller')

router.get('/tracks/:trackID', getTrack)  
router.get('/tracks', getList)  
router.post('/tracks', uploadTrack)

module.exports = router;

