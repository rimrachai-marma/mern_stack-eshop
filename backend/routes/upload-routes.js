const express = require('express');
const multer = require('multer');
const path = require('path');

const router = new express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      return callback(new Error('Please upload an image!'));
    }

    return callback(null, true);
  }
});

router.post(
  '/upload/image',
  upload.single('image'),
  (req, res) => {
    res.send(`/${req.file.path}`);
  },
  (error, req, res, next) => {
    res.status(400).send({ message: error.message });
  }
);

module.exports = router;
