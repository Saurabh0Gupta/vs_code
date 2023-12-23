var express = require('express');
var router = express.Router();
var fs = require('fs');

const folder="files"

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir(`./${folder}`,{withFileTypes:true},function(err,files){
  res.render('index',{folder,files});
  })
});
router.get('/createfile', function(req, res, next) {
  fs.writeFile(`./${folder}/${req.query.filename}`,"",function(err){
    res.redirect("/")
  })
});
router.get('/createfolder', function(req, res, next) {
  fs.mkdir(`./${folder}/${req.query.foldername}`,function(err){
    res.redirect("/")
  });
});

router.get('/delete/file/:filename', function(req, res, next) {
  fs.unlink(`./${folder}/${req.params.filename}`,(err)=>{
    res.redirect("/");
  })
});

router.get('/delete/folder/:filename', function(req, res, next) {
  fs.rmdir(`./${folder}/${req.params.filename}`,(err)=>{
    res.redirect("/");
  })
});

router.get('/fileopened/:filename',function(req,res){
  fs.readdir(`./${folder}`,{withFileTypes:true},function(err,files){
    fs.readFile(`./${folder}/${req.params.filename}`, 'utf8', (err, data) => {
      res.render('fileopened',{files:files , folder:folder,filename:req.params.filename,fileData:data});
    });
  })
})
router.get('/folderopened/:foldername', function(req, res, next) {
  res.render('folderopened',{foldername:req.params.foldername})
});
router.post('/save/:filename',function(req,res){
  fs.writeFile(`./${folder}/${req.params.filename}`,req.body.textarea,function(err){
    res.redirect('back');
  })
})
router.get('/rename/:filename', function (req, res) {
  fs.rename(`./${folder}/${req.params.filename}`, `./${folder}/${req.query.rename}`, function(err){
    res.redirect("/");
  })
});
module.exports = router;
