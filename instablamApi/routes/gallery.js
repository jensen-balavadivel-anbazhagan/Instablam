const { Router, response } = require("express");
const router = new Router();
const galleryController = require("../controllers/galleryController");
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/assets/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) ;
  }
})
var upload = multer({ storage: storage })

router
  .route("/")
  .get(galleryController.getImages);
  
  router
  .route("/add").post(galleryController.addImage);

  router
  .route("/delete").post(galleryController.deleteImage);

  router.post('/upload', upload.single('imageFile'), (request, response) =>{
    const date = new Date();
    const newName = date.toDateString()+ date.getHours()+"_"+date.getMinutes() + "_"+date.getSeconds() + ".png";
    fs.renameSync(request.file.path, request.file.path.replace(request.file.originalname, newName));
    response.json({fileName: newName});
  }
  )


module.exports = router;
