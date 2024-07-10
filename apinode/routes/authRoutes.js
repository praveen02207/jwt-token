const express = require('express');
const { generateToken, refreshToken } = require('../middleware/jwtMiddleware');
const router = express.Router();

const users = [{ id: 1, username: 'user1', password: 'password1' }]; // Example users

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const accessToken = generateToken(user.id, '2m');
    const refreshToken = generateToken(user.id, '30m');

    res.json({ status:true,userId: user.id, accessToken, refreshToken });
});


// Refresh token route
router.post('/refresh-token', refreshToken);
module.exports = router;
