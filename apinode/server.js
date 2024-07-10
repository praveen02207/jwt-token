const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const { verifyToken } = require('./middleware/jwtMiddleware');
const cors = require('cors');



const app = express();

app.use(bodyParser.json());
app.use(cors());


// Public routes
app.use('/api', authRoutes);

// Root route
app.get('/', (req, res) => {
    return res.send("Server Running Success!");
});

// Protected route example
app.get('/api/dashboard', verifyToken, (req, res) => {
    res.json({ status: true, message: `Welcome to the dashboard, user ${req.userId}!` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});
