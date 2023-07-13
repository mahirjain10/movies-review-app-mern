const {Schema,model} = require('mongoose');
const bycrpt= require('bcryptjs')

const userSchema=Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false
    },
    role:{
        type:String,
        default:'user',
        enum:['admin','user'],
        required:true
    }
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bycrpt.hash(this.password,10)
    }
    next();
})

const userModel = model('users',userSchema);

module.exports ={
    userModel
}