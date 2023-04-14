const express = require('express');
const { createActor, updateActor, deleteActor, searchActor, getLatestActor,getSingleActor } = require('../controller/actorController');
const { actorInfoValidator, validatorResult } = require('../middleware/validator');
const { uploadImage } = require('../middleware/multer')
const router = express.Router();


router.post("/create-actor",uploadImage.single("avatar"),actorInfoValidator,validatorResult,createActor);
router.patch("/update-actor/:id",uploadImage.single("avatar"),actorInfoValidator,validatorResult,updateActor);
router.delete("/delete-actor/:id",deleteActor);
router.get('/search-actor',searchActor);
router.get('/latest-actor',getLatestActor);
router.get('/get-single-actor/:id',getSingleActor);
module.exports=router