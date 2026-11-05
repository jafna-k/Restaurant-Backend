const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Admin = require("../models/Admin");

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        const existingAdmin = await Admin.findOne({
            email: "admin@restaurant.com",
        });

        if (existingAdmin) {
            console.log("Super Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await Admin.create({
            name: "Super Admin",
            email: "admin@restaurant.com",
            password: hashedPassword,
            role: "super_admin",
        });

        console.log("Super Admin created successfully");
        console.log("Email: admin@restaurant.com");
        console.log("Password: Admin@123");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

createAdmin();