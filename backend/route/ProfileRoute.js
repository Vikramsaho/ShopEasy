const express = require("express")
const User = require("../models/SignupModel")

const router = express.Router();

const {VerifyToken} = require("../middleware/TokenGeneration")

// Get user profile
router.get("/", VerifyToken, async (req, res) => {
    try {
        // req.user contains the decoded JWT payload (email)
        const { email } = req.user;
        
        // Fetch full user details from database
        const user = await User.findOne({ email }).select('-password -confirmPassword');
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        res.json({
            message: "Profile retrieved successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error("Profile route error:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
})

// Update user profile (including profile image)
router.put("/", VerifyToken, async (req, res) => {
    try {
        const { email } = req.user;
        const { fullName, phoneNumber, profileImage } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        // Update fields
        if (fullName) user.fullName = fullName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (profileImage) user.profileImage = profileImage;
        
        await user.save();
        
        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({
            message: "Failed to update profile",
            error: error.message
        });
    }
})

// Upload profile image
router.post("/upload-image", VerifyToken, async (req, res) => {
    try {
        const { email } = req.user;
        const { imageUrl } = req.body;
        
        if (!imageUrl) {
            return res.status(400).json({
                message: "Image URL is required"
            });
        }
        
        // Find and update user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        user.profileImage = imageUrl;
        await user.save();
        
        res.json({
            message: "Profile image uploaded successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error("Upload image error:", error);
        res.status(500).json({
            message: "Failed to upload image",
            error: error.message
        });
    }
})

module.exports = router