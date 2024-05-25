const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let fileDestination = "public/uploads/";
    //check if directory exists
    if (!fs.existsSync(fileDestination)) {
      fs.mkdir(fileDestination, { recursive: true }, (err) => {
        if (err) {
          // Handle error if directory creation fails
          console.error(`Error creating directory ${fileDestination}:`, err);
          cb(err, null);
        } else {
          // Directory created successfully, invoke the callback
          cb(null, fileDestination);
        }
      });
    } else {
      cb(null, fileDestination);
    }
  },
  filename: function (req, file, cb) {
    let filename = path.basename(
      file.originalname,
      path.extname(file.originalname)
    ); //give file name only not extension not root folder
    let ext = path.extname(file.originalname); //give only extension
    cb(null, filename + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
