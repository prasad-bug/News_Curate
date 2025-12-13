const User = require('../models/User');

// @desc    Update user role (DEVELOPMENT ONLY)
// @route   PUT /api/dev/user/role
// @access  Public (for development)
const updateUserRole = async (req, res) => {
    try {
        const { email, role } = req.body;

        if (!email || !role) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and role',
            });
        }

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Role must be either "user" or "admin"',
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        user.role = role;
        await user.save();

        res.json({
            success: true,
            message: `User role updated to ${role}`,
            data: {
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    updateUserRole,
};
