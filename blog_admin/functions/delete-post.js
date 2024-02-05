

async function deletePost(fastify,options){
    fastify.get("/delete-post/",(request,reply)=>{
        console.log("deleting d post");
        return {
            status : "sucess",
        }
    })
}

module.exports = deletePost;