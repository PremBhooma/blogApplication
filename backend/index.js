const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const { connection } = require("./config/db")
const { UserModel } = require("./models/User.model")
const { blogRouter } = require("./routes/blog.routes")
// const { authentication } = require("./middlewares/authentication")

require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("HomeRoute")
})

app.post("/signup", (req, res) => {
    let { name, email, password } = req.body
    // console.log(req.body)

    // Validations
    if (!name || !email || !password) {
        return res.status(400).send({ msg: 'Please provide all required fields.' });
    }

    if (password.length < 4 || password.length > 10) {
        return res.status(400).send({ msg: 'Password must be between 4 and 10 characters.' });
    }

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordPattern.test(password)) {
        return res.status(400).json({
            msg: 'Password must contain at least one alphabet character, one numeric character, and one special symbol.',
        });
    }

    // Validation for Check the email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).send({ msg: 'Invalid email format.' });
    }

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

app.post("/login", async (req, res) => {
    let { email, password } = req.body
    const user = await UserModel.findOne({ email })

    if (!user) {
        res.send({ msg: "Please Signup" })
    } else {
        const hash_password = user.password
        console.log(hash_password)
        bcrypt.compare(password, hash_password, function (err, result) {
            if (result) {
                let token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY);
                res.send({ msg: "Login Successful", token: token })
            } else {
                res.send({ msg: "Invalid Credentials" })
            }
        });
    }
})

app.use("/blogs", blogRouter)

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