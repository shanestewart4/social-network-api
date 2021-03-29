const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')
// port 
const PORT = process.env.PORT || 3072;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`The API server is running on port ${PORT}`);
    });
});