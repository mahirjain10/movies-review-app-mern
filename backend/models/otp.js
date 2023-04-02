const {model,models,Schema} = require('mongoose');
const bycrpt = require('bcryptjs')
const otpSchema= new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:3600,// this document will expires in 3600s = 1hr
        default:Date.now()
    }
})

otpSchema.pre('save',async function(next){
    if(this.isModified('otp')){
        console.log(this.otp);
       this.otp= await bycrpt.hash(this.otp,10);
        next();
    }
})

const otpModel=models.otp|| model('otps',otpSchema);

module.exports={
    otpModel
}