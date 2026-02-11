const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serves your HTML file
app.use(cors());

// --- DATABASE CONNECTION ---
// We will fill this in next!
const dbURI = "mongodb+srv://admin:password247365@cluster0.xy2mvuz.mongodb.net/?appName=Cluster0"; 

mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log('DB Error:', err));

// --- DATA MODEL ---
const visitorSchema = new mongoose.Schema({
  name: String,
  message: String
});
const Visitor = mongoose.model('Visitor', visitorSchema);

// --- ROUTES ---
// 1. Save data
app.post('/add-visitor', async (req, res) => {
  try {
      const newVisitor = new Visitor({
        name: req.body.name,
        message: req.body.message
      });
      await newVisitor.save();
      console.log("Visitor saved!");
      res.redirect('/');
  } catch (err) {
      console.log(err);
      res.send("Error saving data");
  }
});

// 2. Get data
app.get('/visitors', async (req, res) => {
  const visitors = await Visitor.find();
  res.json(visitors);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
