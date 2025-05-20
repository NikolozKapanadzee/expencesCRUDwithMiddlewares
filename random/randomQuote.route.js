const { Router } = require("express");



const randomQuoteRouter = Router();


const randomQuote = [
    {
        quote:'In the middle of every difficulty lies opportunity'
    },
    {
        quote:'Be the change that you wish to see in the world'
    },
    {
        quote:'Man is not worried by real problems so much as by his imagined anxieties about real problems'
    },
    {
        quote:'You must do the thing you think you cannot do'
    },
    {
        quote:'He who has a why to live can bear almost any how'
    },
    {
        quote:'You miss 100% of the shots you don’t take'
    },
    {
        quote:'People do not decide their futures, they decide their habits and their habits decide their futures'
    },
    {
        quote:'The greater the difficulty, the more glory in surmounting it'
    },
    {
        quote:'First fix the problem, then write the code'
    },
]

randomQuoteRouter.get("/", (req, res) =>{
    const random = Math.floor(Math.random() * randomQuote.length);
    res.send(`<h1 style="color: red;">${randomQuote[random].quote}</h1>`)
})


module.exports = randomQuoteRouter