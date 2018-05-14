let awsController = require('../controllers').aws;
let express = require('express');
let router = express.Router();


// testing only
//router.put('/',awsController.localMulter.any(),awsController.testUpload);

//router.get('/:keyname',awsController.testGetFile);


// download file
router.get('/:keyname',awsController.getObjects);


// upload file
router.put('/',awsController.localMulter.any(),awsController.uploadFile);


// greet welcome
router.get('/',(req,res)=>{
    res.status(200).send({message:"Welcome to file",url:req.headers.host+req.originalUrl});
});





module.exports = router;
