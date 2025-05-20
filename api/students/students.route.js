const { Router } = require("express");

const studentRouter = Router()

const students = [
    {
        id: 1,
        name: "guja kupreisvhili",
        age: 21
    },
    {
        id: 2,
        name: "luka sulakvelidze",
        age: 20
    },
    {
        id: 3,
        name: "gio kupreishvili",
        age: 22
    }
]
studentRouter.get('/', (req, res) => {
    res.json(students)
})

module.exports = studentRouter