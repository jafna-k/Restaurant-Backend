
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Saudi Restaurant Backend Running!"
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        console.log("Connecting to MongoDB...");

        await connectDB();

        console.log("Database connection completed");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
