const fs = require("fs");
let moment = require("moment")();
let path = require("path");
let generateID = require("../utils/generateID");
let editJson = require("edit-json-file");

async function createDraft (fastify,options){
    fastify.post("/create-draft/", (request,reply)=>{
        let coverImageFileName;
        let coverImageFileExtension;
        if(request.body.type == "updateCoverInfo"){
            let credits = request.body.credits;
            let folder = request.body.folder;
            let articleID = request.body.id;
            let pathToFolder = `${path.join(__dirname,"../draft-data/"+folder)}`;
            let draftFile = editJson(pathToFolder + "/" + articleID + ".json",{
                autosave : true
            });
            draftFile.set("coverCredits",credits);
            console.log("type is update coverImage", pathToFolder);
            let file = request.body.file;
            if(file !== "undefined"){
                coverImageFileName = path.parse(request.body.file.name).name + generateID();
                coverImageFileExtension = path.parse(request.body.file.name).ext;
                console.log(path.parse(request.body.file.name).name,path.parse(request.body.file.name).ext)

                fs.writeFile("../site/blog_assets/images/uploads/"+coverImageFileName+coverImageFileExtension,file.data,()=>{
                    console.log("image successfully written to the file system.")
                    draftFile.set("coverImageFileName",coverImageFileName);
                    draftFile.set("coverImageFileExtension",coverImageFileExtension);
                })
            }
            return {
                status : "success",
                coverImageFileExtension,
                coverImageFileName,
                credits
            };
        }
        else if(request.body.type == "updatePostImage"){
            console.log("request.body", request.body);
            let sid = request.body.sid;
            let folder = request.body.folder;
            let articleID = request.body.id;
            let credits = request.body.credits;
            let imageFileName;
            let imageFileExtension;
            let file = request.body.file;
            let pathToFolder = `${path.join(__dirname,"../draft-data/"+folder)}`;
            let draftFile = editJson(pathToFolder + "/" + articleID + ".json",{
                autosave : true
            });
            let creditsTarget = "contents." + sid + ".content.credits";
            credits == "" ? true : draftFile.set(creditsTarget,credits);
            if(file !== "undefined"){
                imageFileName = path.parse(request.body.file.name).name + generateID();
                imageFileExtension = path.parse(request.body.file.name).ext;
                let fileNameTarget = "contents." + sid + ".content.imageFileName";
                let fileExtTarget = "contents." + sid + ".content.imageFileExtension";
                draftFile.set(fileNameTarget,imageFileName);
                draftFile.set(fileExtTarget,imageFileExtension);
                fs.writeFile("../site/blog_assets/images/uploads/"+imageFileName+imageFileExtension,file.data,()=>{
                    console.log("image successfully written to the file system.")
                })
            }
            return {
                status : "success",
                data : draftFile.get("contents."+sid)
            };
        }
        let correctFolder = `${moment.format("MMMM")}${moment.format("YYYY")}`;
        console.log("correct folder : ",correctFolder);
        let pathToFolder = `${path.join(__dirname,"../draft-data/"+correctFolder)}`;
        let folderExist = fs.existsSync(pathToFolder);
        console.log("path to folder : ", pathToFolder , "folder exists : ", folderExist);
        // check
        if(!folderExist){
            fs.mkdirSync(pathToFolder, (error)=>{
                if(error){
                    console.log("Unable to create the directory");
                }
                else {
                    console.log("create the directory successfully");
                }
            })
        }

        if(request.body.noFile == "true"){
            coverImageFileName = "unset_image" + generateID();
            coverImageFileExtension = "nofile"
        }
        else {
            coverImageFileName = path.parse(request.body.file.name).name + generateID();
            coverImageFileExtension = path.parse(request.body.file.name).ext;
            console.log(path.parse(request.body.file.name).name,path.parse(request.body.file.name).ext)
        }
        
        let articleID = generateID(40);
        let draftFile = editJson(pathToFolder + "/" + articleID + ".json");
        draftFile.set("title",request.body.title);
        draftFile.set("category",request.body.category);
        draftFile.set("initialized",Date.now());
        draftFile.set("published",null);
        draftFile.set("lastReviewed",null);
        draftFile.set("coverCredits",request.body.credits)
        draftFile.set("coverImageFileName",coverImageFileName);
        draftFile.set("coverImageFileExtension",coverImageFileExtension);
        draftFile.set("id",articleID);
        draftFile.set("contents",{});
        draftFile.set("order",[]);
        draftFile.set("folder",correctFolder);
        draftFile.save();

        if(request.body.noFile == "false"){
            // save the image to uploads folder
            let file = request.body.file;
            fs.writeFile("../site/blog_assets/images/uploads/"+coverImageFileName+coverImageFileExtension,file.data,()=>{
                console.log("image successfully written to the file system.")
            })
        }

        let pathToMainData = path.join(__dirname,"../draft-data/data-main.json");
        let mainDataFile = editJson(pathToMainData,{
            autosave : true
        });

        let currentMonth = `${moment.format("MMMM")}${moment.format("YYYY")}`;
        let currentMonthData = mainDataFile.get(currentMonth);
        if(true){
            mainDataFile.set(currentMonth+"."+articleID,{articleID,currentMonth,published: false});
        }
        return {
            status : "sucess",
            articleID,
            currentMonth
        }
    })
}
module.exports = createDraft;