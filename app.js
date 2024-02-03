const express = require('express');
const mongoose = require('mongoose');
const feedRoutes = require('./routes/feed');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();

const { v4: uuidv4 } = require('uuid');
 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4())
    }
});

const fileFilter = (req,res,cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

app.use(multer({storage: storage , fileFilter: fileFilter}).single('image'));

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname,'images')));

app.use((error,req,res,next) =>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message});
})

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Methods','GET , POST , PUT , PATCH , DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

mongoose.connect(
    'mongodb+srv://rishurana256:Rishu%401234@cluster0.p8xlfky.mongodb.net/messages'
)
.then(result =>{
    app.listen(8000);
})
.catch(err =>{
    console.log(err);
})
app.use('/feed',feedRoutes);

app.listen(8080);