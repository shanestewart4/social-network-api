const express = require('express');
const db = require('./config/connection');
const mongoose = require('mongoose');
const routes = require('./routes')
// port 
const PORT = process.env.PORT || 3072;
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/social-network-api";

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

mongoose.connect(MONGODB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`The API server is running on port ${PORT}`);
    });
});