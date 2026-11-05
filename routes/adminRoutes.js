const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Admin route working",
    });
});

router.post("/login", (req, res) => {
    res.json({
        success: true,
        message: "Login route working",
        received: req.body,
    });
});

module.exports = router;