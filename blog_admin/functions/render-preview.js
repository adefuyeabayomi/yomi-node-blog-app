let path = require("path");
let editJson = require("edit-json-file");
let interpolate = require("string-interpolation-js").default;
let moment = require("moment")();
let fs = require("fs");

async function renderPreview (fastify,options){
    fastify.get("/render-preview/", (request,reply)=>{
        let id = request.query.id;
        let folder = request.query.folder;
        let pathToDraft = path.join(__dirname,"../draft-data/",folder,"/",id+".json");
        let draftFile = editJson(pathToDraft,{
            autosave : true,
        });
        let data = draftFile.get();
        console.log("draft data",data);
        let pathToPreviewFile = path.join(__dirname,"../../site/preview/", id + ".html");
        let pathToArticleTemp = path.join(__dirname,"../render-assets/preview-render-temp.html");
        let articleTempFile = fs.readFileSync(pathToArticleTemp).toString();
        let pathToImageTemp = path.join(__dirname,"../render-assets/image-temp.html");
        let pathToSubHeadingTemp = path.join(__dirname,"../render-assets/subheading-temp.html");
        let pathToParaTemp = path.join(__dirname,"../render-assets/para-temp.html");
        let listItemTemp = "<li> :listItem </li> \n";
        let pathToListTemp = path.join(__dirname,"../render-assets/list-temp.html");

        let imageSectionTemp = fs.readFileSync(pathToImageTemp).toString();
        let subHeadingSection = fs.readFileSync(pathToSubHeadingTemp).toString();
        let listSection = fs.readFileSync(pathToListTemp).toString();
        let paragraphSection = fs.readFileSync(pathToParaTemp).toString();
        let articleBody = "";
        for(let each of data.order){
            let theContent = data.contents[each];
            let type = theContent.type;
            let compiledSection;

            if(type == "image"){
                console.log("image-content-processing... please wait.");
                let imageLink = "../blog_assets/images/uploads/" + theContent.content.imageFileName + theContent.content.imageFileExtension;
                let imgCredits = theContent.content.credits;
                let interpoleSection = {
                    imageLink,
                    imgCredits
                }
                let section = interpolate(imageSectionTemp,interpoleSection);
                compiledSection = section;
            }

            else if(type == "list"){
                console.log("list-content-processing... please wait.");
                let listBody = "";
                for (let each of theContent.content){
                    let interpolatedListItem = interpolate(listItemTemp,{
                        listItem : each.itemContent
                    });
                    listBody += interpolatedListItem;
                }
                let interpoleSection = {
                    body : listBody
                }
                let section = interpolate(listSection,interpoleSection);
                compiledSection = section;
            }

            else if(type == "paragraph"){
                console.log("paragraph-content-processing... please wait.");
                let interpoleSection = {
                    body : theContent.content
                }
                let section = interpolate(paragraphSection,interpoleSection);
                console.log("section paragraph", section)
                compiledSection = section;
            }

            else if(type == "subheading"){
                console.log("subheading-content-processing... please wait.");
                let interpoleSection = {
                    body : theContent.content
                }
                let section = interpolate(subHeadingSection,interpoleSection);
                console.log("section subheading", section)
                compiledSection = section;
            }

            articleBody = articleBody + compiledSection + "\n"
        }
        let interpolParams = {
            title : data.title,
            category : data.category,
            coverImageLink : "../blog_assets/images/uploads/" + data.coverImageFileName + data.coverImageFileExtension,
            covercredits : data.coverCredits,
            articleBody
        }
        let updated = interpolate(articleTempFile,interpolParams);

        fs.writeFile(pathToPreviewFile,updated,()=>{
            console.log("successfully written file");
        })

        console.log("article Temp File", interpolParams)
        // now the dance begins.
        /**
         * To render an article, divide it into three parts. 
         * The header, the body and the footer.
         * I am only concerned about the body here since where the renders will be is the 
         * same place, the only alter that will happen is the one where am creating preview
         */
        return {
            status : "success",
            previewPath : pathToPreviewFile,
        }
    })
}
module.exports = renderPreview;