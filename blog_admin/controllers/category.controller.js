let categoryManager = require("../functions/category")

function updateCat (request,reply){
    let {blogid} = request.params
    let {catName} = request.body
    let update = categoryManager.updateCategory(blogid,catName)
    console.log("category update", update)
    reply.code(200)
    return {message: "Update Successful", catName, ...update}
}

module.exports = {
    updateCat
}