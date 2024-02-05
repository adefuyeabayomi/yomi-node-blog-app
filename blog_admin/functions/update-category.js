const path = require("path");
const editJson = require("edit-json-file");
const interpolate = require("string-interpolation-js").default;
const fs = require("fs");
const moment = require("moment");
const getRandom = require("../utils/randomArrEle");

async function updateCategory(fastify,options){
    fastify.get("/update-category-home/",(request,reply)=>{
        console.log("updating the category homepage",  request.query);
        // load required parameter
        let category = request.query.category;
        // each category has its own page template load main assets 
        let categoryData; 
        let catTempMain;
        let catFolder;
        let pathToCatHome;

        if(category == "Hot Topics"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-hot-topics.json")).get();
            catTempMain = fs.readFileSync(path.join(__dirname,"../render-assets/hot-topics-mian.html")).toString();
            catFolder = "hot-topics";
            pathToCatHome = path.join(__dirname,"../../site/","hot-topics.html")
        }
        else if(category == "Car News"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-car-news.json")).get();
            catTempMain = fs.readFileSync(path.join(__dirname,"../render-assets/car-news-main.html")).toString();
            catFolder = "car-news";
            pathToCatHome = path.join(__dirname,"../../site/","car-news.html")
        }
        else if(category == "Reviews"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-reviews.json")).get();
            catTempMain = fs.readFileSync(path.join(__dirname,"../render-assets/reviews-main.html")).toString();
            catFolder = "reviews";
            pathToCatHome = path.join(__dirname,"../../site/","reviews.html")
        }
        else if(category == "New and Used Cars Research"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-car-research.json")).get();
            catTempMain = fs.readFileSync(path.join(__dirname,"../render-assets/car-research-main.html")).toString();
            catFolder = "new-and-used-cars-research";
            pathToCatHome = path.join(__dirname,"../../site/","new and used cars research.html")
        }
        else if(category == "Car Care"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-car-care.json")).get();
            catTempMain =  fs.readFileSync(path.join(__dirname,"../render-assets/car-care-main.html")).toString();
            catFolder = "car-care";
            pathToCatHome = path.join(__dirname,"../../site/","car care.html")
        }
        else if(category == "Hot New Wheels"){
            categoryData = editJson(path.join(__dirname,"../draft-data/data-category-hot-new-wheels.json")).get();
            catTempMain = fs.readFileSync(path.join(__dirname,"../render-assets/hot-new-wheels-main.html")).toString();
            catFolder = "hot-new-wheels";
            pathToCatHome = path.join(__dirname,"../../site/","hot new wheels.html")
        }
        let catDataHolder = JSON.stringify(categoryData);
        
        //load other render assets 
        let catTop = fs.readFileSync(path.join(__dirname,"../render-assets/cat-top-temp.html")).toString();
        let catMostRecent = fs.readFileSync(path.join(__dirname,"../render-assets/cat-most-recent.html")).toString() ;
        let catItem = fs.readFileSync(path.join(__dirname,"../render-assets/home-item-temp.html")).toString();
        // render the category top
        let catTop1 = "";
        let catTop2 = "";
        let catTop3 = "";
        let catTop4 = "";
        let counter = 1;
        console.log("catData", categoryData)
        let catTopData = categoryData.topInCat.order;

        for(let each of catTopData){
            let data = categoryData.topInCat.data[each];
            let itemParam = {
                pathToArticle : `./blog_posts/${catFolder}/${data.id}.html`,
                coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                title : data.title,
                firstParagraph : data.firstParagraph,
                category : data.category,
                timePublished : moment(data.published).format("LLLL")
            }
            let itemRender = interpolate(catItem,itemParam);
            if(counter == 1){
                catTop1 = itemRender;
            }
            if(counter == 2){
                catTop2 = itemRender;
            }
            if(counter == 3){
                catTop3 = itemRender;
            }
            if(counter == 4){
                catTop4 = itemRender;
            }
            counter++;
        }
        let catTopParams = {
            catTop1,catTop2,catTop3,catTop4
        }
        let catTopRender = interpolate(catTop,catTopParams);
        // render category most recent
        let mostRecent1 = "";
        let mostRecent2 = "";
        let mostRecent3 = "";
        let mostRecent4 = "";
        let mostRecent5 = "";
        let mostRecent6 = "";
        
        let catMostRecentOrder = categoryData.mostRecent.order;
        let catMostRecentCount = 6;
        if(catMostRecentOrder.length < 6){
            catMostRecentCount = catMostRecentOrder.length;
        }
        let catMostRecentSorted = getRandom(catMostRecentOrder,catMostRecentCount);
        counter = 1;
        for(let each of catMostRecentSorted){
            let data = categoryData.mostRecent.data[each];
            let itemParam = {
                pathToArticle : `./blog_posts/${catFolder}/${data.id}.html`,
                coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                title : data.title,
                firstParagraph : data.firstParagraph,
                category : data.category,
                timePublished : moment(data.published).format("LLLL")
            }
            let itemRender = interpolate(catItem,itemParam);
            if(counter == 1){
                mostRecent1 = itemRender;
            }
            if(counter == 2){
                mostRecent2 = itemRender;
            }
            if(counter == 3){
                mostRecent3 = itemRender;
            }
            if(counter == 4){
                mostRecent4 = itemRender;
            }
            if(counter == 5){
                mostRecent5 = itemRender;
            }
            if(counter == 6){
                mostRecent6 = itemRender;
            }
            counter++;
        }
        let mostRecentParams = {
            mostRecent1,mostRecent2,mostRecent3,mostRecent4,mostRecent5,mostRecent6
        }
        console.log("most recent params ", mostRecentParams,catMostRecentOrder,catMostRecentCount,catMostRecentSorted)
        let mostRecentRender = interpolate(catMostRecent,mostRecentParams);
        // render category 
        let catParams = {
            catTop : catTopRender ,
            catMostRecent : mostRecentRender,
            catDataHolder
        }
        let catHomeRender = interpolate(catTempMain,catParams); 
        // write to file
        fs.writeFile(pathToCatHome,catHomeRender,(err)=>{
            if(err) throw err;
            console.log("written file successfully")
        })
        // define all the necessary data.
        return {
            status : "sucess",
            catHomePath : pathToCatHome
        }
    })
}

module.exports = updateCategory;