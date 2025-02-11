const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
});

// Define Schema & Model
const MenuItem = mongoose.model('MenuItem', new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
}));

// Routes
app.get('/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching menu' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

