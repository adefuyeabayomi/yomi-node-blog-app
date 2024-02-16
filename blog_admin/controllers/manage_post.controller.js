const path = require("path")
const editJson = require("edit-json-file")
const interpolate = require("string-interpolation-js").default
const getRandom = require("../utils/randomArrEle")
const fs = require("fs")
const moment = require("moment")

const publish = async (request,reply) => {
    let {draftid,blogid} = request.params
    console.log({draftid,blogid})
    let path_to_article = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
    let article_json = editJson(path_to_article,{
        autosave: true
    })
    article_json.set("published",Date.now())
    reply.code(200)
    return {message: "published", draftid}
}

const unpublish = async (request,reply) => {
    let {draftid,blogid} = request.params
    console.log({draftid,blogid})
    let path_to_article = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
    let article_json = editJson(path_to_article,{
        autosave: true
    })
    article_json.set("published",null)
    reply.code(200)
    return {message: "unpublished", draftid}
}

const delete_draft = async (request,reply) => {
    let {draftid,blogid} = request.params
    console.log({draftid,blogid})
    // right now this implementation only adds the property delete to the article data
    // but what i want is to remove the draft from the pagedata and the all draft in compose folder.
    // so note that
    let path_to_article = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
    let article_json = editJson(path_to_article,{
        autosave: true
    })
    article_json.set("deleted",Date.now())
    reply.code(200)
    return {message: "deleted", draftid}
}


module.exports = {
    publish, 
    unpublish,
    delete_draft,
}