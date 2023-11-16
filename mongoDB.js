// mongoDB.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://gaurangagrawal10:Gaurang03@cluster0.8vfo4hh.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
