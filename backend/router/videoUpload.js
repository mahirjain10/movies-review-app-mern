// const express = require('express');
// const multer = require('multer');
// const cloudinary=require('../config/cloudinary')
// const router = express.Router();

// // Set up multer storage
// const storage = multer.diskStorage({});
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB
//   },
//   fileFilter:(req, file, cb) => {
//     if (!file.mimetype.startsWith("video")) {
//       cb("Supports only video files!", false);
//     }
  
//     cb(null, true);
  
//   }
// });

// router.post('/upload-new-trailer', upload.single('video'), async (req, res, next) => {
//     try {
//       // Check if file exists
//       if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//       }
//       console.log("req file : ",req.file)
//       // Upload the video to Cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         resource_type: 'video',
//       });
  
//       // The video upload was successful
//       res.json(result);
//     } catch (error) {
//       next(error); // Pass any error to the error handler middleware
//     }
//   });
// module.exports = router;
