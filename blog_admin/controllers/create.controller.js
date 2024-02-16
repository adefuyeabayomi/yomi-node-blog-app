let create = require("../functions/create")

const newDraft = async (request, reply) => {
    let {title,category} = request.body
    let {blogid} = request.params
    console.log({title,category,blogid})
    let created = create(blogid,category,title)
    reply.code(201)
    return {message: 'created', ...created}
}

module.exports = newDraft