const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const app = express();
const formData = require("express-form-data");
const Route = require("./routes/video");
const fs = require("fs");

app.use(cors());
app.use(express.json({ limit: "1000kb" }));
app.use(formData.parse());
app.use(express.urlencoded({ extended: true }));
app.use("/", Route);

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
app.listen(process.env.PORT, process.env.HOST_NAME);

console.log(`Server started...`);
