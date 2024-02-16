const fs = require("fs")
let path = require("path")
let editJson = require("edit-json-file")

function getDraftData(blogid,draftid){
    let path_to_draft = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
    let data = editJson(path_to_draft).read()
    return data;
}

const getDraft = async (request,reply) => {
    let {draftid,blogid} = request.params
    reply.code(200)
    return {draft_data: getDraftData(blogid,draftid)}
}

const getCatDrafts = async (request,reply) => {
    let {blogid,category} = request.params
    let pathToBlogData = path.join(__dirname,`../articles_json/compose/${blogid}.pages_data.json`)
    let drafts = editJson(pathToBlogData)
    let data = drafts.read()[category]
    let allCatDrafts = data.top.concat(data.more)
    let draftData = allCatDrafts.map(x=>{
        let draftdata = getDraftData(blogid,x)
        return draftdata
    })
    reply.code(200)
    return {message: "get success", data, draftContents : draftData}
}

module.exports = {
    getDraft,
    getCatDrafts
}