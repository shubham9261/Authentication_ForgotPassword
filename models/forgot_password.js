const mongoose=require('mongoose');
const resetSchema=new mongoose.Schema({
       email:{
           type:String,
           required:true,
           unique:true
       },
      token:{
          type:String,
          required:true
      },
      isvalid:{
          type:String,
          required:true
      }
},{
    timestamps:true
});
const reset_password=mongoose.model('Reset_Password',resetSchema);
module.exports=reset_password; 