const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Support both Vite ports
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/gigs', require('./routes/gig.routes'));
app.use('/api/bids', require('./routes/bid.routes'));

app.get('/', (req, res) => {
    res.send('GigFlow API is running...');
});

// Routes will be imported here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
