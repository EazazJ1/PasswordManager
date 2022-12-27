require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));



const passwordRouter = require('./routes/passwords');
const loginRouter = require('./routes/logins');

app.use('/passwords', passwordRouter);
app.use('/login', loginRouter);

app.listen(3001, () => console.log('Server Started'))