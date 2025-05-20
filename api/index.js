const { Router } = require("express");
const studentRouter = require("./students/students.route");
const expencesRoute = require("./expences/expences.route");

const apiRouter = Router()

apiRouter.use('/students', studentRouter)
apiRouter.use('/expences', expencesRoute)

module.exports = apiRouter