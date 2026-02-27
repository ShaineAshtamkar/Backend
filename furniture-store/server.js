const express = require('express')
const path = require('path')
const app = express()


const store = [
    { name: "table", inventory: 3, price: 800 },
    { name: "chair", inventory: 16, price: 120 },
    { name: "couch", inventory: 1, price: 1200 },
    { name: "picture frame", inventory: 31, price: 70 }
]

wordCounter = {}

app.use(express.static(path.join(__dirname, 'dist')))
app.use('/jquery', express.static(path.join(__dirname, '..', 'node_modules', 'jquery', 'dist')))


app.get('/', function (request, response) {
    response.send("Server is up and running smoothly")
})

app.get('/priceCheck/:name', function (request, response) {
    paramName = request.params.name
    item = store.find(i => i.name === paramName)
    if (!item) {
        return response.status(404).send(`{price: null}`);
    }
    response.send({ price: item.price })
})

app.get('/buy/:name', function (request, response) {
    paramName = request.params.name
    item = store.find(i => i.name == paramName)
    item["inventory"]--
    response.send({
        name: item.name,
        inventory: item.inventory,
        price: item.price
    })
})

app.get('/sale', (request, response) => {
    let isAdmin = request.query.admin
    if (isAdmin === "true") {
        relevantItems = store.filter(i => i.inventory > 10)
        for (let i = 0; i < relevantItems.length; i++) {
            if (!i.onSale) {
                relevantItems[i]["price"] = relevantItems[i]["price"] / 2
                i.onSale = true;
            }
        }
    }
    response.send(store)
})

// app.get('/sale', (req, res) => {
//   if (req.query.admin === "true") {
//     for (const item of store) {
//       if (item.inventory > 10 && !item.onSale) {
//         item.price = item.price / 2
//         item.onSale = true
//       }
//     }
//   }

//   res.send(store)
// })


const port = 3000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)

})