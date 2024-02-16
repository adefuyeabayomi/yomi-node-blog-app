const fs = require("fs")
let path = require("path")
let generateID = require("../utils/generateID")
let editJson = require("edit-json-file")

function createNewDraft (blogid,category,title){
    let initialized = Date.now()
    let aid = `${title.replaceAll(" ","_")}_${generateID(5)}`
    let articles_file = path.join(__dirname,`../articles_json/${blogid}/${aid}.json`)
    let all_drafts = path.join(__dirname,`../articles_json/compose/${blogid}.all_drafts.json`)
    let cat_json_ref = editJson(all_drafts, {
        autosave: true
    })
    let draft_json_ref = editJson(articles_file, {
        autosave: true
    })
    let data = cat_json_ref.read()
    let entries = Object.keys(data)
    let entry = 0
    if(entries.length == 0){
        entry = 0
    }
    else {
        entries.forEach(x=>{
            if(data[x].length >= 100){
                entry = Number(x) + 1
            }
            else {
                entry = Number(x)
            }
        })
    }
    entry = String(entry)
    if(!data[entry]){
        cat_json_ref.set(entry,[])
    }
    cat_json_ref.append(entry,aid)

    let props = ['title','category','initialized','published','lastReviewed','coverimage','id','contents','order']
    
    for(let each of props){
        draft_json_ref.set(each,'')
    }
    

    draft_json_ref.set('order',[])
    draft_json_ref.set('contents',{})
    draft_json_ref.set('title',title)
    draft_json_ref.set('category',category)
    draft_json_ref.set('initialized',initialized)
    draft_json_ref.set('id',aid)
    draft_json_ref.set('coverimage',{})

    return {done: true, aid}
}

module.exports = createNewDraft