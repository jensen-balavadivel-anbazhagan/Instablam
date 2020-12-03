const express = require("express");
const FileSync = require("lowdb/adapters/FileSync");
const router = express.Router();
const db = require('../db');
const fs = require('fs');

// Where we will keep images
let images = db.getDbData("photos");


exports.getImages = async (req, res) => {
  console.log(`Get all photos`);
  var finalArray = [];
  if(images === null && images === '') {
    
    return res.status(404).json({
          status: "failure",
          message: "There is no photo available"
        });
  } 
  for (let image of images) {
    //  var convertedImage = JSON.parse(JSON.stringify(image));
        // convertedImage.imageSrc = "data:image/jpeg;base64,"+ this.getImage(image.id);
        var imageSrc = getImage(image.id);
        var temp = {
         id: image.id,
         filename: image.filename,
         location: image.location,
         timeTaken: image.timeTaken,
         imageSrc: imageSrc
        };
        finalArray.push(temp);
       
   }
   res.status(200).json({
          status: "success",
          data : finalArray,
          message: "All photos are fetched"
        });
};

function getImage (id){ 
  console.log(`Get the image src`);
  let filePath = ("../src/assets/images/"+id);
  let pngJSON="noFile";
  try {
  let fileData = fs.readFileSync(filePath);
  pngJSON = "data:image/jpeg;base64,"+  new Buffer(fileData).toString('base64');
} catch {
  console.log("no image found");
}
  return pngJSON;
  
};

exports.addImage = async (request, response) => {
  console.log(`Add photo`);
  let body = request.body;
  await db.addData("photos",body);
  var addedPhoto = db.getData("photos",body.id);
     if (addedPhoto != 'undefined' && addedPhoto != null && addedPhoto != '') {
      response.status(200).json({
        status: "success",
        data : addedPhoto,
        message: "Photo added successfully"
      });
      
        //Check to see if the added photo is now available if not present then return failure
      } else {
        console.log("Photo is not created");
      }
};

exports.deleteImage = async (request, response) => {
  console.log(`Delete photo`);
  let body = request.body;
  await db.removeBean("photos",body);
  const path = "../src/assets/images/"+body.id;
  var removedPhoto = db.getData("photos",body.id);
     if (removedPhoto == 'undefined'|| removedPhoto == null ||  removedPhoto == '') {
       fs.unlink(path, function(err) {
         console.log(err);
       });
      response.status(200).json({
        status: "success",
        data : removedPhoto,
        message: "Photo removed successfully"
      });
      
        //Check to see if the removed photo is now available if present then return failure
      } else {
        console.log("Photo is not removed");
      }
};

