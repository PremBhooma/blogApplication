const express = require("express")
const bcrypt = require("bcryptjs")

const { connection } = require("./config/db")

const app = express()

app.get("/", (req, res) => {
    res.send("HomeRoute")
})

app.listen(8021, async () => {
    try {
        await connection
        console.log("DB Success to Connected")
    } catch (err) {
        console.log("DB Failed to Connect")
        console.log(err)
    }
    console.log("Listening on 8021 Port")
})