const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder
  },
  filename: function (req, file, cb) {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage: storage });
