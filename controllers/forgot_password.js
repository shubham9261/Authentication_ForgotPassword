const forgotPassword=require('../mailers/forgot_password.js');
const forgotdb=require('../models/forgot_password');
const crypto = require('crypto');
module.exports.home = async function(req, res){

    try{
        return res.render('forgot_password', {
            title: "Forgot Password"
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}
module.exports.create=async function(req,res){
    try{
        let access=await forgotdb.create({
            email: req.body.email,
            token: crypto.randomBytes(20).toString('hex'),
            isvalid:"true"
        });
        access.save();
    }
    catch(err)
    {
        console.log('Error', err);
        return;
    }
}
module.exports.createtoken=async function(req,res){

}
module.exports.authenticateLink = async function(req, res){

    try{
        let token = await Post.findById(req.params.id);

        if (token && token.isvalid=="true"){
            token.isvalid="false";

            return res.redirect('/enter-new-password');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}