const express = require("express"),
    port = process.env.PORT || 3001,
    mongoose = require("mongoose"),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    router = express(),
    middleware = require("./middleware");

// mongoose.connect("mongodb://localhost:27017/nazdeeq", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connect("mongodb+srv://admin:admin@nazdeeq-e00tr.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true });

router.use(bodyParser.json({ extended: true }));

router.use(cors());

//import all routes
const authRoute = require("./routes/auth.route");
const dispatcherRoute = require("./routes/dispatcher.route");
const driverRoute = require("./routes/driver.route");
const nazdeeqRoute = require("./routes/nazdeeq.route");
const serviceTypeRoute = require("./routes/serviceType.route");
const transactionRoute = require("./routes/transaction.route");
const tripsRoute = require("./routes/trips.route");
const userRoute = require("./routes/user.route");
const vehicleRoute = require("./routes/vehicle.route");

// Get all Routes (localhost:3001/api/admin/teacher)
router.use('/api', authRoute);
router.use("/api", dispatcherRoute, middleware.checkToken);
router.use("/api", driverRoute, middleware.checkToken);
router.use("/api", nazdeeqRoute, middleware.checkToken);
router.use("/api", serviceTypeRoute, middleware.checkToken);
router.use("/api", transactionRoute, middleware.checkToken);
router.use("/api", tripsRoute, middleware.checkToken);
router.use("/api", userRoute, middleware.checkToken);
router.use("/api", vehicleRoute, middleware.checkToken);
// router.use('/api', batchRoute, middleware.checkToken);

router.get("*", (req, res) => {
    res.send("Error 404 not found! ");
});


router.listen(port, () => {
    console.log("Running...");
});