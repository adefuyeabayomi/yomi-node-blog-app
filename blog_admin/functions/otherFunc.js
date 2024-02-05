const path = require("path");
const editJson = require("edit-json-file");
const interpolate = require("string-interpolation-js").default;
const fs = require("fs");
const moment = require("moment");
const getRandom = require("../utils/randomArrEle");

async function otherFunctionalities (fastify,options){
    fastify.get("/other-func/", (request,reply)=>{
        let id = request.query.id;
        let category = request.query.category;
        let what = request.query.what;
        let folder = request.query.folder;
        let categoryData;
        if(category == "Hot Topics"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-hot-topics.json"),{autosave : true});
        }
        else if(category == "Car News"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-car-news.json"),{autosave : true});
        }
        else if(category == "Reviews"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-reviews.json"),{autosave : true});
        }
        else if(category == "New and Used Cars Research"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-car-research.json"),{autosave : true});
        }
        else if(category == "Car Care"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-car-care.json"),{autosave : true});
        }
        else if(category == "Hot New Wheels"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-hot-new-wheels.json"),{autosave : true});
        }
        let pathToDraft = path.join(__dirname,"../draft-data/",folder,"/",id+".json");        
        let draftFile = editJson(pathToDraft,{autosave : true});
        let articleData = draftFile.get();
        console.log("req query", request.query)
        if(what == "addToCatTop"){
            let dataForArticle = {
                // published, publish time, created time, updated time, cover image details , title, category
                title : articleData.title,
                firstParagraph : "",
                published : articleData.published || Date.now(),
                lastUpdated : Date.now(),
                created : articleData.initialized,
                coverImageFileExtension : articleData.coverImageFileExtension,
                coverImageFileName : articleData.coverImageFileName,
                category : articleData.category,
                folder,
                id,
            }
            for(let each of articleData.order){
                if(articleData.contents[each].type == "paragraph"){
                    dataForArticle.firstParagraph = articleData.contents[each].content;
                    break;
                }
            }
            console.log("dataForArticle", dataForArticle);
            let catOrder = categoryData.get().topInCat.order;
            // set the data prop
            categoryData.set(`topInCat.data.${id}`,dataForArticle);
            if(!catOrder.includes(id)){
                catOrder.unshift(id);
            }
            let removed = "";
            if(catOrder.lenth>4){
                removed = catOrder.pop();
                // removeData
            }
            if(removed !== ""){
                categoryData.set(`topInCat.data.${id}`,null);
            }
            categoryData.set(`topInCat.order`,catOrder)
            console.log("catOrder", catOrder)
            return {
                sucess : "done",
                catTop : categoryData.get().topInCat
            }
        }
        if(what == "makeTopInHome"){
            //update homepage data. latests section update only;
            let pathToHomeData = path.join(__dirname,"../draft-data/data-homepage.json");
            let dataHome = editJson(pathToHomeData,{autosave : true});
            let dataHomeFetched = dataHome.get();
            let dataForArticle = {
                // published, publish time, created time, updated time, cover image details , title, category
                title : articleData.title,
                firstParagraph : "",
                published : articleData.published || Date.now(),
                lastUpdated : Date.now(),
                created : articleData.initialized,
                coverImageFileExtension : articleData.coverImageFileExtension,
                coverImageFileName : articleData.coverImageFileName,
                category : articleData.category,
                folder,
                id,
            }
            for(let each of articleData.order){
                if(articleData.contents[each].type == "paragraph"){
                    dataForArticle.firstParagraph = articleData.contents[each].content;
                    break;
                }
            }
            let homeTopOrder = dataHomeFetched.topTrending.order;
            dataHome.set(`topTrending.data.${id}`,dataForArticle);
            if(!homeTopOrder.includes(id)){
                homeTopOrder.unshift(id);
            }
            let removed = "";
            if(homeTopOrder.lenth>4){
                removed = catOrder.pop();
                // removeData
            }
            if(removed !== ""){
                dataHome.set(`topInCat.data.${id}`,null);
            }
            dataHome.set(`topInCat.order`,homeTopOrder)
            console.log("catOrder", homeTopOrder);
            return {
                status : "success"
            }
        }
    })
}
module.exports = otherFunctionalities;