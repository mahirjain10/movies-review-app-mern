const express = require('express');
const { isAdmin } = require('../middleware/isAdmin');
const { uploadNewMovie, uploadTrailer ,dum} = require('../controller/movieController');
const { uploadVideo } = require('../middleware/multer');
const { createMovieValidator, validatorResult } = require('../middleware/validator');
const { validationResult } = require('express-validator');
const multer = require("multer");
const upload = multer();
const router= express.Router();


router.post('/upload-trailer',uploadVideo.single('trailer'),uploadTrailer);
// router.post('/upload-new-movie',upload.single(),uploadNewMovie);
router.post('/upload-new-movie',upload.single(),createMovieValidator,validatorResult,uploadNewMovie);


module.exports=router