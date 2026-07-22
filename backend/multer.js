const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("../my-react-app/public/uploads")) // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split(".")[0]
        cb(null, filename + '-' + uniqueSufix + ".png") // Specify the filename for uploaded files
    },
});


exports.upload = multer({ storage: storage });