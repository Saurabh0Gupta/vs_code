var express = require('express');
var router = express.Router();
const fs=require('fs');

/* GET home page. */
const folder="files"
router.get('/', function(req, res, next) {
  fs.readdir(`./${folder}`,{withFileTypes:true},function(err,files){
    // res.render('index',{files});
    // console.log(files[0].isDirectory())
    res.render("index",{files:files , folder:folder})
  })
});
router.get('/createfile', function(req, res, next) {
  fs.writeFile(`./${folder}/${req.query.file}`,"",function(err){
    // res.render('index',{files});
    // console.log(files[0].isDirectory())
    res.redirect("/")
  })
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
router.get('/createfolder', function(req, res, next) {
  fs.mkdir(`./${folder}/${req.query.folder}`,function(err){
    // res.render('index',{files});
    // console.log(files[0].isDirectory())
    res.redirect("/")
  })
});
module.exports = router;
