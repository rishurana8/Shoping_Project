const check = require('express-validator');

const checkfunction = check.check;

const {validationResult} = checkfunction;

exports.getPosts = (req,res,next) =>{
    res.status(200).json(
        {
            posts: [
                {
                    _id: '1',
                    title: 'First Post' , 
                    content: 'This is the first Post!',
                    imageUrl: 'images',
                    creator: {
                        name:'rishu'
                    },
                    createdAt: new Date()
                }
            ]
        }
    );

}

exports.createPost = (req,res,next) =>{
    const errors = validationResult(req); // it will autmatically extract all the erros that validation has 
    if(!errors.isEmpty()){
         return res.status(422).json({
            message: 'Validation failed data entered is incorrect',
            errors: errors.array()
         })
    }
    
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Post created Successfully',
        post: {id: new Date().toISOString() , title: title , content:content}
    });
}