const {Schema,model} = require('mongoose');

const actorSchema=Schema({
    name:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        trim:true,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:Object,
        url:String,
        public_id:String
    },
},{timestamps:true})


actorSchema.index({name:"text"})
const actorModel= model('actors',actorSchema);

module.exports={
    actorModel
}

