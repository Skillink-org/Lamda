const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const yaml = require('js-yaml');
require('dotenv').config();
const connectDB = require('./common/db')
app.use(cors());
app.use(express.json());

const userRoutes = require('./apis/users/userRoutes');

const config = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'));
const port = config.server.port || 5000;

app.use('/api/users', userRoutes);

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});