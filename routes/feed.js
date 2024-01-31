const express = require('express');
const check = require('express-validator');

const checkfunction = check.check;

const {body} = checkfunction;


const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);

router.post('/post' , [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5})
] ,  feedController.createPost);

module.exports = router;