const express = require('express')
const router = express.Router()



const wonders = [
    { name: "Mount Everest", location: "Nepal", visited: false },
    { name: "Grand Canyon", location: "Arizona", visited: false },
    { name: "Botanical Gardens", location: "Singapore", visited: true },
    { name: "Pantheon", location: "Greece", visited: false },
    { name: "Colosseum", location: "Italy", visited: true }
]

router.get('/wonders', function (req, res) {
    res.send(wonders)
})

router.post('/wonder', function (req, res) {
    console.log("Someone's trying to make a post request")
    const reqBody = req.body
    const newWonder = { ...reqBody, visited: false }
    console.log(newWonder)
    wonders.push(newWonder)

    res.send()
    /*Alternatively, you could do this:
let wonder = req.body
wonder.visited = false
wonders.push(wonder)
res.send("completed adding wonder")     
*/
})


router.put('/wonder/:name', function (req, res) {
    console.log("Someone's trying to make a put request")
    console.log(req.params.name)
    let relevantWonder = wonders.find(w => w.name == req.params.name)
    relevantWonder["visited"] = true
    console.log(wonders)
    res.send()
})

router.delete('/wonder/:name', function (req, res) {
    let relevantWonderIndex = wonders.findIndex(w => w.name == req.params.name)

    if (relevantWonderIndex === -1) {
        return res.status(404).send("Wonder not found")
    }

    wonders.splice(relevantWonderIndex, 1)
    console.log(wonders)
    res.send()
})



module.exports = router
