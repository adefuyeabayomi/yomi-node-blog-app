let path = require("path")
let fs = require("fs")
let editJson = require("edit-json-file")
let {blog_json_file} = require("../utils/resRef")
let blog_edit = editJson(blog_json_file,{
    autosave: true
})

function updateCategory (blogid,catName){
    let data_path = path.join(__dirname,`../articles_json/compose/${blogid}.pages_data.json`)
    let data_json = editJson(data_path,{
        autosave: true
    })
    let blog = blog_edit.read()[blogid]
    if(!blog.categories.includes(catName)){
        blog_edit.append(`${blogid}.categories`,catName)
        data_json.set(catName, {top: [], more: []})
        data_json.save()
    return {done: true}
    }
    else {
        return {done: true, status: 'category already exists'}
    }
}

module.exports = {
    updateCategory
}