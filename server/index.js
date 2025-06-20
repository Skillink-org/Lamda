const express = require("express");
const app = express();
const cors = require('cors');
const fs = require('fs');
const yaml = require('js-yaml');
const cookieParser = require("cookie-parser");

require('dotenv').config();
const connectDB = require('./common/db')
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

const userRoutes = require("./apis/users/userRoutes");
const resultsRoutes = require("./apis/results/resultRoutes");
const testRoutes = require("./apis/exams-tests/testRoutes");
const contactRoutes = require('./apis/contact/contactRoutes'); 

const config = yaml.load(fs.readFileSync("./config/config.yaml", "utf8"));
const port = config.server.port  || 5000;;

app.use("/api/users", userRoutes);
app.use("/api/results", resultsRoutes);
app.use("/api/tests", testRoutes);
app.use('/api/contact', contactRoutes);


connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
