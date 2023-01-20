const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploud/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const uploadFile = multer({ storage: storage });

module.exports = uploadFile
