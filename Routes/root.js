const express = require("express");
const router = express.Router();
const path = require("path");


// here ^ means begins with / and $ means ends with / , | represents or operator
//   index(.html)? here this ()? is for optional text , without this text also we will be able to get the response 
router.get("^/$|/index(.html)?", (req, res) => {
    console.log("Get method is getting executed");
    // res.send("Hari krishnan created the express js get method functionality ");
    // res.sendFile("./views/index.html", { root: __dirname }); 
    // another way to send the file to the get request 
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// router.get("/new-page(.asdf)?", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
// });

// router.get("/old-page(.asdf)?", (req, res) => {
//     res.redirect(301, "/new-page");
//     // if we want we can set the status code
//     // here we are trying to redirect to another request and by default the status code will be 304
// });

module.exports = router;