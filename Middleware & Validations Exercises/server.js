const express = require("express")
const app = express()


const { logger } = require("./middleware/logger")
const { counter } = require("./middleware/counter")
const routes = require("./routes/api")
const errorHandler = require("./middleware/errorHandler")
const responseFormatter = require("./middleware/responseFormatter");


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(responseFormatter);

// global middlewares
app.use(logger)
app.use(counter)

// routes
app.use("/", routes)
app.use(errorHandler)

// app.use((err, req, res, next) => {
//     const status = err.status || 500
//     res.status(status).send({ error: err.message })
// })

app.listen(1337, () => console.log("Server running on 1337"))


