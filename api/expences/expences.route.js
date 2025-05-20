const { Router } = require("express")
const { readFile, writeFile } = require("../../utils");
const { getAllExpences, createExpence, getExpenceById, deleteExpenceById, updateExpenceById } = require("./expences.service");
const hasEmailMiddleware = require("../../middlewares/hasEmail.middleware");



const expencesRoute = Router()


expencesRoute.get("/", getAllExpences)
expencesRoute.post('/',hasEmailMiddleware, createExpence)
expencesRoute.get('/:id', getExpenceById)
expencesRoute.delete('/:id',hasEmailMiddleware, deleteExpenceById)
expencesRoute.put('/:id',hasEmailMiddleware, updateExpenceById)





module.exports = expencesRoute
