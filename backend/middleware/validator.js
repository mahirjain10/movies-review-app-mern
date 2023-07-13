const { check, validationResult } = require("express-validator");
const genresArray = require("../utils/genres");
const { isValidObjectId } = require("mongoose");

exports.validator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Please enter name")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name should be greater than 3 and less than 20 charachter"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter email")
    .isEmail()
    .withMessage("Please enter valid email address"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length should be of min 8 and max 20 charachter"),
];
exports.passwordValidator = [
  check("newPassword")
    .trim()
    .notEmpty()
    .withMessage("Please enter password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length should be of min 8 and max 20 charachter"),
];
exports.signInValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter email")
    .isEmail()
    .withMessage("Please enter valid email address"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length should be of min 8 and max 20 charachter"),
];
exports.passwordValidator = [
  check("newPassword")
    .trim()
    .notEmpty()
    .withMessage("Please enter password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length should be of min 8 and max 20 charachter"),
];
exports.actorInfoValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Please enter name")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Please enter alphabet only")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name should be greater than 3 and less than 20 charachter"),
  check("about").trim().notEmpty().withMessage("about field is required"),
  check("gender").trim().notEmpty().withMessage("gender field is required"),
];

exports.createMovieValidator = [
  check("title").trim().notEmpty().withMessage("Title field is required"),
  check("storyLine")
    .trim()
    .notEmpty()
    .withMessage("Story Line field is required"),
  check("releaseDate").isDate().withMessage("Release date is missing"),
  check("status")
    .not()
    .isIn(["private", "public"])
    .withMessage("Status should be either private or public"),
  check("genres")
    .not()
    .isArray({ min: 1 })
    .withMessage("Genres should be array of string"),
    // .custom((value) => {
    //   // console.log("printing type of value : ",typeof JSON.parse(value))
    //   // const parsedArray = JSON.parse(value);
    //   for (let genre of parsedArray) {
    //     if (!genresArray.includes(genre)) {
    //       throw new Error("Invalid genres");
    //     }
    //   }

      // return true;
    // }),
  check("tags")
    .not()
    .isArray({ min: 1 })
    .withMessage("Tags must be an array of strings m !")
    .custom((value) => {
      const parsedTags = JSON.parse(value);
      for (let tag of parsedTags) {
        if (typeof tag !== "string") {
          throw new Error("Tags must be an array of strings !");
        }
      }
      return true;
    }),
  check("cast")
    .not()
    .isArray({ min: 1 })
    .withMessage("Cast must be an array of objects!")
    .custom((value) => {
      const parsedCast = JSON.parse(value);
      for (let cast of parsedCast) {
        // console.log("object or not : ",typeof cast)
        if (!isValidObjectId(cast.actor)) {
          throw new Error("actor should be a valid object id");
        }
        if (typeof cast.roleAs !== "string") {
          throw new Error("roleAs should be a string");
        }
        if (typeof cast.leadActor !== "boolean") {
          throw new Error("Lead actor should be boolean");
        }
      }
      return true;
    }),
  check("writers")
    .not()
    .isArray({ min: 1 })
    .withMessage("Writers field should be an array of object")
    .custom((value) => {
      const parsedWriters = JSON.parse(value);
      console.log("parsed writers : ", parsedWriters);
      for (let writer of parsedWriters) {
        if (!isValidObjectId(writer.actor)) {
          throw new Error("actor should be an objectId");
        }
        if (typeof writer.roleAs !== "string") {
          throw new Error("roleAs field should be a string");
        }
        return true;
      }
    }),
  check("reviews")
    .not()
    .isArray({ min: 1 })
    .withMessage("reviews field should be an array of object")
    .custom((value) => {
      const parsedReviews = JSON.parse(value);
      for (let review of parsedReviews) {
        if (!isValidObjectId(review)) {
          throw new Error("review should be an ObjectId");
        }
      }
      return true;
    }),
  check("language")
    .isString()
    .withMessage("language should be of type string")
    .notEmpty()
    .withMessage("language field should not be empty"),
  check("trailer")
    .not()
    .isObject()
    .withMessage("Trailer field should be object")
    .custom((trailer) => {
      trailer=JSON.parse(trailer);
      const {url,public_id}=trailer
      const parsedUrl = new URL(url);
      const protocol = parsedUrl.protocol;
      const splitUrl = url.split("/");
      const getArrayOfFinalUrl = splitUrl[splitUrl.length - 1].split(".");
      const getPublicId = getArrayOfFinalUrl[0];
      try {
        if (!url) {
          throw new Error("Url of uploaded trailer is missing");
        }
        console.log(protocol)
        if (protocol !== "https:") {
          throw new Error("Url protocol is not secure");
        }
        if (getPublicId !== public_id) {
          throw new Error("Trailer public_id is invalid");
        }
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }),
];
exports.validatorResult = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length >= 1) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
  next();
};
