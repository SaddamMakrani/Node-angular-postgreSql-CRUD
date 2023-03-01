const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const db = require("./app/models");
const Role = db.role;
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Drop and Resync Db");
    initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
  
// routes
require('./app/routes/auth.routes')(app);
require("./app/routes/notes.routes")(app);

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
