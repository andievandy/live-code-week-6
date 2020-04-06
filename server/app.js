require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

const mainRouter = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', mainRouter);

app.listen(port, () => `app listening on port ${port}`);