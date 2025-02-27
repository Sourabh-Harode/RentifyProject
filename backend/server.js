const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/rentify', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', UserSchema);

// Vehicle Schema
const VehicleSchema = new mongoose.Schema({
    name: String,
    price: Number,
    location: String,
    timeSlots: String,
    ownerId: mongoose.Schema.Types.ObjectId,
});
const Vehicle = mongoose.model('Vehicle', VehicleSchema);

// Register API
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully!' });
});

// Login API
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret');
    res.json({ token, username: user.username });
});

// Fetch Vehicles API
app.get('/vehicles', async (req, res) => {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
});

// Add Vehicle API
app.post('/vehicles', async (req, res) => {
    const { name, price, location, timeSlots, ownerId } = req.body;
    const vehicle = new Vehicle({ name, price, location, timeSlots, ownerId });
    await vehicle.save();
    res.json({ message: 'Vehicle added successfully!' });
});

// Start Server
app.listen(PORT, () => console.log(Server running on http://localhost:${PORT}));