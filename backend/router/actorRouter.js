const express = require('express');
const { createActor, updateActor, deleteActor, searchActor, getLatestActor,getSingleActor } = require('../controller/actorController');
const { actorInfoValidator, validatorResult } = require('../middleware/validator');
const { uploadImage } = require('../middleware/multer')
const {verifyJwtToken}=require('../middleware/verifyJwtToken')
const {isAdmin}=require('../middleware/isAdmin')
const router = express.Router();


router.post("/create-actor",verifyJwtToken,isAdmin,uploadImage.single("avatar"),actorInfoValidator,validatorResult,createActor);
router.patch("/update-actor/:id",verifyJwtToken,isAdmin,uploadImage.single("avatar"),actorInfoValidator,validatorResult,updateActor);
router.delete("/delete-actor/:id",verifyJwtToken,isAdmin,deleteActor);
router.get('/search-actor',verifyJwtToken,isAdmin,searchActor);
router.get('/latest-actor',verifyJwtToken,isAdmin,getLatestActor);
router.get('/get-single-actor/:id',verifyJwtToken,isAdmin,getSingleActor);
module.exports=router