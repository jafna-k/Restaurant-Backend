require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Saudi Restaurant Backend API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});