const mongoose=require('mongoose');
const loginSchema=new mongoose.Schema({
       email:{
           type:String,
           required:true,
           unique:true
       },
      password:{
          type:String,
          required:true
      }
},{
    timestamps:true
});
const Login=mongoose.model('Login',LoginSchema);
module.exports=Login; 