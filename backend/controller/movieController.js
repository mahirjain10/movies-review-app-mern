const cloudinary=require('../config/cloudinary');
const { movieModel } = require('../models/movie.js');
const { sendResponse } = require('../utils/sendResponse');
const { isValidObjectId } = require("mongoose");

exports.uploadTrailer = async (req, res,next) => {
    console.log(req.file)
    try{
        if (!req.file) return sendResponse(res, "Video file is missing!");
      
        const { secure_url: url, public_id } = await cloudinary.uploader.upload(
          req.file.path,
          {
            resource_type: "video",
          }
        );
        res.status(201).json({ url, public_id });
    }
    catch(error){
      console.log(error)
        next(error)
    }
  };
  
exports.uploadNewMovie=async(req,res,next)=>{
  const { file, body } = req;

  const {
    title,
    storyLine,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = body;

  const newMovie = new movieModel({
    title,
    storyLine,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  });

  if (director) {
    if (!isValidObjectId(director))
      return sendResponse(res,400, "Invalid director id!");
    newMovie.director = director;
  }

  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendResponse(res, 400,"Invalid writer id!");
    }

    newMovie.writers = writers;
  }


  await newMovie.save();

  res.status(201).json({
    id: newMovie._id,
    title,
  });
}

