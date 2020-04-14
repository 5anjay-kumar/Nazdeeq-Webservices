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
// const batchRoute = require("./routes/batch.route");
const authRoute = require("./routes/auth.route");
const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");
const driverRoute = require("./routes/driver.route");

// Get all Routes (localhost:3001/api/admin/teacher)
router.use('/api', authRoute);
router.use('/api', adminRoute);
router.use("/api", userRoute);
router.use("/api", driverRoute);
// router.use('/api', batchRoute, middleware.checkToken);

router.get("*", (req, res) => {
    res.send("Error 404 not found! ");
});


router.listen(port, () => {
    console.log("Running...");
});