const express = require('express');
const { updateUserRole } = require('../controllers/devController');

const router = express.Router();

// Development only - update user role
router.put('/user/role', updateUserRole);

module.exports = router;
