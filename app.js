const express = require('express');

const app = express();
const port = 5000;

app.get('/users/:userId/:bookId', (req, res)=>{
    const params = JSON.stringify(req.params);
    res.send(`User ID: ${params}`);
});

app.listen(port, ()=>{
    console.log(`Business website backend is running at port: ${port}`);
});