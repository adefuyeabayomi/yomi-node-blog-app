const path = require("path");
const editJson = require("edit-json-file");
const http = require("http");
async function unpublishPost(fastify,options){
    fastify.get("/unpublish-post/",(request,reply)=>{
        // to unpublish the post, you must remove it from the home data and the category data. lol.
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
        
        let draftFile = editJson(pathToDraft,{autosave : true});
        draftFile.set("published", null);
        let articleData = draftFile.get();

        // open the json path.
        let dataMain = editJson(pathToDataMain, {autosave : true});
        let dataHome = editJson(pathToHomeData,{autosave : true});
        let dataCategory ;

        let category;
        if(articleData.category == "Hot Topics"){
            dataCategory = editJson(pathToCategoryHotTopics,{autosave : true});
            category = "hot-topics";
        }
        else if(articleData.category == "Car News"){
            dataCategory = editJson(pathToCategoryCarNews,{autosave : true});
            category = "car-news";
        }
        else if(articleData.category == "Reviews"){
            dataCategory = editJson(pathToCategoryReviews,{autosave : true});
            category = "reviews";
        }
        else if(articleData.category == "New and Used Cars Research"){
            dataCategory = editJson(pathToCategoryCarResearch,{autosave : true});
            category = "new-and-used-cars-research";
        }
        else if(articleData.category == "Car Care"){
            dataCategory = editJson(pathToCategoryCarCare,{autosave : true});
            category = "car-care";
        }
        else if(articleData.category == "Hot New Wheels"){
            dataCategory = editJson(pathToCategoryHotNewWheels,{autosave : true});
            category = "hot-new-wheels";
        }
        // update the publishedStatus in the data main to false
        dataMain.set(`${folder}.${id}.published`,false);

        // update the data for the home page
        let homeTrendingOrder = dataHome.get("topTrending.order");
        let homeLatestOrder = dataHome.get("latests.order");

        if(homeTrendingOrder.includes(id)){
            homeTrendingOrder.splice(homeTrendingOrder.indexOf(id),1);
            dataHome.set("topTrending.order",homeTrendingOrder);
            dataHome.set("topTrending.data."+id,null);
        }
        if(homeLatestOrder.includes(id)){
            homeLatestOrder.splice(homeLatestOrder.indexOf(id),1);
            dataHome.set("latests.order",homeLatestOrder);
            dataHome.set("latests.data."+id,null);
        }
        // update the data for the category 
        let catTop = dataCategory.get("topInCat.order");
        let catMostRecent = dataCategory.get("mostRecent.order");
        let catOtherRecent = dataCategory.get("otherRecent.order");
        let catAll = dataCategory.get("all.order");

        if(catTop.includes(id)){
            catTop.splice(catTop.indexOf(id),1);
            dataCategory.set("topInCat.order",catTop);
            dataCategory.set("topInCat.data."+id,null);
        }
        if(catMostRecent.includes(id)){
            catMostRecent.splice(catMostRecent.indexOf(id),1);
            dataCategory.set("mostRecent.order",catMostRecent);
            dataCategory.set("mostRecent.data."+id,null);
        }
        if(catOtherRecent.includes(id)){
            catOtherRecent.splice(catOtherRecent.indexOf(id),1);
            dataCategory.set("otherRecent.order",catOtherRecent);
            dataCategory.set("otherRecent.data."+id,null);
        }
        if(catAll.includes(id)){
            catAll.splice(catAll.indexOf(id),1);
            dataCategory.set("all.order",catAll);
            dataCategory.set("all.data."+id,null);
        }
        // send update home request
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
        let req2Options = {
            port : "80",
            host : "localhost",
            method : "GET",
            path : "/update-category-home/?category="+category
        }
        let req2 = http.request(req2Options);
        req2.end();
        req2.on("response",(response)=>{
            console.log("response from category update request", response.body)
        })
        req2.on("error",(err)=>{
            console.log("error in category update request")
            throw err;
        })
        // send update category request

        console.log("unpublishing post");
        return {
            status : "sucess",
        }
    })
}

module.exports = unpublishPost;