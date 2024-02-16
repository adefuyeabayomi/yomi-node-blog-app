let blogHandler = require('../controllers/blogs.controller')

let createBlogRoute = {
    url : '/blog',
    method: 'POST',
    handler: blogHandler.createBlog
}

let getBlogsRoute = {
    url : '/blog',
    method: 'GET',
    handler: blogHandler.getBlogs
}

let updateBlogRoute = {
    url : '/blog/:blogid',
    method: 'POST',
    handler: blogHandler.updateBlog
}

let getBlogRoute = {
    method : "GET",
    url : '/blog/:blogid',
    handler: blogHandler.getBlog
}

let deleteBlogRoute = {
    method: "DELETE",
    url: "/blog/:blogid",
    handler: blogHandler.deleteBlog
}

let getBlogHomepageDataRoute = {
    method: "GET",
    url : "/blog/:blogid/homepage",
    handler: blogHandler.getBlogHomepageData
}

let getAllBlogDraftsRoute = {
    method: "GET",
    url : "/blog/:blogid/alldrafts",
    handler: blogHandler.getAllBlogDrafts
}

module.exports = {
    createBlogRoute,
    getBlogsRoute,
    updateBlogRoute,
    getBlogRoute,
    deleteBlogRoute,
    getBlogHomepageDataRoute,
    getAllBlogDraftsRoute
}