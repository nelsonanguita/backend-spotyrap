const Router = require('express')

const upLoad = require('./track.routes')

function routerApi(app) {
    const router = Router();

    app.use('/api/v1',router);
    
    router.use('/tracks',upLoad)
}

module.exports = routerApi;