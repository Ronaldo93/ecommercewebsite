/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

const multer = require("multer");

function imageHandler(req, res, next) {
  console.log(req.body.image);
  console.log("called");

  const uploadStorage = multer.memoryStorage();
  const uploader = multer({ storage: uploadStorage });
  const uploadFile = uploader.single("image");

  uploadFile(req, res, function (err) {
    console.log("Finished file upload");
    console.log(req.file);
    if (err) {
      console.log("Error uploading file: " + err);
      req.uploadError = err;
      return next();
    }
    if (req.file) {
      req.body.imageBase64 = req.file.buffer.toString("base64");
      req.body.imageMimetype = req.file.mimetype;
      console.log("good");
      return next();
    }
    console.log("no file found! skipping...");
    next();
  });
}

module.exports = imageHandler;
