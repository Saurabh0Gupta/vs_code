const { constants } = require('buffer');
const { Route } = require('express');
var express = require('express');
var router = express.Router();
const fs=require('fs');

const jwt=require('jsonwebtoken')
router.use(express.json())

const posts=[
  {
    username:'vikash',
    title:'post1',
  },
  {
    username:'saurabh',
    title:'past 2'
  }
]

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
  });
});

router.get('/fileopened/:filename',function(req,res){
  fs.readdir(`./${folder}`,{withFileTypes:true},function(err,files){
    // res.render('index',{files});
    // console.log(files[0].isDirectory())
    res.render("fileopened",{files:files , folder:folder,filename:req.params.filename})
  })
})

// -----jwt token-----
router.get('/post',(req,res)=>{
  res.json(posts)
})
router.post('/login',(req,res)=>{
  const username=req.body.username
  const user={name:username}
  jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
})
const app = express();

// Secret key for signing JWTs (keep it secret!)
const secretKey = 'your-secret-key';

app.post('/login', (req, res) => {
  // Authentication logic (validate user credentials)

  // If authentication is successful, create a JWT
  const payload = { user_id: 123, username: 'john.doe' };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  // Send the JWT to the client
  res.json({ token });
});

// Middleware to verify JWT on protected routes
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    // Attach user information to the request for further processing
    req.user = decoded;
    next();
  });
};

app.get('/protected-route', verifyToken, (req, res) => {
  // Access granted, user information available in req.user
  res.json({ message: 'Protected route accessed', user: req.user });
});
router.get('/login-page',(req,res)=>{
  res.render('login');
})
module.exports = router;
