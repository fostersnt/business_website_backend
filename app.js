const express = require('express');

const app = express();

//ROUTES
const userRoutes = require("./routes/v1/userRouter");
const productRoutes = require("./routes/v1/productRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a base router/prefix for /api/v1
const apiV1RouterPrefix = express.Router();

apiV1RouterPrefix.use("/users", userRoutes);
apiV1RouterPrefix.use("/products", productRoutes);

const port = process.env.PORT || 5000;

//API PREFIX
app.use("/api/v1", apiV1RouterPrefix);

app.listen(port, ()=>{
    console.log(`Business website backend is running at port: ${port}`);
});