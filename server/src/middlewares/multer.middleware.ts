import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      callback(null, true);
    } else {
      //TODO: raise error if file type mismatch
      callback(null, false);
    }
  },
});


export default upload;
