const {model,Schema} = require('mongoose');
const bycrpt = require('bcryptjs')
const pwdResetSchema= new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:3600,// this document will expires in 3600s = 1hr
        default:Date.now()
    }
})

pwdResetSchema.pre('save',async function(next){
    if(this.isModified('token')){
        console.log(this.otp);
       this.token= await bycrpt.hash(this.token,10);
        next();
    }
})

const pwdResetModel= model('passwordResetToken',pwdResetSchema);

module.exports={
    pwdResetModel
}