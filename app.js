const express = require('express');
const mongoose = require('mongoose');
const feedRoutes = require('./routes/feed');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname,'images')));

app.use((error,req,res,next) =>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status);
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