const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const config = require('config');
const mongoURL = config.get('mongoURL'); 
// const mongoURL = "mongodb+srv://giahuy:user123@cluster0.zlwag.mongodb.net/novelweb_db";
const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const {check, validationResult} = require('express-validator');
const path = require("path");
// database connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// middlewares
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'/client/build')));
app.get('*',(req,res)=> {
   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
