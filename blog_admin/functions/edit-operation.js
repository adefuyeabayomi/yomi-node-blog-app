const editJson = require("edit-json-file");
const path = require("path");

async function editDraft (fastify,options){
    fastify.get("/edit-draft/",(request,reply)=>{
        let folder = request.query.currentMonth || request.query.folder;
        let id = request.query.id;
        let sid = request.query.sid;
        let type = request.query.type;
        let data;
        if(request.query.data !== undefined){
            data = JSON.parse(request.query.data);  
        }
        
        console.log("folder",folder,"id",id,request.query);
        let draftFilePath = path.join(__dirname,"../draft-data/",folder,"/",id+".json");
        console.log(draftFilePath,data,type);
        let draftFile = editJson(draftFilePath,{
            autosave : true,
        });
        if(type == "addNewSection"){
            draftFile.append("order",sid);
            let newSection = "contents."+sid;
            draftFile.set(newSection,data);            
        }
        if(type == "updateTitle"){
            console.log("updating the title", data.title)
            draftFile.set("title", data.title);
        }
        if(type == "updateCat"){
            console.log("updating category ", data.cat)
            draftFile.set("category", data.cat);
        }
        if(type == "updateTextSection"){
            console.log("updating text paragraph",data.text)
            let paraTarget = "contents."+sid+".content";
            draftFile.set(paraTarget, data.text)
        }
        if(type== "updateListSection"){
            console.log("updating list section, ",data)
            let listTarget = "contents."+sid+".content";
            draftFile.set(listTarget,data.list)
        }
        if (type == "updateContentsAD"){
            let theNewContents = JSON.parse(request.query.theNewContents); 
            let theNewOrder = JSON.parse(request.query.theNewOrder);
            draftFile.set("order",theNewOrder);
            draftFile.set("contents",theNewContents)
            return true;
        }
        if(type == "addNewInPlace"){
            let orderData = JSON.parse(request.query.orderData);
            let data = JSON.parse(request.query.data);
            draftFile.set("contents."+sid,data);
            draftFile.set("order",orderData);
            return true;
        }
        return {
            status : "success",
            data : draftFile.get("contents."+sid)
        }
    })
}
module.exports = editDraft;