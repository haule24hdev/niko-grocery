var express = require('express')
var app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())



app.get("/getAllOrders", (req, res) => {
  // get order data from database or file storage
  dbResponse = [
    { customerName: "Eternal1", date: "2019-11-16", totalPrice: 10000, orderDetail: { p1: [40, 4], p4: [80, 4], p6: [100, 5] } },
    { customerName: "Eternal2", date: "2019-11-16", totalPrice: 30000, orderDetail: { p1: [40, 5], p2: [100, 4], p6: [100, 8] } },
    { customerName: "Eternal3", date: "2019-11-18", totalPrice: 40000, orderDetail: { p1: [40, 6], p3: [90, 4], p6: [100, 9] } }
  ]
  res.json(dbResponse)
})

app.post("/placeOrder", (req, res) => {
  var orderData = req.body;
  orderData = { customerName: "Eternal0", date: "2019-11-10", totalPrice: 100000, orderDetail: { p1: [40, 4], p4: [80, 4], p6: [100, 7] } } //temp
  console.log(orderData);
  // save orderData.customerName, orderData.date, orderData.totalPrice, orderData.orderDetail
  var response = {
    status: 200,
    success: 'Order Saved Successfully'
  }
  res.end(JSON.stringify(response));
});



app.get("/getAllProducts", (req, res) => {
  var dbResponse = [{ "no": 1, "name": "product1", "unitPrice": 20 }, { "no": 2, "name": "product2", "unitPrice": 30 }, { "no": 3, "name": "product3", "unitPrice": 40 }]
  res.json(dbResponse)
});

app.post("/addProduct", (req, res) => {
  var newProduct = req.body.newProduct
  newProduct = { "no": 1, "name": "product1", "unitPrice": 20 } //temp
  // add new product
  var response = {
    status: 200,
    success: 'Product Added Successfully'
  }
  res.end(JSON.stringify(response));
})

app.post("/updateProduct/:id", (req, res) => {
  var id = parseInt(req.params.id)
  var newProductData = req.body.newProductData
  newProductData = { "no": 1, "name": "product1", "unitPrice": 20 } //temp
  // update the product
  var response = {
    status: 200,
    success: 'Product Updated Successfully'
  }
  res.end(JSON.stringify(response));
})

app.delete("/:id", (req, res) => {
  var id = parseInt(req.params.id)
  // remove that id
  var response = {
    status: 200,
    success: 'Product Removed Successfully'
  }
  res.end(JSON.stringify(response));
})



app.listen(3000, () => {
  console.log("Server running on port 3000")
});