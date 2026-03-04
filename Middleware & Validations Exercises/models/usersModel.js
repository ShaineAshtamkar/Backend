const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

const getAllUsers = () => users

const getUserById = (id) => {
    return users.find(u => u.id === id)
}

const addUser = (name) => {
    const newId = users.length ? users[users.length - 1].id + 1 : 1
    const newUser = { id: newId, name: name }
    users.push(newUser)
    console.log(users)
    return newUser
}





module.exports = { getAllUsers, getUserById, addUser }