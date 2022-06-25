const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const port = 3010

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let tutorials = [
    {
        id: 1,
        title: 'TitleOne',
        description: 'DescriptionOne'
    },
    {
        id: 2,
        title: 'TitleTwo',
        description: 'DescriptionTwo'
    },
    {
        id: 3,
        title: 'TitleTwo',
        description: 'DescriptionTwo'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/tutorials', (req, res) => {
    if (req.query.title) {
        const tutorialsFound = tutorials.filter(tutorial => tutorial.title === req.query.title)
        return res.status(200).send(tutorialsFound)
    }
    res.status(200).send(tutorials)
})

app.get('/tutorials/:id', (req, res) => {
    const tutorial = tutorials.find(tutorial => tutorial.id == req.params.id)
    res.status(200).send(tutorial)
})

app.post('/tutorials', (req, res) => {
    const id = tutorials[tutorials.length -1].id
    const tutorial = {
        id: id+1,
        title: req.body.title,
        description: req.body.description,
    }
    tutorials.push(tutorial)
    res.status(201).send()
})

app.put('/tutorials/:id', (req, res) => {
    const tutorial = tutorials.find(tutorial => tutorial.id == req.params.id)
    tutorials = tutorials.filter(oldTut => oldTut.id != tutorial.id)
    if (req.body.title) {
        tutorial.title = req.body.title
    }
    if (req.body.description) {
        tutorial.description = req.body.description
    }
    tutorials.push(tutorial)
    res.status(202).send()
})

app.delete('/tutorials/:id', (req, res) => {
    tutorials = tutorials.filter(tutorial => tutorial.id != req.params.id)
    res.status(204).send()
})

app.delete('/tutorials', (req, res) => {
    tutorials = []
    res.status(204).send()
})