const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath); // Store uploaded files in backend/uploads
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname) || ".png";
        const filename = path.parse(file.originalname).name;
        cb(null, `${filename}-${uniqueSuffix}${extension}`);
    },
});


exports.upload = multer({ storage: storage });