const fastify = require("fastify")({
    logger : true
});


const path = require("path");
const static = require("fastify-static");
const cors = require("fastify-cors");
const fileUpload = require("fastify-file-upload");

fastify.register(fileUpload)

fastify.register(cors, {
    origin : true,
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true,
    maxAge : 36000,
})

fastify.register(static,{
    root : path.join(__dirname,'../blog-admin-ui/dist')
})

const retrieveRoute = require("./routes/retrieve.routes")
const createRoute = require("./routes/create.routes")
const editRoute = require("./routes/edit.routes")
const managePost = require("./routes/manage_post.routes")
const manage_page = require("./routes/manage_pages.routes")
const render = require("./routes/render.routes")
const blogs = require("./routes/blog.routes")
const categories = require("./routes/category.routes")

fastify.route(retrieveRoute.getDraftRoute)
fastify.route(retrieveRoute.getCatDraftsRoute)
fastify.route(createRoute)
fastify.route(editRoute)
fastify.route(managePost.unpublishRoute)
fastify.route(managePost.publishRoute)
fastify.route(managePost.delete_draft_Route)
fastify.route(manage_page)
fastify.route(render.previewRoute)
fastify.route(render.articleRoute)
fastify.route(render.homeRoute)
fastify.route(render.categoryRoute)
fastify.route(blogs.createBlogRoute)
fastify.route(blogs.getBlogsRoute)
fastify.route(blogs.getBlogRoute)
fastify.route(blogs.updateBlogRoute)
fastify.route(blogs.deleteBlogRoute)
fastify.route(blogs.getBlogHomepageDataRoute)
fastify.route(blogs.getAllBlogDraftsRoute)
fastify.route(categories.updateCatRoute)

const port = 80;
const host = "127.0.0.1";

async function start () {
    try {
        await fastify.listen(port,host,(err,addr)=>{
            if(err){
                console.log("Error in starting the server", err);
                throw err;
            }
            else {
                console.log(`server running at http://${host}:${port}`);
            }
        })
    }
    catch (err) {
        console.error(err.message);
    }
}

start();
