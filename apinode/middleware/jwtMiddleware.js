const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secure secret in a real application

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

// Function to generate a new token
const generateToken = (id, expiresIn) => {
    return jwt.sign({ id }, secret, { expiresIn });
};

// Middleware to refresh the token
const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ message: 'No refresh token provided.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, secret);
        const newToken = generateToken(decoded.id, '2m');
        console.log('newToken', newToken)
        res.json({ accessToken: newToken });
    } catch (err) {
        console.log('error in refresh token api', err)
        res.status(401).json({ message: 'Invalid refresh token.' });
    }
};

module.exports = { verifyToken, generateToken, refreshToken };
