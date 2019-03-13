const express = require('express');
const path = require('path');
const cors = require('cors');
const app = require('express')();
const port = process.env.PORT || 3001;
const proxy = require('http-proxy-middleware');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../src/client')));

app.use(proxy('/schedule', {target: 'http://ec2-54-225-55-209.compute-1.amazonaws.com:3000/'}));
app.use(proxy('/feeds', {target: 'http://ec2-34-227-7-50.compute-1.amazonaws.com:3005/'}));
app.use(proxy('/espn/teamstandings', {target: 'http://ec2-18-221-206-67.us-east-2.compute.amazonaws.com:4000/'}));


app.listen(port, () => {
  console.log(`server running. Using port ${port}`);
})

