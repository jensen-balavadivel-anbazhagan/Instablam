const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const host = "localhost";
var http = require('http').createServer(app);
const path = require("path");

const galleryRouter = require("./routes/gallery");

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/gallery", galleryRouter);

const server = http.listen(port, host, () => console.log(`Instablam api listening on port ${port}!`));

module.exports = app;