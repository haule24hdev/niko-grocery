const express = require('express')
const app = express()
const editJsonFile = require("edit-json-file")


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: false
}))

// parse application/json
app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// connect file-db
let productsList = editJsonFile(`${__dirname}/database/productsList.json`, {
  autosave: true
})
let orderHistory = editJsonFile(`${__dirname}/database/orderHistory.json`, {
  autosave: true
})
// products and orderDetails db-file
productsListData = productsList.get();
orderHistoryData = orderHistory.get();



app.get("/order", (req, res) => {
  res.json(orderHistoryData.orderDetails)
})

app.post("/order", (req, res) => {
  let newOrder = {
    "customerName": req.body.customerName,
    "date": req.body.date,
    "totalPrice": req.body.totalPrice,
    "products": req.body.products
  }
  orderHistory.set("orderDetails.as.object", orderHistoryData.orderDetails.push(newOrder))
  let response = {
    status: 200,
    success: 'Order Saved Successfully'
  }
  res.end(JSON.stringify(response));
});



app.get("/product", (req, res) => {
  res.json(productsListData.products)
});

app.post("/product", (req, res) => {
  let newProduct = {
    "name": req.body.productName,
    "unitPrice": req.body.unitPrice
  }
  productsList.set("products.as.object", productsListData.products.push(newProduct))
  let response = {
    status: 200,
    success: 'Product Added Successfully'
  }
  res.end(JSON.stringify(response));
})

app.put("/product/:id", (req, res) => {
  let id = parseInt(req.params.id)
  let updateData = {
    "name": req.body.productName,
    "unitPrice": req.body.unitPrice
  }
  let temp = productsListData.products[id] = updateData
  productsList.set("products.as.object", temp)
  let response = {
    status: 200,
    success: 'Product Updated Successfully'
  }
  res.end(JSON.stringify(response));
})

app.delete("/product/:id", (req, res) => {
  let id = parseInt(req.params.id)
  productsList.set("products.as.object", productsListData.products.splice(id, 1))
  // remove that id
  let response = {
    status: 200,
    success: 'Product Removed Successfully'
  }
  res.end(JSON.stringify(response));
})



app.listen(4001, () => {
  console.log("Grocery Store API Running At localhost:4001")
});