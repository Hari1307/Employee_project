require("dotenv").config(); // for accessing the .env file values (need to delare in the root file of the nodejs application , no need to specify this line in every file that we are using this property)

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorEvents");
const corsOption = require("./config/corsConfig");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");

const PORT = process.env.PORT || 3000;

// connect db 
connectDB();

// custom middleware 
app.use(logger);

app.use(cors(corsOption));

// built in middleware 
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

// app.use("/subdir", express.static(path.join(__dirname, "/public")));

// Routes :

// here which ever request is coming for the subdir will be redirected to hte subdir js file and from there the routes or end points will be accessed 
// app.use("/subdir", router);

// we can directly give the require in the app.use
app.use("/", require("./Routes/root"));

app.use('/register', require('./Routes/register'));
app.use("/auth", require("./Routes/auth"));
app.use("/refresh", require("./Routes/refresh"));
app.use("/logout", require("./Routes/logout"));
app.use(verifyJWT);

app.use("/employees", require("./Routes/api/employees"));

app.use("/users", require("./Routes/api/users"));

// Route handlers :
app.get("/asdf", (req, res, next) => {
    console.log("router handler is triggered");
    next();
}, (req, res) => {
    res.send("Route handler is printed");
});


app.get("/*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);


mongoose.connection.once("open", () => {
    console.log("mongodb connection is established")

    app.listen(PORT, () => {
        console.log("server is started at port " + PORT);
    });
});
// we have placed the express listen inside the mongoose connection so the express will start listening
// only when the connection is established in the mongodb




// // there is another way to use the route handler using the array methadology

// const one = (req, res, next) => {
//     console.log("one is triggered");
//     next();
// };
// const two = (req, res, next) => {
//     console.log("two is triggered");
//     next();
// };
// const three = (req, res) => {
//     console.log("three is triggered");
//     res.send("third chain is printed");
// };


// app.get("/chain", [one, two, three]);
