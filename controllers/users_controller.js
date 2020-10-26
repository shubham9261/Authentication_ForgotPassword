const User = require('../models/user');
const forgotdb=require('../models/forgot_password');
//const fs=require('fs');
const path=require('path');
// let's keep it same as before
module.exports.profile = function(req, res){
   
        return res.render('users_profile', {
            title: 'User Profile',
            
        });
}
// module.exports.update = async function(req, res){
//     // if(req.user.id == req.params.id){
//         console.log("in update");
//     //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//     //         return res.redirect('back');
//     //     });
//     // }else{
//     //     return res.status(401).send('Unauthorized');
//     // }
//     // console.log('------------------------');
//     // console.log(req.user.id);
//     // console.log('-----------------');
//     // console.log(req.params.id);
//     if(req.user.id == req.params.id){
//         try{
//             let user=await User.findById(req.params.id);
//             User.uploadedAvatar(req,res,function(err){
//                 console.log("in uploading avatar");
//                 if(err)
//                 console.log('Multer ******** Error*******');
//                 //console.log(req.file);
//                 user.email=req.body.email;
//                 user.name=req.body.name;
//                 if(req.file){
//                     if(user.avatar){
//                         fs.unlinkSync(path.join(__dirname,'..',user.avatar));
//                     }
//                     user.avatar=User.avatarPath + '/' +req.file.filename;
//                     user.save();
//                     return res.redirect('back');
//                 }
//             });
//         }
//         catch(err){
//             req.flash('error', err);
//             return res.redirect('back');
//         }
//     }
//     else{
//         req.flash('error', 'Unauthorized');
//             return res.status(401).send('Unauthorized');
//         }
// }


// render the sign up page
module.exports.signUp = function(req, res){
    // if (req.isAuthenticated()){
    //     return res.redirect('/users/profile');
    // }


    return res.render('users_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    console.log("In Sign in Profile ");
    if (req.isAuthenticated()){
        console.log("In Sign in Profile1111111111");
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); 
                return res.redirect('/users/sign-up');
            }

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}
// sign in and create a session for the user
module.exports.createSession = function(req, res){
    //req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
   // req.flash('success', 'You have logged out!');


    return res.redirect('/');
} 
module.exports.create_password=function(req,res){
    let val;//put the session id from cookies to val
    forgotdb.findByIdAndUpdate({val},{password:req.body.password}, function(err, result){

        if(err){
            return res.redirect('/');
        }
        else{
           return res.redirect('/');
        }
    })
}
module.exports.forget_password=function(req,res){
    return res.render('forgot_password', {
        title: 'Forgot Password'
    });
}
module.exports.forget_password_next=function(req,res){
    console.log(req.body);
    //cookies.set('testtoken', {expires: Date.now()});
    //console.log('----------------------',req.cookies['email']);
    //console.log(req.)
    res.cookie('email',req.body.email);
    //console.log('----------------------',req.cookies['email']);
    return res.render('confirm_password', {
        title: 'Forgot Password'
    });
}
module.exports.insertPassword=async function(req,res){
    console.log("In Insert Password");
    console.log(req.body);
    let email=req.cookies['email'];
    try{
       
           if(req.body.password != req.body.confirm_password)
           {
                // Use noty to pop-up Password and Confirm Password does not match
           }
           else{
               let user= await User.findOne({email:email});
               console.log(user);
               user.password=req.body.password
                user.save();
                console.log(user);
                }
    }
    catch(err)
    {

    }
    //console.log('----------------------',req.cookies['email']);
    //cookies.set('testtoken', {expires: Date.now()});
   
    //console.log(req.)
   // res.cookie('email',req.body.email);
    //console.log('----------------------',req.cookies['email']);
    return res.redirect('/users/sign-in');
}