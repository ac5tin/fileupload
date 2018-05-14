
var multer = require('multer');
var multerS3 = require('multer-s3');
var fs = require('fs');
var AWS = require('aws-sdk');
var ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId();

// load model
const files = require('../db/models').files;


// aws s3 setup
AWS.config.loadFromPath('./s3_config.json');
const defBucketName = "file-upload-api";
let s3 = new AWS.S3({params:{Bucket: defBucketName}});



// s3 bucket 
// - create bucket (unique bucket name)
//  - require bucketName via post
module.exports = {
    // - retrieves obj from s3
    getObjects(req,res){
        // first check if there exists a file with this id
        return files.findById(req.params.keyname)
            .then(file =>{
                if(!file){
                    // no file exists with this id
                    return res.status(404).send('File Not Found')
                }
                // there is a file with this id
                //check if file is expired
                if(!file.complete){
                    // not expired
                    // update complete from false to true
                    return file.update({
                        complete: true, // set this to false when debugging
                    }).then(()=>{
                        // fetch file from s3
                        const params = {Bucket: defBucketName,Key: req.params.keyname};
                        s3.getObject(params,(err,data)=>{
                            if(err){
                                return res.status(400).send(err);
                            }
                            // return the file
                            res.attachment(file.fileName);
                            res.status(200).send(data.Body);
                            // delete file from bucket
                            s3.deleteObject(params,(err,data)=>{});
                        });
                    })
                        .catch(err => res.status(400).send(err));

                }
                else{
                    // return expired
                    res.status(410).send('Expired');
                }
            }).catch(err => res.status(400).send(err));
    },

    // - delete an obj
    deleteObject(req,res){
        var item = req.body;
        var params = {Bucket: item.bucketName,Key: item.key};
        s3.deleteObject(params,(err,data)=>{
            if(err){
                return res.send({"error":err});
            }
            res.send({data});
        });
    },


    // - cloud uploader using multer-s3
    //  - pass bucket name to bucketName param to upload file to bucket
    async uploadFile(req,res){
        //let item = req.body;
        let keyName = uid.randomUUID(8);
        // check if there's already a file with this ID
        while(await retrieve(keyName)){
            keyName = uid.randomUUID(8);
        }

        try{
            const origName = req.files[0].originalname;
            fs.readFile(req.files[0].path,(err,data)=>{
                if(err)throw err;
                const params = {
                    Key: keyName,
                    Body: data
                };
                s3.upload(params,(err,data)=>{
                    fs.unlink(req.files[0].path,(err)=>{
                        if(err)return res.status(400).send('error');
                    });
                    return err ? 
                        res.status(400).send('error') :
                        files.create({
                            id: keyName,
                            fileName: origName
                        }).then(file => res.status(201).send(req.headers.host+req.originalUrl+'/'+keyName))
                            .catch(err => res.status(400).send('error'));

                });
            }); // end of fs.readfile
        }catch(err){return res.status(400).send('error')}

    },

    // - (TESTING) upload file
    async testUpload(req,res){
        //const origName = req.file.originalname;
        let keyName = uid.randomUUID(8);
        try{
            fs.unlink(req.files[0].path,(err)=>{
                if(err){
                    return res.status(400).send('error');
                }
            });
        }catch(err){return res.status(400).send('error')}
        return res.status(201).send(req.headers.host+req.originalUrl+'/'+keyName)
        //return res.status(201).send(req.files[0]);

    },
    async testFindFile(req,res){
        //res.status(200).send({"body":req.params.keyname});
        const found = await retrieve(req.params.keyname);
        res.status(200).send({"found":found});
    },
    testGetFile(req,res){
        // first check if there exists a file with this id
        return files.findById(req.params.keyname)
            .then(file =>{
                if(!file){
                    // no file exists with this id
                    return res.status(404).send('File Not Found')
                }
                // there is a file with this id
                //check if file is expired
                if(!file.complete){
                    // not expired
                    // update complete from false to true
                    return file.update({
                        complete: false, // set this to false when debugging
                    }).then(()=>{
                        // fetch file from s3
                        const params = {Bucket: defBucketName,Key: req.params.keyname};
                        s3.getObject(params,(err,data)=>{
                            if(err){
                                return res.status(400).send(err);
                            }
                            // return the file
                            res.attachment(file.fileName);
                            res.status(200).send(data.Body);
                        });
                    })
                        .catch(err => res.status(400).send(err));

                }
                else{
                    // return expired
                    res.status(410).send('Expired');
                }
            }).catch(err => res.status(400).send(err));
    },
    testAWSupload(req,res){
        fs.readFile(req.files[0].path,(err,data)=>{
            if(err)throw err;
            const params = {
                Key: req.files[0].originalname,
                Body: data
            };
            s3.upload(params,(err,data)=>{
                fs.unlink(req.files[0].path,(err)=>{
                    if(err)console.log(err);
                });
                return err ? res.status(400).send(err) : res.status(201).send('success');
            });
        });
    },
    testMulter : multer(),
    //localMulter: multer({dest:'uploads/',limits:{fileSize: 10000000}}) //debug (10mb)
    localMulter: multer({dest:'uploads/',limits:{fileSize: 500000000}})
}



// find by ID and returns fileName or false
const retrieve  = async(fileID)=>{
    const data = await(files.findById(fileID));
    return data ? data.fileName : false;
    //console.log(data);
    //return false;
}

