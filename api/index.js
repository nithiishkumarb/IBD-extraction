const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoute=require('./Routes/auth');
const data = require('./Routes/data')
const users =require("./Routes/users")
const dotenv=require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to Mongodb")).catch(err=>console.log(err))

app.use('/api',data);

app.use("/api/auth",authRoute);

app.use("/api/user",users);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});