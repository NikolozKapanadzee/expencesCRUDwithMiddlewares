const { Router } = require("express")
const { readFile, writeFile } = require("../../utils");
const { getAllExpences, createExpence, getExpenceById, deleteExpenceById, updateExpenceById } = require("./expences.service");
const hasEmailMiddleware = require("../../middlewares/hasEmail.middleware");
const {isViewer, isEditor, isAdmin} = require("../../middlewares/role.middleware.js")


const expencesRoute = Router()


expencesRoute.get("/",isViewer, getAllExpences)
expencesRoute.post('/',isEditor, hasEmailMiddleware, createExpence)
expencesRoute.get('/:id',isViewer, getExpenceById)
expencesRoute.delete('/:id',isAdmin, hasEmailMiddleware, deleteExpenceById)
expencesRoute.put('/:id',isEditor,hasEmailMiddleware, updateExpenceById)





module.exports = expencesRoute
