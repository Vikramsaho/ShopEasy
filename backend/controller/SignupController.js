const User = require("../models/SignupModel")
const bcrypt = require('bcryptjs');

const Signup = async (req, res) => {
    const { fullName, phoneNumber, email, password, confirmPassword } = req.body || {};

    try {
        // Validation
        if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ 
                message: 'Passwords do not match' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User with this email already exists' 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userDetails = new User({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword, // Store same hashed password
        });

        const savedUser = await userDetails.save();
        console.log("User registered successfully", savedUser);

        res.status(201).json({ 
            message: "User registration successful",
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                phoneNumber: savedUser.phoneNumber,
                profileImage: savedUser.profileImage
            }
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ 
            message: 'Server error during registration',
            error: err.message 
        });
    }
}

module.exports = Signup