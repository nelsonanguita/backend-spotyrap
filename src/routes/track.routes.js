const {Router} = require('express')
const { getTrack, uploadTrack, getList} = require('../controller/tracks.controller')
const upLoadFile  = require('../../middleware/multer')

const router = Router();


router.get('/:trackID', getTrack)  
router.get('/', getList)  


//  validatorHandler(getCategorySchema, 'params'),

router.post('/',upLoadFile);

module.exports = router;
