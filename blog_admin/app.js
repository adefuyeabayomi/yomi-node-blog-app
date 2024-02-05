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
    methods : ["GET","POST"],
    credentials : true,
    maxAge : 36000,
})

fastify.register(static,{
    root : path.join(__dirname,'blog-admin-ui/dist')
});

// register routes below
const createDraft = require("./functions/create-operation");
const serveData = require("./functions/serveData");
const editDraft = require("./functions/edit-operation");
const renderPreview = require("./functions/render-preview");
const publishDraft = require("./functions/publish-draft-main");
const updateHome = require("./functions/update-homepage");
const updateCategory = require("./functions/update-category");
const deletePost = require("./functions/delete-post");
const unpublishPost = require("./functions/unpublish-post");
const otherFunctionalities = require("./functions/otherFunc");
fastify.register(createDraft);
fastify.register(serveData);
fastify.register(editDraft);
fastify.register(renderPreview);
fastify.register(publishDraft);
fastify.register(updateHome);
fastify.register(updateCategory);
fastify.register(deletePost);
fastify.register(unpublishPost);
fastify.register(otherFunctionalities);

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
                console.log(`server running at http://${host}:${port}`, addr);
            }
        })
    }
    catch (err) {
        console.error(err.message);
    }
}

start();