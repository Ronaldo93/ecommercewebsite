/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

// function checkPassword(req, res, next) {
//     const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
//     console.log(req.body.userinfo.password);
//     if (re.test(req.body.userinfo.password) === true) {
//         next();
//     } else {
//         res.status(400).json({message: `Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number,
//         1 special character, and must be between 8 and 20 characters long.`});
//     }
// }

const { check, validationResult } = require("express-validator");
function checkPassword(req, res, next) {
  check("password", "test").matches(passwordregex);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const passwordregex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

module.exports = checkPassword;
