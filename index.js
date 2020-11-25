const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
var http = require("http").Server(app);
var https = require("https");
var io = require("socket.io")(http);
const connectDB = require("./config/db");
const Visitor = require("./models/Visitors");
const port = process.env.PORT || 3000;

//connect db
connectDB();

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

//API routes
app.use("/api/visitors", require("./routes/api/visitors"));

// Render HTML files
app.get("/", function (req, res) {
  res.sendFile("views/index.html", {
    root: __dirname,
  });
});

app.get("/real-time", function (req, res) {
  res.sendFile("views/real-time.html", {
    root: __dirname,
  });
});

app.get("/all-traffic", function (req, res) {
  res.sendFile("views/all-traffic.html", {
    root: __dirname,
  });
});

//Socket
var Users = {};
io.on("connection", function (socket) {
  socket.on("visit", async function (data) {
    Users[socket.id] = data;

    //saving data on visit
    const newVisitor = new Visitor({
      hostname: data.hostname,
      uri: data.url,
      ip: data.ip,
    });

    await newVisitor.save();
    io.sockets.emit("getRealTime", Users);
  });

  socket.on("disconnect", function () {
    // remove saved socket from users object
    delete Users[socket.id];
    io.sockets.emit("getRealTime", Users);
  });

  socket.on("realtime", function (data) {
    io.sockets.emit("getRealTime", Users);
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
