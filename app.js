const port = 8000

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const apiRoutes = require("./src/modules/routes/routes");
require('dotenv').config();

const uri = process.env.URL
mongoose.connect(uri,{useUnifiedTopology:true})

app.use(cors());

app.use(bodyParser.json());
app.use("/", apiRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
});