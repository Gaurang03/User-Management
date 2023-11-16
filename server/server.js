const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://gaurangagrawal10:Gaurang03@cluster0.8vfo4hh.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// server.js


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  id: String,
  creationDate: Date,
});

const User = mongoose.model('User', userSchema);

app.post('/create-account', async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    // Validate input
    if (!username || !password || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    // Create a new user document
    const newUser = new User({
      username,
      password,
      email,
      phone,
      creationDate: new Date(),
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully.' });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
