const { getAllUsers, addUser } = require("../models/usersModel")

const getUsers = (req, res) => {
    res.send(getAllUsers())
}

const getUserById = (req, res) => {
    res.send(req.user)
}

const createUser = (req, res) => {
    const name = req.body.name

    if (!name || typeof name !== "string") {
        return res.status(400).send({ error: "Please send { name: '...' }" })
    }
    const newUser = addUser(name)
    res.status(201).send(newUser)

}




module.exports = { getUsers, getUserById, createUser }