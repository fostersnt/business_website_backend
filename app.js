const express = require('express');

const app = express();
const userRoutes = require("./routes/v1/userRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes)


const port = process.env.PORT || 5000;

// app.get('/users/:userId/:bookId', (req, res)=>{
//     const params = JSON.stringify(req.params);
//     res.send(`Request Data: ${params}`);
// });

app.listen(port, ()=>{
    console.log(`Business website backend is running at port: ${port}`);
});