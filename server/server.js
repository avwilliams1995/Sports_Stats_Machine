require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())


// Import routes

const accountRouter = require("./routes/accountRouter");

app.use(cors({ origin: '*' }));

app.use("/", accountRouter);





mongoose.connect("mongodb+srv://avwilliams1995:Securitywerty1995!@dwill.brxuzp3.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);
