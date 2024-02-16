const fs = require("fs")
let path = require("path")
let copydir = require("copy-dir")
let generateID = require("../utils/generateID")
let editJson = require("edit-json-file")
let {blog_json_file} = require("../utils/resRef")

let blog_edit = editJson(blog_json_file,{
    autosave: true
})

let saveImage = require("./save-image")

function createNewBlog(){
    let blogData = {
        id : generateID(),
        name: '',
        created: Date.now(),
        categories: [],
        description: '',
        author: '',
        mainTitle : '',
        logo: {}
    }
    blog_edit.set(blogData.id,blogData)
    let data_path = path.join(__dirname,`../articles_json/compose/${blogData.id}.pages_data.json`)
    let data_json = editJson(data_path,{
        autosave: true
    })
    data_json.set('homepage', {top: [], more: []})
    let blogDraftsPath = `${path.join(__dirname,'../articles_json/'+blogData.id)}`
    let blogFolderPath = path.join(__dirname,`../../blog_folder_${blogData.id}`)
    let blogAssetsPath = path.join(__dirname,`../../blog_folder_${blogData.id}/blog_assets`)
    let pathToFonts =  path.join(__dirname,`../../blog_folder_${blogData.id}/blog_assets/fonts`)
    let pathToImages = path.join(__dirname,`../../blog_folder_${blogData.id}/blog_assets/images`)
    let pathToUtilImages = path.join(__dirname,`../../blog_folder_${blogData.id}/blog_assets/images/utils`)
    let pathToImgUtilsTemp = path.join(__dirname,`../render-assets/utils`)
    let pathToFontsTemp = path.join(__dirname,`../render-assets/fonts`)
    let cssTemp = path.join(__dirname,`../render-assets/css`)
    let jsTemp = path.join(__dirname,`../render-assets/js`)
    let blogPostsPath = path.join(__dirname,`../../blog_folder_${blogData.id}/blog_posts`)
    let cssPath = path.join(__dirname,`../../blog_folder_${blogData.id}/css`)
    let jsPath = path.join(__dirname,`../../blog_folder_${blogData.id}/js`)
    let previewPath  = path.join(__dirname,`../../blog_folder_${blogData.id}/preview`)

    fs.mkdirSync(blogDraftsPath)
    fs.mkdirSync(blogFolderPath)
    fs.mkdirSync(blogAssetsPath)
    fs.mkdirSync(blogPostsPath)
    fs.mkdirSync(cssPath)
    fs.mkdirSync(jsPath)
    fs.mkdirSync(previewPath)
    fs.mkdirSync(pathToFonts)
    fs.mkdirSync(pathToImages)
    fs.mkdirSync(pathToUtilImages)
    copydir.sync(pathToImgUtilsTemp,pathToUtilImages)
    copydir.sync(pathToFontsTemp,pathToFonts)
    copydir.sync(cssTemp,cssPath)
    copydir.sync(jsTemp,jsPath)

    return blogData.id
}

function getBlogs (){
    return blog_edit.read()
}

function getBlog(blogid){
    return blog_edit.read()[blogid]
}

function updateBlog(blogid,data){
    console.log("update blog",data)
    let {name,author,description,file}=data
    name ? blog_edit.set(`${blogid}.name`,name) : true
    author ? blog_edit.set(`${blogid}.author`,author) : true
    description ? blog_edit.set(`${blogid}.description`,description) : true
    file ?  blog_edit.set(`${blogid}.logo`,saveImage(blogid,file))  : true
    return {done : true, blog: blog_edit.read()[blogid]}
}

function deleteBlog(blogid){
    blog_edit.unset(blogid)
    return {done: true}
}

function getBlogHomepageData(blogid){
    let pathBlogPages = path.join(__dirname,`../articles_json/compose/${blogid}.pages_data.json`)
    let blog_pages_data = editJson(pathBlogPages).read()['homepage']
    return blog_pages_data
}

function getDraftData(blogid,draftid){
    let path_to_draft = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
    let data = editJson(path_to_draft).read()
    return data;
}

function getAllBlogDrafts(blogid){
    let homepage_data = getBlogHomepageData(blogid)
    homepage_data = homepage_data.top.concat(homepage_data.more)
    console.log({homepage_data})
    homepage_data = homepage_data.map(draftid=>{
        return getDraftData(blogid,draftid)
    })
    return homepage_data
}


module.exports = {
    createNewBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    getBlogHomepageData,
    getAllBlogDrafts
}