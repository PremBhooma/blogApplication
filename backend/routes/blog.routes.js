const { Router } = require("express")
const multer = require("multer")
const path = require('path')

const { UserModel } = require("../models/User.model")
const { BlogModel } = require("../models/Blog.model")

const blogRouter = Router()

blogRouter.get("/", async (req, res) => {
    const blogs = await BlogModel.find()
    res.send({ blogs: blogs })
})


const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer({
    storage: Storage
})

blogRouter.post("/create", upload.single('image'), async (req, res) => {
    const { title, description } = req.body

    if (!req.file) {
        return res.status(400).send({ error: "No image file uploaded." });
    }

    const { image } = req.file

    const author_id = req.user_id
    const user = await UserModel.findOne({ _id: author_id })
    const { name, email } = user

    const new_blog = new BlogModel({
        title,
        description,
        author_name: name,
        author_email: email,
        image: req.file.path
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