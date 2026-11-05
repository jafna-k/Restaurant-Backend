const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🔥 ACTUAL ADMIN CONTROLLER HIT");

        // Check input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find Super Admin
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Super Admin login successful",

            token,

            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });

    } catch (error) {
        console.error("Admin Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = {
    loginAdmin,
};