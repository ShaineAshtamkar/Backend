const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


wordCounter = {}

app.get("/sanity", (req, res) => {
    res.send("Server is up!")
})

app.get("/sanity/:word", (req, res) => {

    if (Object.hasOwn(wordCounter, req.params.word)) {
        res.send({ count: wordCounter[req.params.word] })

    }
    else res.send({ count: 0 })

})

app.post("/sanity/:word", (req, res) => {
    if (Object.hasOwn(wordCounter, req.params.word)) {
        wordCounter[req.params.word]++;
        res.send({ text: `Added ${req.params.word}`, currentCount: wordCounter[req.params.word] })
    }
    else {
        wordCounter[req.params.word] = 1;
        res.send({ text: `Added ${req.params.word}`, currentCount: 1 })
    }
})

app.post("/sentence", (req, res) => {
    const sentence = req.body.sentence
    let numNewWords = 0
    let numOldWords = 0

    const words = sentence.trim().split(/\s+/)

    for (let word of words) {
        let lowerWord = word.toLowerCase()
        if (Object.hasOwn(wordCounter, lowerWord)) {
            wordCounter[lowerWord]++;
            numOldWords++
        }
        else {
            wordCounter[lowerWord] = 1
            numNewWords++
        }
    }
    const output = { text: `Added ${numNewWords} words, ${numOldWords} already existed`, currentCount: -1 }


    res.send(output)

})

app.delete("/sanity/delete/:word", (req, res) => {
    const word = req.params.word.toLowerCase()

    if (word) {
        if (!Object.hasOwn(wordCounter, word)) {
            return res.status(404).send({
                error: `Word '${word}' not found - nothing was deleted`
            })
        }
        if (Object.hasOwn(wordCounter, word)) {
            delete wordCounter[word]
            return res.status(200).send({
                message: `Deleted '${word}' successfully`
            })
        }
    }
    else {

    }
})


app.listen(1337, () => console.log("running on 1337"))


// You use req.body when the client sends data in the BODY of the request (usually with POST / PUT / PATCH).

// You use req.params when the data is in the URL (/something/:id).

// You use req.query when the data is in the query string (/something?x=1).