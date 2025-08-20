const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

// server side validation for listings

// Index Route & Create route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single("listing[image][url]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );
    // .post(upload.single('listing[image][url]'),(req,res) =>{
    //     res.send(req.file);
    // });
// New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

// Show , Update & Delete route
router
    .route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put( 
        isLoggedIn,
        isOwner,
        upload.single("listing[image][url]"),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing));

// Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;