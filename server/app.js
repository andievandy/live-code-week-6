require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const mainRouter = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', mainRouter);

app.listen(port, () => `app listening on port ${port}`);