const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const yaml = require('js-yaml');
const connectDB = require("./common/db");
const testRouter = require("./apis/tests/testRoutes");

app.use(cors());

const config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
const port = config.server.port;

connectDB(); // חיבור ל-MongoDB

app.use("/api/tests", testRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());



// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const testRoutes = require("./apis/tests/testRoutes");
// app.use("/api/tests", testRoutes);

// app.listen(8080, () => console.log("Server is running on port 8080"));
