// const Post = require('../models/post');
// const User = require('../models/user');



module.exports.home = async function(req, res){

    try{
        return res.render('home', {
            title: "Authentication"
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}