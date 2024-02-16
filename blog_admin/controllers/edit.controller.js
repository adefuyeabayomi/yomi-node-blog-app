const fs = require("fs")
let path = require("path")
let generateID = require("../utils/generateID")
let editJson = require("edit-json-file")
const saveImage = require("../functions/save-image")

const updateTitle = function (article_json,info){
    article_json.set("title",info.value)
}

const updateCover = function (article_json,fileInfo,blogid){
    let {file,credits} = fileInfo
    let savedImage = saveImage(blogid,file,credits)
    article_json.set("coverimage",savedImage)
    return savedImage;
}

const addSection = function (article_json,info){
    let {data} = info
    article_json.set("contents."+data.sid,data)
    article_json.append("order",data.sid)
    console.log(data)
}

const updatePostImage = function (article_json,info,blogid){
    let {file,credits,sid} = info
    let savedImage = saveImage(blogid,file,credits)
    article_json.set(`contents.${sid}.content`,savedImage)
    return savedImage
}

const updateText = function (article_json,info){
    let {value, sid} = info;
    article_json.set(`contents.${sid}.content`,value)
}

const updateCategory = function (article_json,info){
    let {category} = info
    article_json.set("category",category)
}

const updateList = function (article_json,info){
    let {value, sid} = info;
    article_json.set(`contents.${sid}.content`,value)
}

const updateOrder = function (article_json,info){
    article_json.set("order",info.order)
}


const editDraft = async (request,reply) => {
    let {draftid, blogid} = request.params
    let {type} = request.body
    let article = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
    let article_json = editJson(article,{
        autosave: true
    })

    let returnData = {message: 'Content Updated', type}
    reply.code(200)

    if(type == "updateTitle"){
        updateTitle(article_json,request.body)
    }
    else if(type == "updateCoverImage"){
        let {file,credits} = request.body
        let updated = updateCover(article_json,{file, credits},blogid)
        returnData.update = updated
    }
    else if(type == "addSection"){
        addSection(article_json,request.body)
    }
    else if(type == "updatePostImage"){
        let updated = updatePostImage(article_json,request.body,blogid)
        returnData.update = updated
        console.log(returnData)
    }
    else if(type == "updateText"){
        updateText(article_json,request.body)
    }
    else if(type == "updateCategory"){
        updateCategory(article_json,request.body)
    }
    else if(type == "updateList"){
        updateList(article_json,request.body)
    }
    else if(type == "updateOrder"){
        addSection(article_json,request.body)
        updateOrder(article_json,request.body)
    }
    else if(type == "deleteSection"){
        updateOrder(article_json,request.body)
    }
    return returnData
}

module.exports = editDraft