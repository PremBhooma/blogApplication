const { Router } = require("express")
const multer = require("multer")
const path = require('path')
const fs = require("fs")

const { UserModel } = require("../models/User.model")
const { BlogModel } = require("../models/Blog.model")
const { authentication } = require("../middlewares/authentication")

const blogRouter = Router()

blogRouter.get("/", async (req, res) => {
    const blogs = await BlogModel.find()
    res.send({ blogs: blogs })
})

blogRouter.get("/:_id", async (req, res) => {
    const blogs = await BlogModel.findOne({ _id: req.params._id })
    res.send({ blogs: blogs })
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({
    storage: storage
})

blogRouter.post("/create", upload.single('testImage'), authentication, async (req, res) => {
    const { title, description } = req.body

    const author_id = req.user_id
    const user = await UserModel.findOne({ _id: author_id })
    const { name, email } = user

    const new_blog = new BlogModel({
        title,
        description,
        img: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/png",
        },
        author_name: name,
        author_email: email,
    })

    try {
        await new_blog.save()
        res.send({ msg: "Blog Created" })
    } catch (err) {
        res.send({ msg: "Blog Failed to Create" })
        console.log(err)
    }
})


blogRouter.put("/edit/:blogID", async (req, res) => {
    try {
        const blogID = req.params.blogID
        const payload = req.body;

        const user_id = req.user_id
        const user = await UserModel.findOne({ _id: user_id })
        const user_email = user.email;
        // console.log(user_email)

        const blog = await BlogModel.findOne({ _id: blogID })
        const blog_author_email = blog.author_email
        // console.log(blog_author_email)

        if (user_email !== blog_author_email) {
            res.send({ msg: "Unauthorized" })
        } else {
            await BlogModel.findByIdAndUpdate(blogID, payload)
            res.status(200).send({ msg: `Blog ${blogID} Updated` })
        }
    } catch (err) {
        console.log(err)
        res.send({ msg: "Update Failed" })
    }
})

blogRouter.delete("/delete/:blogID", async (req, res) => {
    try {
        const blogID = req.params.blogID

        const user_id = req.user_id
        const user = await UserModel.findOne({ _id: user_id })
        const user_email = user.email;

        const blog = await BlogModel.findOne({ _id: blogID })
        const blog_author_email = blog.author_email

        if (user_email !== blog_author_email) {
            res.send({ msg: "Unauthorized" })
        } else {
            await BlogModel.findByIdAndDelete(blogID)
            res.status(200).send({ msg: `Blog ${blogID} Deleted` })
        }
    } catch (err) {
        console.log(err)
    }
})


module.exports = {
    blogRouter
}