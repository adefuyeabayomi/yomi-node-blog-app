const fs = require("fs")
let path = require("path")
const Blogs = require("../functions/blogs")

function createBlog(request,reply){
    let Blog = Blogs.createNewBlog()
    reply.code(200)
    return {message: 'Blog-created', Blog}
}

function getBlogs(request,reply){
    let blogs = Blogs.getBlogs()
    reply.code(200)
    return {message: 'Fetched Blogs', blogs}
}

function getBlog(request,reply){
    let {blogid} = request.params
    let blog = Blogs.getBlog(blogid)
    reply.code(200)
    return {message: "get success", blog}
}

function updateBlog (request,reply){
    let body = request.body
    let {blogid} = request.params
    let updateBlog = Blogs.updateBlog(blogid,body)
    reply.code(200)
    return {message: "Updated Success", ...updateBlog}
}

function deleteBlog(request,reply){
    let {blogid} = request.params
    let deleted = Blogs.deleteBlog(blogid)
    reply.code(204)
    return {message: "Deleted Success", ...deleted}
}

function getBlogHomepageData(request,reply){
    let {blogid} = request.params
    reply.code(200)
    let homepageData = Blogs.getBlogHomepageData(blogid)
    return {message: "success", homepageData}

}

function getAllBlogDrafts(request,reply){
    let {blogid} = request.params
    let allDrafts = Blogs.getAllBlogDrafts(blogid)
    reply.code(200)
    return {message: "success", allDrafts}
}

module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    getBlog,
    deleteBlog,
    getAllBlogDrafts,
    getBlogHomepageData,
    getAllBlogDrafts
}


