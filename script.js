const express = require("express")
const port = 3000
const apiRouter = require("./api")
const randomQuoteRouter = require("./random/randomQuote.route.js")

const app = express()
app.use(express.json())


app.use((req,res,next) => {
    console.log(req.headers['user-agent']);
    next();
})


app.use("/api", apiRouter)
app.use("/random", randomQuoteRouter)








app.listen(port, () => {
    console.log(`server running on http://localhost:3000`)
})