const path = require("path")
const editJson = require("edit-json-file")
const interpolate = require("string-interpolation-js").default
const getRandom = require("../utils/randomArrEle")
const fs = require("fs")
const moment = require("moment")

const render = require("../functions/render")
 
const preview = async (request,reply) => {
    let {draftid,blogid} = request.params
    console.log({draftid,blogid})
    let path_to_article = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
    let article_json = editJson(path_to_article,{
        autosave: true
    })
    let article = article_json.read()
    let pathToPreviewFile = path.join(__dirname,`../../blog_folder_${blogid}/preview/${draftid}.html`)
    let previewHTML = render.renderPreview(article)
    fs.writeFileSync(pathToPreviewFile,previewHTML)
    console.log("path to preview file::::::::::::::::::",pathToPreviewFile)
    reply.code(200)
    return {message: "preview compiled",previewPath: pathToPreviewFile}
}

const article = async (request,reply)=> {
    let {draftid,blogid} = request.params
    console.log({draftid,blogid})
    let path_to_article = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
    let article_json = editJson(path_to_article,{
        autosave: true
    })
    let path_to_blog_data = path.join(__dirname,`../articles_json/compose/${blogid}.pages_data.json`)
    let blog_json = editJson(path_to_blog_data,{
        autosave: true
    })
    let blog_data = blog_json.read()
    let article = article_json.read()
    let blog_post_file = path.join(__dirname,`../../blog_folder_${blogid}/${draftid}.html`)

    console.log("top data:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::", blog_data[article.category].top)

    // change this part to top
    let articleHTML = render.renderArticle(article,blog_data[article.category].top,blogid)

    fs.writeFileSync(blog_post_file,articleHTML)
    return {message: "render success", path_to_post : blog_post_file }
}


const homepage = async (request,reply) => {
    let {blogid} = request.params
    let home = render.renderHome(blogid)
    reply.code(200)
    return {message: "Homapage Compiled", home}
}


const category = async (request,reply) => {
    let {category,blogid} = request.params
    let catHTML = render.renderCategory(category,blogid)
    reply.code(200)
    return {message: "preview compiled",catLink: catHTML}
}


module.exports = {
    preview,
    article,
    category,
    homepage
}