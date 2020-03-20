const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; //where the database is stored
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB conncetion established successfully");
});

const exercisesRouter = require("./routes/exercises");
const userRouters = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", userRouters);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
