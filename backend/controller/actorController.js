const { sendResponse } = require("../utils/sendResponse");
const { actorModel } = require("../models/actor");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const { isValidObjectId } = require("mongoose");

exports.createActor = async (req, res, next) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  try {
    const findRecordedActor= await actorModel.findOne({name});
    if(findRecordedActor){
        return sendResponse(res,409,{message:"Actor already recorded"});
    } 
    const actorData = new actorModel({ name, about, gender });
    if (!file) {
      return sendResponse(res, 400, { message: "Image not recieved" });
    }
    const { url, public_id } = await cloudinary.uploader.upload(file.path, {
      gravity: "face",
      height: 150,
      width: 150,
      crop: "thumb",
    });
    actorData.avatar = { url, public_id };
    const saveImage = await actorData.save();
    console.log("save image : ", saveImage);
    sendResponse(res, 201, {
      message: "Actor details uploaded successfully",
      id: actorData._id,
      name,
      about,
      gender,
      url,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateActor = async (req, res, next) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const { id } = req.params;
  try {
    console.log(req.body);
    if (!isValidObjectId(id)) {
      return sendResponse(res, 400, { message: "Invalid Object Id" });
    }
    const updatedActor = await actorModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedActor) {
      return sendResponse(res, 404, { message: "Actor not found" });
    }
    console.log("updated actor : ", updatedActor);
    const public_id = updatedActor.avatar?.public_id;
    if (public_id && file) {
      const { result } = await cloudinary.uploader.destroy(public_id);
      if (result != "ok") {
        sendResponse(res, 500, {
          message: "Could not delete image from cloud",
        });
      }
    }
    if (file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { gravity: "face", height: 150, width: 150, crop: "thumb" }
      );
      updatedActor.avatar = { url: secure_url, public_id };
      await updatedActor.save();
    }
    sendResponse(res, 200, {
      message: "Actor details updated sucessfully",
      updatedActor: {
        _id: updatedActor._id,
        name: updatedActor.name,
        about: updatedActor.about,
        gender: updatedActor.gender,
        avatar: updatedActor.avatar.url,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteActor = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      return sendResponse(res, 400, { message: "Invalid Object Id" });
    }
    const deletedActor = await actorModel.findOneAndDelete({ _id: id });
    if (!deletedActor) {
      return res.status(404).json({ error: "User not found" });
    }

    const public_id = deletedActor.avatar.public_id;
    if (public_id) {
      const { result } = await cloudinary.uploader.destroy(public_id);
      if (result != "ok") {
        return sendResponse(res, 500, {
          message: "Could not delete image from cloud",
        });
      }
    }
    // Check if the user was deleted
    if (deletedActor.deletedCount === 0) {
      return res.status(500).json({ error: "Could not delete user" });
    }

    sendResponse(res, 200, {
      message: "Actor deleted sucessfully",
      deletedActor,
    });
  } catch (error) {
    next(error);
  }
};
exports.searchActor=async(req,res,next)=>{
    const {query}=req;
    try{
        const searchResult= await actorModel.find( { $text: { $search:`${query.name}` } } )
        console.log(searchResult)
        if(searchResult.length===0){
            return sendResponse(res,404,{message:"Actor not found"});
        }
        return sendResponse(res,200,{message:"Actor found",searchResult});
    }
    catch(error){
        next(error);
    }
}
exports.getLatestActor=async(req,res,next)=>{
    try{
        const result=await actorModel.find().sort({createdAt:'-1'}).limit(12); // -1 for desc order and 1 for asc order
        console.log(result);
        if(result.length===0){
            return sendResponse(res,404,{message:"Actor's data empty"});
        }
        return sendResponse(res,200,{message:"list of lastest actor",result});
    }
    catch(error){
        next(error)
    }
}
exports.getSingleActor=async(req,res,next)=>{
    const {id}=req.params
    try{
        const getSingleActorResult=await actorModel.findById(id);
        if (getSingleActorResult.length===0){
            return sendResponse(res,404,{message:"Searched actor not found"});
        }
        return sendResponse(res,200,{message:"Actor found",result:getSingleActorResult})
    }
    catch(error){
        next(error)
    }
}
// http://res.cloudinary.com/dpotgseqk/image/upload/v1681025823/gycqygmyxpym8ith4c2v.jpg
