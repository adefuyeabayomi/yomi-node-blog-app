const path = require("path");
const editJson = require("edit-json-file");
const interpolate = require("string-interpolation-js").default;
const fs = require("fs");
const moment = require("moment");
const getRandom = require("../utils/randomArrEle");

async function updateHomepage(fastify,options){
    fastify.get("/update-homepage/",(request,reply)=>{
        console.log("updating the homepage");
        // load category and homepage data;
        let carCareData = editJson(path.join(__dirname,"../draft-data/data-category-car-care.json")).get();
        let carNewsData = editJson(path.join(__dirname,"../draft-data/data-category-car-news.json")).get();
        let carResearchData = editJson(path.join(__dirname,"../draft-data/data-category-car-research.json")).get();
        let hotNewWheelsData = editJson(path.join(__dirname,"../draft-data/data-category-hot-new-wheels.json")).get();
        let hotTopicsData = editJson(path.join(__dirname,"../draft-data/data-category-hot-topics.json")).get();
        let reviewsData = editJson(path.join(__dirname,"../draft-data/data-category-reviews.json")).get();
        let homeData = editJson(path.join(__dirname,"../draft-data/data-homepage.json")).get();
        //load the required templates
        let homePageTemp = fs.readFileSync(path.join(__dirname,"../render-assets/homepage-main.html")).toString();
        let homeItemTemp = fs.readFileSync(path.join(__dirname,"../render-assets/home-item-temp.html")).toString();
        let homeCategory = fs.readFileSync(path.join(__dirname,"../render-assets/home-category.html")).toString();
        
        // to update the homepage successfully, first you have to update the top section
        let topPosts1 = "";
        let topPosts2 = "";
        let topPosts3 = "";
        let topPosts4 = "";
        let topPosts5 = "";
        let topPosts6 = "";
        console.log("home data", homeData)
        let homeTopData = homeData.topTrending.order;
        let counter = 1;
        if(homeTopData.length > 0){
            for(let each of homeTopData){
                let data = homeData.topTrending.data[each];
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
                let dataObj = {
                    pathToArticle : `./blog_posts/${category}/${data.id}.html`,
                    coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                    title : data.title,
                    firstParagraph : data.firstParagraph,
                    category : data.category,
                    timePublished : moment(data.published).format("LLLL")
                }
                if (counter == 1){
                    topPosts1 = interpolate(homeItemTemp,dataObj);
                }
                if (counter == 2){
                    topPosts2 = interpolate(homeItemTemp,dataObj);
                }
                if (counter == 3){
                    topPosts3 = interpolate(homeItemTemp,dataObj);
                }
                if (counter == 4){
                    topPosts4 = interpolate(homeItemTemp,dataObj);
                }
                if (counter == 5){
                    topPosts5 = interpolate(homeItemTemp,dataObj);
                }
                if (counter == 6){
                    topPosts6 = interpolate(homeItemTemp,dataObj);
                }
                counter++;
            }
        }
        console.log({topPosts1,topPosts2,topPosts3,topPosts4,topPosts5,topPosts6})
        
        // then update the recent section,
        let recentOrder = homeData.latests.order;
        let mostRecent1 = "";
        let mostRecent2 = "";
        let mostRecent3 = "";
        let mostRecent4 = "";
        let mostRecent5 = "";
        counter = 0;
        if(recentOrder.length>0){
            for(let each of recentOrder){
                let data = homeData.latests.data[each];
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
                let dataObj = {
                    pathToArticle : `./blog_posts/${category}/${data.id}.html`,
                    coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                    title : data.title,
                    firstParagraph : data.firstParagraph,
                    category : data.category,
                    timePublished : moment(data.published).format("LLLL")
                } 
                if (counter == 1){
                    mostRecent1 = interpolate(homeItemTemp,dataObj);
                }
                if (counter == 2){
                    mostRecent2 = interpolate(homeItemTemp,dataObj);
                }
                if (counter == 3){
                    mostRecent3 = interpolate(homeItemTemp,dataObj);
                }
                if (counter == 4){
                    mostRecent4 = interpolate(homeItemTemp,dataObj);
                }
                if (counter == 5){
                    mostRecent5 = interpolate(homeItemTemp,dataObj);
                }
                counter++;
            }
        }

        // then render each categories section,
        //category one is car news 
        let category1 = "";
        let topCarNewsOrder = carNewsData.topInCat.order;
        let category1Params = [];
        let catSection1Title = "Top Posts In Car News Category";
        category1Params.push(catSection1Title);
        let category;
        for(let each of topCarNewsOrder){
            let data = carNewsData.topInCat.data[each];
            console.log("car news data", carNewsData.topInCat, topCarNewsOrder)
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
            let dataObj = {
                pathToArticle : `./blog_posts/${category}/${data.id}.html`,
                coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                title : data.title,
                firstParagraph : data.firstParagraph,
                category : data.category,
                timePublished : moment(data.published).format("LLLL")
            }
            category1Params.push(interpolate(homeItemTemp,dataObj));
        }
        category1 = interpolate(homeCategory,category1Params);
        //category one is hot new wheels
        let category2 = "";
        let topHotNewWheelsOrder = hotNewWheelsData.topInCat.order;
        let category2Params = [];
        let catSection2Title = "Top In Hot New Wheels Category";
        category2Params.push(catSection2Title);
        for(let each of topHotNewWheelsOrder){
            let data = hotNewWheelsData.topInCat.data[each];
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
            let dataObj = {
                pathToArticle : `./blog_posts/${category}/${data.id}.html`,
                coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                title : data.title,
                firstParagraph : data.firstParagraph,
                category : data.category,
                timePublished : moment(data.published).format("LLLL")
            }
            category2Params.push(interpolate(homeItemTemp,dataObj));
        }
        category2 = interpolate(homeCategory,category2Params);
        //category one is hot topics
        let category3 = "";
        let topHotTopicsOrder = hotTopicsData.topInCat.order;
        let category3Params = [];
        let catSection3Title = "Hot Topics, Find Top In This Category";
        category3Params.push(catSection3Title);
        for(let each of topHotTopicsOrder){
            let data = hotTopicsData.topInCat.data[each];
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
            let dataObj = {
                pathToArticle : `./blog_posts/${category}/${data.id}.html`,
                coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                title : data.title,
                firstParagraph : data.firstParagraph,
                category : data.category,
                timePublished : moment(data.published).format("LLLL")
            }
            category3Params.push(interpolate(homeItemTemp,dataObj));
        }
        category3 = interpolate(homeCategory,category3Params);
        //category one is reviews
        let category4 = "";
        let topReviewsOrder = reviewsData.topInCat.order;
        let category4Params = [];
        let catSection4Title = "Top Car Reviews Posts";
        category4Params.push(catSection4Title);
        for(let each of topReviewsOrder){
            let data = reviewsData.topInCat.data[each];
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
            let dataObj = {
                pathToArticle : `./blog_posts/${category}/${data.id}.html`,
                coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                title : data.title,
                firstParagraph : data.firstParagraph,
                category : data.category,
                timePublished : moment(data.published).format("LLLL")
            }
            console.log("review data obj",dataObj)
            category4Params.push(interpolate(homeItemTemp,dataObj));
        }
        category4 = interpolate(homeCategory,category4Params);
        console.log("cat review data", category4);
        //category one is new and used car research
        let category5 = "";
        let topCarResearchOrder = carResearchData.topInCat.order;
        let category5Params = [];
        let catSection5Title = "New and Used Car Research. Find Posts in this Category";
        category5Params.push(catSection5Title);
        for(let each of topCarResearchOrder){
            let data = carResearchData.topInCat.data[each];
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
            let dataObj = {
                pathToArticle : `./blog_posts/${category}/${data.id}.html`,
                coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                title : data.title,
                firstParagraph : data.firstParagraph,
                category : data.category,
                timePublished : moment(data.published).format("LLLL")
            }
            category5Params.push(interpolate(homeItemTemp,dataObj));
        }
        category5 = interpolate(homeCategory,category5Params);
        //category one is car care
        let category6 = "";
        let topCarCareOrder = carCareData.topInCat.order;
        let category6Params = [];
        let catSection6Title = "Top In Car Care Category";
        category6Params.push(catSection6Title);
        for(let each of topCarCareOrder){
            let data = carCareData.topInCat.data[each];
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
            let dataObj = {
                pathToArticle : `./blog_posts/${category}/${data.id}.html`,
                coverUrl : `./blog_assets/images/uploads/${data.coverImageFileName}${data.coverImageFileExtension}`,
                title : data.title,
                firstParagraph : data.firstParagraph,
                category : data.category,
                timePublished : moment(data.published).format("LLLL")
            }
            category6Params.push(interpolate(homeItemTemp,dataObj));
        }
        category6 = interpolate(homeCategory,category6Params);

        let homeInterPoleParams = {
            topPosts1,
            topPosts2,
            topPosts3,
            topPosts4,
            topPosts5,
            topPosts6,
            mostRecent1,
            mostRecent2,
            mostRecent3,
            mostRecent4,
            mostRecent5,
            category1,
            category2,
            category3,
            category4,
            category5,
            category6
        }
        
        let homeUpdate = interpolate(homePageTemp,homeInterPoleParams);
        
        console.log("home interpole params")
        fs.writeFile(path.join(__dirname,"../../site/index.html"),homeUpdate.toString(),(err)=>{
            if(err) throw err;
            console.log("successfully updated the homepage")
        })

        return {
            status : "sucess",
            homeLink : path.join(__dirname,"../../site/index.html")
        }
    })
}

module.exports = updateHomepage;