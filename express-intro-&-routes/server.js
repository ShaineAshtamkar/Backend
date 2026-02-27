const express = require('express')

//console.log(express)
const app = express()
const path = require('path')


// const users = {
//     tilda: "You've done a wonderful job",
//     riva: "You need to improve your form, but good perseverance",
//     jeremy: "You're incredible"
// }



// app.get('/', function (request, response) {
//     console.log("Someone has come into the server. Brace yourselves.")
//     response.send("Ending the cycle, thanks for visiting")

// })
// //http://localhost:3000/routeWithOptionalParameters/?name=robert
// app.get('/routeWithOptionalParameters', (request, response) => {
//     let params = request.query
//     response.send(params)
// })

// //http://localhost:3000/details?city=delhi&zipcode=123&middleName=Lee
// app.get('/details', (request, response) => {
//     let { zipcode, city, middleName } = request.query
//     console.log(city)
//     response.send(request.query)
// })

// app.get('/details', (request, response) => {
//     let params = request.query
//     console.log(params.city)

//     response.send(params)
// })

// app.get('/users/:userName', function (request, response) {
//     response.send(`Hi there, ${users[request.params.userName]}`)

// })

// app.get('/maps', function (request, response) {
//     response.send("Here's some stuff related to maps")
// })

// app.get('/shoobi', function (request, response) {
//     response.send("This here is the shoobi *route*")
// })

// app.get('/life', function (request, response) {
//     response.send("42")
// })

// app.get('/landing/:username', function (request, response) {
//     response.send(`Hi there, ${request.params.username}`)
// })

const fs = require('fs')

// build the path you THINK jquery is in
const jqueryDist = path.join(__dirname, '..', 'node_modules', 'jquery', 'dist')

app.use(express.static(path.join(__dirname, 'dist')))
app.use('/jquery', express.static(path.join(__dirname, '..', 'node_modules', 'jquery', 'dist')))

const data = {
    8112: {
        title: "Name of the Wind",
        author: "Patrick Rothfuss"
    },
    9121: {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger"
    },
    1081: {
        title: "The Giver",
        author: "Lois Lowry"
    }
}

app.get('/books/:bookID', function (request, response) {
    response.send(data[request.params.bookID])
})


const port = 3000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)

})



