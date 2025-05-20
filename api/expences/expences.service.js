const { readFile, writeFile } = require("../../utils");




const getAllExpences = async(req,res) => {
    const expences = await readFile("expences.json", true)
    res.json(expences)
}
const createExpence = async (req, res) => {
    const email = req.headers['email']
    if(!req.body?.content){
        return res.status(400).json({error: 'Cotent is not provided'})
    }
    const expences = await readFile("expences.json", true)
    const lastId = expences[expences.length - 1]?.id || 0
    const newExpence = {
        id: lastId +1,
        content: req.body.content,
        email,
        createdAt: new Date().toISOString()
    }
    expences.push(newExpence)
    await writeFile('expences.json', JSON.stringify(expences))
    res.status(201).json({message: 'expence created successfully', data: newExpence})
}
const getExpenceById = async(req,res) => {
    const id = Number(req.params.id)
    const expences = await readFile("expences.json", true)
    const index = expences.findIndex(el => el.id === id)
    if (index === -1) {
        return res.status(404).json({error: 'expence not found'})
    }
    res.json(expences[index])
}
const deleteExpenceById = async(req,res) => {
    const email = req.headers['email']
    const id = Number(req.params.id)
    const expences = await readFile("expences.json", true)
    const index = expences.findIndex(el => el.id === id)
    if (index === -1) {
        return res.status(404).json({error: 'expence not found'})
    }
    if (email !== expences[index].email) {
        return res.status(401).json({error: "you do not have permission to delete this expence"})
    }
    const deletedExpence = expences.splice(index,1)
    await writeFile("expences.json", JSON.stringify(expences))
    res.json({message: "deleted succesfully", data: deletedExpence})
}
const updateExpenceById = async(req,res) => {
    const email = req.headers['email']
    const id = Number(req.params.id)
    const expences = await readFile("expences.json", true)
    const index = expences.findIndex(el => el.id === id)
    if (index === -1) {
        return res.status(404).json({error: 'expence not found'})
    }
    if (email !== expences[index].email) {
        return res.status(401).json({error: "you do not have permission to update this expence"})
    }
    expences[index] = {
        ...expences[index],
        content: req.body?.content
    }
    await writeFile("expences.json", JSON.stringify(expences))
    res.json({message: "updated succesfully", data: expences[index]})
}



module.exports = {getAllExpences, createExpence, getExpenceById, deleteExpenceById, updateExpenceById};


