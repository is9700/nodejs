const express = require('express')
const userRouter = require("./routers/user.router")
const logger = require('morgan');
const connect = require("./config/database");
const jwt = require("jsonwebtoken");
const cors = require('cors')
const subcategoryRouter = require("./routers/subcategory.router")
const productRouter = require("./routers/product.router")
const categoryRouter = require("./routers/category.router")
const orderRouter = require("./routers/order.router")
const app = express()
app.use(cors())
app.set("secretKey", "hichem")
app.use(express.json())
app.use("/users",userRouter)
app.use("/categories",validateUser,categoryRouter)
app.use("/subcategories",validateUser,subcategoryRouter)
app.use("/order",validateUser,orderRouter)
app.use("/product",validateUser,productRouter)
app.use(logger('dev'));

const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/hello', (req, res) => {
  res.send(' bonjour')
})

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
     err.status = 404;
     next(err);
 });
 // handle errors
 app.use(function(err, req, res, next) {
  console.log(err);
  
   if(err.status === 404)
    res.status(404).json({message: "Not found"});
   else 
     res.status(500).json({message: "Something looks wrong :( !!!"});
 });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}