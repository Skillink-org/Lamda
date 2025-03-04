const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const yaml = require('js-yaml');
require('dotenv').config();
const connectDB = require('./common/db')
app.use(cors());

const config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
const port = config.server.port;

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());