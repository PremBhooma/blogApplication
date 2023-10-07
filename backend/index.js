const express = require("express")
const bcrypt = require("bcryptjs")

const { connection } = require("./config/db")
const { UserModel } = require("./models/User.model")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("HomeRoute")
})

app.post("/signup", (req, res) => {
    let { name, email, password } = req.body
    // console.log(req.body)
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, 3, async function (err, hash) {
            const new_user = new UserModel({
                name,
                email,
                password: hash,
            })
            try {
                await new_user.save()
                res.send({ msg: "Signup Successful" })
            } catch (error) {
                console.log(error)
                res.status(500).send({ msg: "Something Went Wrong" })
            }
        });
    });
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