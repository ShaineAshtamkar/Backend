const getHome = (req, res) => {
    res.send({ message: "Welcome!", requestCount: req.requestCount })
}

const getAbout = (req, res) => {
    res.send({ message: "About", requestCount: req.requestCount })
}

module.exports = { getHome, getAbout }