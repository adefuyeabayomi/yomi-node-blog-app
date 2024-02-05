const path = require("path");
const editJson = require("edit-json-file");
const interpolate = require("string-interpolation-js").default;
const getRandom = require("../utils/randomArrEle");
const http = require("http");
const fs = require("fs");
const moment = require("moment");

async function publishDraft (fastify,options){
    fastify.get("/publish-draft/",(request,reply)=>{
        // required request params
        let id = request.query.id;
        let folder = request.query.folder;

        //load the article data for general information on the article and work to be done on the article
        let pathToDraft = path.join(__dirname,"../draft-data/",folder,"/",id+".json");        
        let draftFile = editJson(pathToDraft,{autosave : true});
        let articleData = draftFile.get();

        //updateLastReviewed in the article data
        draftFile.set("lastReviewed",Date.now());
        if(draftFile.get("published") == null){
            draftFile.set("published", Date.now())
        }

        // get published Status of the draft
        let articlePublished = articleData.published !== null;

        // update data main
        let pathToDataMain = path.join(__dirname,"../draft-data/data-main.json");
        let dataMain = editJson(pathToDataMain, {autosave : true});
        let dataMainPublished = `${folder}.${id}.published`;
        dataMain.set(dataMainPublished,true);
        
        // define the data that will be set in the homepage and the category
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
        console.log("data for article to be saved **************************************************** *******************************************************",dataForArticle);

        //update homepage data. latests section update only;
        let pathToHomeData = path.join(__dirname,"../draft-data/data-homepage.json");
        let dataHome = editJson(pathToHomeData,{autosave : true});
        let dataHomeOrder = `latests.order`;
        let homeOrder = dataHome.get(dataHomeOrder);
        if(!homeOrder.includes(id)){
            homeOrder.push(id);
        }
        let dataHomeData = `latests.data.${id}`;
        dataHome.set(dataHomeOrder,homeOrder);
        dataHome.set(dataHomeData,dataForArticle); // success

        // update the category most recent;
        let pathToCategoryCarCare = path.join(__dirname,"../draft-data/data-category-car-care.json");
        let pathToCategoryCarNews = path.join(__dirname,"../draft-data/data-category-car-news.json");
        let pathToCategoryCarResearch = path.join(__dirname,"../draft-data/data-category-car-research.json");
        let pathToCategoryHotNewWheels = path.join(__dirname,"../draft-data/data-category-hot-new-wheels.json");
        let pathToCategoryHotTopics = path.join(__dirname,"../draft-data/data-category-hot-topics.json");
        let pathToCategoryReviews = path.join(__dirname,"../draft-data/data-category-reviews.json");

        let dataCategory ;
        let category;
        let categoryJS;
        let catJSTemp = fs.readFileSync(path.join(__dirname,"../render-assets/catJS.txt")).toString()
        if(articleData.category == "Hot Topics"){
            dataCategory = editJson(pathToCategoryHotTopics,{autosave : true});
            categoryJS = path.join(__dirname,`../../site/js/cat-hot-topics.js`);
            category = "hot-topics";
        }
        else if(articleData.category == "Car News"){
            dataCategory = editJson(pathToCategoryCarNews,{autosave : true});
            categoryJS = path.join(__dirname,`../../site/js/cat-car-news.js`);
            category = "car-news";
        }
        else if(articleData.category == "Reviews"){
            dataCategory = editJson(pathToCategoryReviews,{autosave : true});
            categoryJS = path.join(__dirname,`../../site/js/cat-reviews.js`);
            category = "reviews";
        }
        else if(articleData.category == "New and Used Cars Research"){
            dataCategory = editJson(pathToCategoryCarResearch,{autosave : true});
            categoryJS = path.join(__dirname,`../../site/js/cat-car-research.js`);
            category = "new-and-used-cars-research";
        }
        else if(articleData.category == "Car Care"){
            dataCategory = editJson(pathToCategoryCarCare,{autosave : true});
            categoryJS = path.join(__dirname,`../../site/js/cat-car-care.js`);
            category = "car-care";
        }
        else if(articleData.category == "Hot New Wheels"){
            dataCategory = editJson(pathToCategoryHotNewWheels,{autosave : true});
            categoryJS = path.join(__dirname,`../../site/js/cat-hot-new-wheels.js`);
            category = "hot-new-wheels";
        }
        let catJsFile = interpolate(catJSTemp,{catJSON : JSON.stringify(dataCategory.get())})
        fs.writeFile(categoryJS, catJsFile, (err)=>{
            if(err) throw err;
            console.log("successfully written js file");
        })

        // update the category most recent
        let dataCatMostRecentOrder = `mostRecent.order`;
        let dataCatMostRecentData = `mostRecent.data`;
        let catMROrder = dataCategory.get(dataCatMostRecentOrder);

        if(!catMROrder.includes(id)){
            catMROrder.unshift(id);            
            if(catMROrder.length > 6){
                catMROrder.pop();
            }
        }
        dataCategory.set(dataCatMostRecentOrder,catMROrder);
        dataCategory.set(`${dataCatMostRecentData}.${id}`,dataForArticle)

        // update the category other recent
        let dataCatOtherRecentOrder = `otherRecent.order`;
        let dataCatOtherRecentData = `otherRecent.data`;
        let catOROrder = dataCategory.get(dataCatOtherRecentOrder);

        if(!catOROrder.includes(id)){
            catOROrder.unshift(id);
            if(catOROrder.length > 15){
                catOROrder.pop();
            }
        }
        dataCategory.set(dataCatOtherRecentOrder,catOROrder);
        dataCategory.set(`${dataCatOtherRecentData}.${id}`, dataForArticle);
        
        // update the category all
        let dataCatAllOrder = `all.order`;
        let dataCatAllData =   `all.data`;
        let catAllOrder = dataCategory.get(dataCatAllOrder);
        if(!catAllOrder.includes(id)){
            dataCategory.append(dataCatAllOrder,id);
        }
        dataCategory.set(`${dataCatAllData}.${id}`,dataForArticle);

        // category data and homepage data all set

        // render category section for the article
        let pathToCatTemp = path.join(__dirname,"../render-assets/more-in-cat-temp.html");
        let moreInCat = fs.readFileSync(pathToCatTemp).toString();   
        let pathToMoreCatItem = path.join(__dirname,"../render-assets/more-cat-item.html");
        let moreCatItem = fs.readFileSync(pathToMoreCatItem).toString();

        // render the items first. load the categoryData to see what i can find and then work with the data present
        //
        let dataInCatOther_order =  dataCategory.get(dataCatOtherRecentOrder);
        console.log("data cat order", dataInCatOther_order)
        let dataInCatOther_data =  dataCategory.get(dataCatOtherRecentData);
        let catOrderSortedCount = 0;
        let catOrderSorted = [];
        if(dataInCatOther_order.indexOf(id) !== -1){
            dataInCatOther_order.splice(dataInCatOther_order.indexOf(id),1)
        }
        catOrderSorted = dataInCatOther_order
        
        if(dataInCatOther_order.length == 0){
            catOrderSortedCount = 0;
        }
        else if(dataInCatOther_order.length > 0 && dataInCatOther_order.length < 4){
            catOrderSortedCount = dataInCatOther_order.length;
        }
        else {
            catOrderSortedCount = 4;
        }
        console.log("sorted *******++=++++++++__+44444444444444444444444444444$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4",catOrderSortedCount,catOrderSorted,dataInCatOther_order)
        catOrderSorted = getRandom(catOrderSorted,catOrderSortedCount);
        console.log("cat order sorted count", catOrderSortedCount, catOrderSorted);

        // update interpole cat temp params nomoreincat

        let moreCatItemsRendered = "";
        let categoryBodyTempRendered = "";

        for(let each of catOrderSorted){
            let eachData = dataInCatOther_data[each];
            let interpoleCatItemParams = {
                coverUrl : "../../blog_assets/images/uploads/" + eachData.coverImageFileName + eachData.coverImageFileExtension,
                title : eachData.title,
                firstDraftPara : eachData.firstParagraph,
                category : eachData.category,
                timeCreated : moment(eachData.published).format("LLLL")
            };
            let catItemRendered = interpolate(moreCatItem,interpoleCatItemParams);
            moreCatItemsRendered = moreCatItemsRendered + catItemRendered + "\n";
        }
        //console.log("more cat items redered", moreCatItemsRendered);

        let interpoleCatTempParams = {
            noMoreInCat : catOrderSorted.length > 0 ? "" : "d-none",
            categoryItemsBody : moreCatItemsRendered,
        };

        categoryBodyTempRendered = interpolate(moreInCat,interpoleCatTempParams);
        //console.log("category body rendered", categoryBodyTempRendered);

        // render article body
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
        for (let each of articleData.order){
            let theContent = articleData.contents[each];
            let type = theContent.type;
            let compiledSection;
            if(type == "image"){
                console.log("image-content-processing... please wait.");
                let imageLink = "../../blog_assets/images/uploads/" + theContent.content.imageFileName + theContent.content.imageFileExtension;
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
                compiledSection = section;
            }

            else if(type == "subheading"){
                console.log("subheading-content-processing... please wait.");
                let interpoleSection = {
                    body : theContent.content
                }
                let section = interpolate(subHeadingSection,interpoleSection);
                compiledSection = section;
            }

            articleBody = articleBody + compiledSection + "\n"
        }

        // compile article and write article to file
        let articleMainIntParams = {
            title : articleData.title,
            category : articleData.category,
            coverImageLink : "../../blog_assets/images/uploads/" + articleData.coverImageFileName + articleData.coverImageFileExtension,
            covercredits : articleData.coverCredits,
            articleBody,
            moreInCategory : categoryBodyTempRendered,
            timePublished : moment(draftFile.get().published).format("LLLL")
        }
        //console.log("article main interpolate params", articleMainIntParams)
        // render article 

        let pathToArticleTemp = path.join(__dirname,"../render-assets/article-temp.html");    
        let articleTempFile = fs.readFileSync(pathToArticleTemp).toString();
        
        let articleRender = interpolate(articleTempFile,articleMainIntParams);
        // write to file

        let pathToRenderedFile = path.join(__dirname,"../../site/blog_posts/"+ category + "/", id + ".html");
        console.log("pathToRenderedFile",pathToRenderedFile)
        fs.writeFile(pathToRenderedFile,articleRender,(err)=>{
            if(err){
                throw err;
            }
            console.log("article rendered successfully", pathToRenderedFile)
        })

        // send request to update the homepage
        let req1Options = {
            port : "80",
            host : "localhost",
            method : "GET",
            path : "/update-homepage/"
        }
        let req1 = http.request(req1Options);
        req1.end();
        req1.on("response",(response)=>{
            console.log("response from home update request", response.body)
        })
        req1.on("error",(err)=>{
            console.log("error in home update request")
            throw err;
        })
        // send request to update the category landing page
        let articleCat = articleData.category.split(" ").join("_");
        let req2Options = {
            port : "80",
            host : "localhost",
            method : "GET",
            path : "/update-category-home/?category_mod="+articleCat
        }
        console.log("req path options", req1Options,articleCat)
        let req2 = http.request(req2Options);
        req2.end();
        req2.on("response",(response)=>{
            console.log("response from category update request", response.body)
        })
        req2.on("error",(err)=>{
            console.log("error in category update request")
            throw err;
        })
        // send response to front-end. the work is done.
        return {
            status : "success",
            renderedPath : pathToRenderedFile,
        }
    })
}
module.exports = publishDraft;