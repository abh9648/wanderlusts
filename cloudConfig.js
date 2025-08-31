const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("@fluidjs/multer-cloudinary");
const multer = require("multer");
require('dotenv').config();

cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    }
);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    alloedFormats:["png","jpg","jprg","webp"],
    
  },
});

module.exports = {
    cloudinary,
    storage
};