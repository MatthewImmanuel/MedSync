const multer = require('multer');
const cloudinary = require('./cloudinary');
const storage = multer.memoryStorage();
const upload = multer({ storage });
module.exports = upload;
