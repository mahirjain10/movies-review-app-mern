const { check, validationResult } = require("express-validator");

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
exports.passwordValidator=[
  check("newPassword")
    .trim()
    .notEmpty()
    .withMessage("Please enter password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length should be of min 8 and max 20 charachter")
]
exports.signInValidator=[
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
exports.passwordValidator=[
check("newPassword")
  .trim()
  .notEmpty()
  .withMessage("Please enter password")
  .isLength({ min: 8, max: 20 })
  .withMessage("Password length should be of min 8 and max 20 charachter")  
]
exports.validatorResult = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length>=1) {
    console.log(error);
    return res.status(400).json({ error:error });
  }
  next();
};
