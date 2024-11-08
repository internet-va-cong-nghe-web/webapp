const express = require("express");
const app = express();

require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const mongoURL = process.env.mongoURL;
// const mongoURL = "mongodb+srv://giahuy:user123@cluster0.zlwag.mongodb.net/novelweb_db";
const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const {check, validationResult} = require('express-validator');
const path = require("path");
const novelRoutes = require("./routes/api/novel");
// const {fileURLToPath} = require("url");

// middlewares
app.use(express.json());
app.use(cors());
//specify client app

// app.use(express.static(path.join(__dirname,'/client/build')));//here is important thing - no static directory, because all static :)
// app.get('*', function (req, res) {
//   const index = path.join(__dirname, '../client/build', 'index.html');
//   res.sendFile(index);
// });

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/novel",novelRoutes);
app.get('/', (req,res)=>{
  res.send("demo get");
})
// database connection
mongoose.connect(mongoURL)
.then(() => {
  console.log('Connected to MongoDB successfully');
  app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}...`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
