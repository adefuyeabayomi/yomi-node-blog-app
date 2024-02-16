const path = require("path");
const editJson = require("edit-json-file");

const manage_page = async (request,reply) => {
    let {draftid,type,page} = request.body
    let {blogid} = request.params
    console.log({blogid,draftid,type,page})
    let data_path = path.join(__dirname,`../articles_json/compose/${blogid}.pages_data.json`)
    let path_to_cat_data = path.join(__dirname,`../articles_json/compose/${blogid}.all_drafts.json`)
    let cat_data_json = editJson(path_to_cat_data)
    let page_data_json = editJson(data_path,{
        autosave: true
    })
    let page_data = page_data_json.read()
    if(!page_data[page]){
        page_data_json.set(page,{})
        page_data_json.set(`${page}.top`,[])
        page_data_json.set(`${page}.more`,[])
        page_data = page_data_json.read()
    }
    let top_ref = page_data[page]['top']
    let more_ref = page_data[page]['more']
    if(type == 'add'){
        more_ref.unshift(draftid)
        page_data_json.set(`${page}.more`,more_ref)
    }
    else if(type == 'moveToTop'){
        // remove the draft from more
        more_ref = more_ref.filter(x=> x!== draftid)
        page_data_json.set(`${page}.more`,more_ref)

        if(page == 'homepage'){
            if(top_ref.length < 6){
                top_ref.unshift(draftid);
                page_data_json.set(`${page}.top`,top_ref)
            }

            else {
                let removed_from_top = top_ref.pop()
                top_ref.unshift(draftid)
                page_data_json.set(`${page}.top`,top_ref)
                more_ref.unshift(removed_from_top)
                page_data_json.set(`${page}.more`,more_ref)
            }
        }
        else{
            if(top_ref.length < 4){
                top_ref.unshift(draftid);
                page_data_json.set(`${page}.top`,top_ref)
            }

            else {
                let removed_from_top = top_ref.pop()
                top_ref.unshift(draftid)
                page_data_json.set(`${page}.top`,top_ref)
                more_ref.unshift(removed_from_top)
                page_data_json.set(`${page}.more`,more_ref)
            }            
        }


    }

    else if(type == 'delete'){
        top_ref = top_ref.filter(x=> x !== draftid)
        more_ref = more_ref.filter(x=> x !== draftid)
        page_data_json.set(`${page}.more`,more_ref)
        page_data_json.set(`${page}.top`,top_ref)
        // delete from all cat data
        let cat_data = cat_data_json.read()
        for(let each of Object.keys(cat_data)){
            if(cat_data[each].includes(draftid)){
                let updated = cat_data[each].filter(x=> x !== draftid)
                cat_data_json.set(each,updated)
            }
        }
    }
    reply.code(200)
    return {message: "update successful", type}
}

module.exports = manage_page