const express = require("express")
const port = 3000
const apiRouter = require("./api")
const randomQuoteRouter = require("./random/randomQuote.route.js")
const {upload} = require("./config/clodinary.config.js")
const fs = require("fs/promises")
const {deleteFromCloudinary} = require("./config/clodinary.config.js")

const app = express()
app.use(express.json())
const multer = require("multer")
const path = require("path")
const { error } = require("console")

app.use(express.static('uploads'))


app.get("/", (req,res) => {
    res.send("hello world")
})

app.post("/upload",upload.single('image'), (req,res) => {
    res.status(201).json({
        message: "file uploaded successfully",
        url: req.file.path 
    })
})

app.get("/users", async (req,res) => {
    const users = JSON.parse(await fs.readFile('users.json', 'utf-8'))
    res.json(users)
})
app.get("/users/:id", async (req,res) => {
    const id = Number(req.params.id)
    const users = JSON.parse(await fs.readFile('users.json', 'utf-8'))
    const user = users.find(el => el.id === id)
    res.json(users)
}) 
app.post("/users", upload.single('avatar'),async (req,res) => {
    const {fullName, email} = req.body
    if (!fullName || !email) {
        return res.status(400).json({error: "emaili an saxeli ar mogaq"})
    }
    const users = JSON.parse(await fs.readFile('users.json', 'utf-8'))
    const lastId = users[users.length - 1]?.id || 0
    const newUser = {
        id: lastId + 1,
        fullName,
        email,
        avatar: req.file.path
    }
    users.push(newUser)
    await fs.writeFile('users.json', JSON.stringify(users))
    res.json(users)
}) 
app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const users = JSON.parse(await fs.readFile('users.json', 'utf-8'))
    const index = users.findIndex(el => el.id === id)
    if (index === -1) {
        return res.status(404).json({error: 'user not found'})
    }
    const fileName = users[index].avatar.split('uploads/')[1]
    const fileId = fileName.split('.')[0]
    const publicFileId = `uploads/${fileId}`
    await deleteFromCloudinary(publicFileId)
    users.splice(index, 1)
    await fs.writeFile('users.json', JSON.stringify(users))
    res.json({messagE: "deleted"})
})
app.put("/users/:id", async(req,res) => {
    const id = Number(req.params.id)
    const users = JSON.parse(await fs.readFile('users.json', 'utf-8'))
    const index = users.findIndex(el => el.id === id)
    if (index === -1) {
        return res.status(404).json({error: 'user not found'})
    }
    const fileName = users[index].avatar.split('uploads/')[1]
    const fileId = fileName.split('.')[0]
    const publicFileId = `uploads/${fileId}`
    await deleteFromCloudinary(publicFileId)
    users[index] = {
        ...users[index],
        avatar: req.file?.path, //ar emateba ratomgac,dzveli ishleba
    }
    await fs.writeFile('users.json', JSON.stringify(users))
    res.json({message: "updated succesfully"})
})




app.use("/api", apiRouter)
app.use("/random", randomQuoteRouter)








app.listen(port, () => {
    console.log(`server running on http://localhost:3000`)
})