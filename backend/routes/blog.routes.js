const { Router } = require("express")
const multer = require("multer")
const path = require('path')

const { UserModel } = require("../models/User.model")
const { BlogModel } = require("../models/Blog.model")

const blogRouter = Router()


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
        image: req.file.path // Assigned the image path 
    })

    try {
        await new_blog.save()
        res.send({ msg: "Blog Created" })
    } catch (err) {
        res.send({ msg: "Blog Failed to Create" })
        console.log(err)
    }
})

module.exports = {
    blogRouter
}