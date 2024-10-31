
// Creation and configuration of the Express APP
const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(dayjs().format('DD/MM/YYYY HH:mm:ss'));
    next();
});


// Route configuration
app.use('/api', require('./routes/api.routes'));

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json(err);
})

module.exports = app;