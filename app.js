const express = require("express"),
    port = process.env.PORT || 3001,
    mongoose = require("mongoose"),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    router = express(),
    middleware = require("./middleware"),
    fs = require("fs"),
    https = require("https");
    privateKey = fs.readFileSync("./ssl/server.key"),
    certificate = fs.readFileSync("./ssl/server.cert"),
    emailSender = require("./send-email"),
    credentials = { key: privateKey, cert: certificate };

// mongoose.connect("mongodb://localhost:27017/nazdeeq", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connect("mongodb+srv://admin:admin@nazdeeq-e00tr.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true });

router.use(bodyParser.json({ extended: true }));

router.use(cors());

//import all routes
const authRoute = require("./routes/auth.route");
const socialRoute = require("./routes/social.route");
const dispatcherRoute = require("./routes/dispatcher.route");
const driverRoute = require("./routes/driver.route");
const nazdeeqRoute = require("./routes/nazdeeq.route");
const serviceTypeRoute = require("./routes/serviceType.route");
const transactionRoute = require("./routes/transaction.route");
const tripsRoute = require("./routes/trips.route");
const userRoute = require("./routes/user.route");
const vehicleRoute = require("./routes/vehicle.route");
const rateAndReviewRoute = require("./routes/rateAndReview.route");



// Get all Routes (localhost:3001/api/admin/teacher)
router.use('/api', authRoute);
router.use('/api', socialRoute);
router.use("/api", dispatcherRoute, middleware.checkToken);
router.use("/api", driverRoute, middleware.checkToken);
router.use("/api", nazdeeqRoute, middleware.checkToken);
router.use("/api", serviceTypeRoute, middleware.checkToken);
router.use("/api", transactionRoute, middleware.checkToken);
router.use("/api", tripsRoute, middleware.checkToken);
router.use("/api", userRoute);
router.use("/api", vehicleRoute, middleware.checkToken);
router.use("/api", rateAndReviewRoute, middleware.checkToken);
// router.use('/api', batchRoute, middleware.checkToken);


router.get("*", (req, res) => {
    res.send("Error 404 not found! ");
});

var httpsServer = https.createServer(credentials, router);



httpsServer.listen(port, () => {
    console.log("Running...");
});