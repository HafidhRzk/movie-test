const express = require("express");
const router = express.Router();

router.all('/', (req, res) => {
    res.status(200).send("Hello There!");
});

const movies = require("./movies")

router.use('/Movies', movies);

module.exports = router;