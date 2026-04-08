const User = require('../models/SignupModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        // Compare the hashed passwords using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        
     const token = jwt.sign(
                        {email: email},
                        process.env.SECRET_KEY,
                        {expiresIn: "1h"}
                    )

        
        if (isPasswordValid) {
            // Passwords match!
            res.status(200).json({ 
                message: 'Login successful', token, 
                userId: user._id,
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    profileImage: user.profileImage
                }
            }
        );
        } else {
            // Passwords do not match
            res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Server error',
            error: error.message 
        });
    }
};