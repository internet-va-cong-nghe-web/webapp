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
// const {fileURLToPath} = require("url");
// database connection
mongoose.connect(mongoURL)
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// middlewares
app.use(express.json());
app.use(cors());

//nếu dùng ES module thì thêm : 
// const __filename= fileURLToPath(import.meta.url);
// const __dirname =path.dirname(__filename);

//specify client app
app.use(express.static(path.join(__dirname,'/client/build')));
app.get('*', function (req, res) {
  const index = path.join(__dirname, 'client', 'build', 'index.html');
  res.sendFile(index);
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
