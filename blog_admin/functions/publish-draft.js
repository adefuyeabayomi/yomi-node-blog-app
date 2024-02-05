const path = require("path");
const editJson = require("edit-json-file");
const interpolate = require("string-interpolation-js").default;
const getRandom = require("../utils/randomArrEle");
const http = require("http");
const fs = require("fs");
const moment = require("moment");
// files i'll be dealing homepage and the categories page data files
async function publishDraft(fastify,options){
    fastify.get("/publish-draft/", (request,reply)=>{
        // required request params
        let id = request.query.id;
        let folder = request.query.folder;

        // path to necessary details, homepage data, category data,
        let pathToDataMain = path.join(__dirname,"../draft-data/data-main.json");
        let pathToHomeData = path.join(__dirname,"../draft-data/data-homepage.json");
        let pathToCategoryCarCare = path.join(__dirname,"../draft-data/data-category-car-care.json");
        let pathToCategoryCarNews = path.join(__dirname,"../draft-data/data-category-car-news.json");
        let pathToCategoryCarResearch = path.join(__dirname,"../draft-data/data-category-car-research.json");
        let pathToCategoryHotNewWheels = path.join(__dirname,"../draft-data/data-category-category-hot-new-wheels.json");
        let pathToCategoryHotTopics = path.join(__dirname,"../draft-data/data-category-hot-topics.json");
        let pathToCategoryReviews = path.join(__dirname,"../draft-data/data-category-reviews.json");
        let pathToDraft = path.join(__dirname,"../draft-data/",folder,"/",id+".json");


        // open the json path.
        let dataMain = editJson(pathToDataMain, {autosave : true});
        let dataHome = editJson(pathToHomeData,{autosave : true});
        let dataCatCarCare = editJson(pathToCategoryCarCare,{autosave : true});
        let dataCatCarNews = editJson(pathToCategoryCarNews,{autosave : true});
        let dataCatCarResearch = editJson(pathToCategoryCarResearch,{autosave : true});
        let dataCatHotNewWheels = editJson(pathToCategoryHotNewWheels,{autosave : true});
        let dataCatHotTopics = editJson(pathToCategoryHotTopics,{autosave : true});
        let dataCatReviews = editJson(pathToCategoryReviews,{autosave : true});
        let draftFile = editJson(pathToDraft,{autosave : true});
        //load the article data
        let data = draftFile.get();

        //define folder
        let category;
        if(data.category == "Hot Topics"){
            category = "hot-topics";
        }
        else if(data.category == "Car News"){
            category = "car-news";
        }
        else if(data.category == "Reviews"){
            category = "reviews";
        }
        else if(data.category == "New and Used Cars Research"){
            category = "new-and-used-cars-research";
        }
        else if(data.category == "Car Care"){
            category = "car-care";
        }
        else if(data.category == "Hot New Wheels"){
            category = "hot-new-wheels";
        }
        let pathToRenderedFile = path.join(__dirname,"../../site/blog_post/"+ category + "/", id + ".html");
        //fetch all the render assets
        let pathToArticleTemp = path.join(__dirname,"../render-assets/article-temp.html");        
        let pathToImageTemp = path.join(__dirname,"../render-assets/image-temp.html");
        let pathToSubHeadingTemp = path.join(__dirname,"../render-assets/subheading-temp.html");
        let pathToParaTemp = path.join(__dirname,"../render-assets/para-temp.html");
        let listItemTemp = "<li> :listItem </li> \n";
        let pathToListTemp = path.join(__dirname,"../render-assets/list-temp.html");
        let pathToCatTemp = path.join(__dirname,"../render-assets/more-in-cat-temp.html");
        let pathToMoreCatItem = path.join(__dirname,"../render-assets/more-cat-item.html");
        //load all the render assets.
        let imageSectionTemp = fs.readFileSync(pathToImageTemp).toString();
        let subHeadingSection = fs.readFileSync(pathToSubHeadingTemp).toString();
        let listSection = fs.readFileSync(pathToListTemp).toString();
        let paragraphSection = fs.readFileSync(pathToParaTemp).toString();
        let moreInCat = fs.readFileSync(pathToCatTemp).toString();        
        let articleTempFile = fs.readFileSync(pathToArticleTemp).toString();
        let moreCatItem = fs.readFileSync(pathToMoreCatItem).toString();
        console.log("more cat temp", moreCatItem)


        //render the article body

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

        // article body rendered, now onto the render of the category section.
        let categoryData;
        let categoryJSON;
        let homeData = dataHome.get();
        // home data has the MOST RECENT and TOP TRENDING SECTION. On Publish, the most recent is the only one that gets updated and the homePage is then re-rendered based off of this.
        if(data.category == "Hot Topics"){
            categoryData = dataCatHotTopics.get();
            categoryJSON = dataCatHotTopics;
        }
        else if(data.category == "Car News"){
            categoryData = dataCatCarNews.get();
            categoryJSON = dataCatCarNews;
        }
        else if(data.category == "Reviews"){
            categoryData = dataCatReviews.get();
            categoryJSON = dataCatReviews;
        }
        else if(data.category == "New and Used Cars Research"){
            categoryData = dataCatCarResearch.get();
            categoryJSON = dataCatCarResearch;
        }
        else if(data.category == "Car Care"){
            categoryData = dataCatCarCare.get();
            categoryJSON = dataCatCarCare;
        }
        else if(data.category == "Hot New Wheels"){
            categoryData = dataCatHotNewWheels.get();
            categoryJSON = dataCatHotNewWheels;
        }
        // to render the category section, you need the data from the most recent 15 which you then select 4 from.
        console.log("category data", categoryData, category)
        let mostRecent15 = categoryData.mostRecent15.order;
        let mostRecent15Data = categoryData.mostRecent15.data;
        let mostRecent15Count = mostRecent15.length;
        let moreInCatAmount = 0;
        let moreInCatArr = [];
        console.log("most Recent 15 Count",mostRecent15Count);
        
        // get a unique set of arrays for more in this section that will be rendered to categoryBody section.

        if(mostRecent15Count == 0){
            // do nothing.
        }
        else if(mostRecent15Count <= 4 && mostRecent15Count > 0) {
            moreInCatAmount = mostRecent15Count;
        }
        else {
            moreInCatAmount = 4;
        }
        console.log("moreInCatAmount",moreInCatAmount);
        moreInCatArr = getRandom(mostRecent15,moreInCatAmount);
        console.log("moreInCatArr",moreInCatArr);
        let noMoreInCat = moreInCatArr.length == 0 ? "d-none" : "";
        // compile the category body
        let compiledCatItems = "";

        let categoryBody = "";

        for(let each of moreInCatArr){
            let data = mostRecent15Data[each];
            console.log("most recent data",data)
            let pathToEachDraft = path.join(__dirname,"../draft-data/" + data.folder + "/" + data.id + ".json");
            console.log("path to each draft = ", pathToEachDraft);
/*            let eachDraftFile = editJson(pathToEachDraft).get();
            let firstParaInEach= ""; 
            for(let each of eachDraftFile.order){
                if(eachDraftFile.contents[each].type == "paragraph"){
                    firstParaInEach = eachDraftFile.contents[each].content;
                    break;
                }
            }*/
            let interpoleParams = {
                title : data.title,
                firstDraftPara : data.firstParagraph,
                category : data.category,
                timeCreated : moment(data.published).format("LLLL"),
                coverUrl : "../../blog_assets/images/uploads/" + data.coverImageFileName + data.coverImageFileExtension 
            }
            console.log("interpol data", interpoleParams)
            let catItemData = mostRecent15Data[each];
            let itemInterpole = interpolate(moreCatItem,interpoleParams);
            console.log("catItemData", catItemData, "itemInterPole", itemInterpole);
            categoryBody = categoryBody + itemInterpole + "\n";
        }
        console.log("categoryBody",categoryBody)

        let interpolParams = {
            title : data.title,
            category : data.category,
            coverImageLink : "../blog_assets/images/uploads/" + data.coverImageFileName + data.coverImageFileExtension,
            covercredits : data.coverCredits,
            articleBody,
            categoryBody,
            noMoreInCat,
        }

        let updatedMain = interpolate(articleTempFile,interpolParams);
        fs.writeFile(pathToRenderedFile,updatedMain,()=>{
            console.log("successfully written file");
        })
        // articleBody rendered successfully
        // now update the data main that this post is finally published;
        dataMain.set(folder + "." + id + ".published", true );

        // updateTheCategoryData
        let newDataJSON6 = categoryJSON.get("mostRecent6.order");
        let newDataJSON15 = categoryJSON.get("mostRecent15.order");
        let removed6;
        let removed15;
        if(newDataJSON6.length > 6){
            newDataJSON6.unshift(id)
        }
        else {
            newDataJSON6.unshift(id);
            removed6 = newDataJSON6.pop();
        }
        if(newDataJSON15.length > 15){
            newDataJSON15.unshift(id);
        }
        else {
            newDataJSON15.unshift(id);
            removed15 = newDataJSON6.pop();
        }
        categoryJSON.set("mostRecent6.order",newDataJSON6);
        categoryJSON.set("mostRecent15.order",newDataJSON15);
        categoryJSON.set("mostRecent6.data."+removed6,null);
        categoryJSON.set("mostRecent15.data."+removed15,null);
        let aFpara;
        for(let each of data.order){
            if(data.contents[each].type == "paragraph"){
                aFpara = data.contents[each].content;
                break;
            }
        }
        let dataForArticle = {
            // published, publish time, created time, updated time, cover image details , title, category
            title : data.title,
            firstParagraph : aFpara,
            published : data.published || Date.now(),
            lastUpdated : Date.now(),
            created : data.initialized,
            coverImageFileExtension : data.coverImageFileExtension,
            coverImageFileName : data.coverImageFileName,
            category : data.category,
            folder,
            id,
        }
        if(!draftFile.published){
            draftFile.set("published",Date.now())
        }
        console.log("req.query", request.query, id,folder,dataForArticle);
        draftFile.set("lastUpdated",Date.now())
        categoryJSON.set("mostRecent6.data."+id,dataForArticle);
        categoryJSON.set("mostRecent15.data."+id,dataForArticle);
        categoryJSON.set("all.data."+id,dataForArticle);
        let allOrder = categoryJSON.get("all.order");
        allOrder.unshift(id);
        categoryJSON.set("all.order",allOrder);
        // data updated

        return {
            status : "success",
            renderedPath : pathToRenderedFile,
        }
    })
}

module.exports = publishDraft;
