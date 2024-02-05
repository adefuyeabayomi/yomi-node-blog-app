const fs = require("fs");
const path = require("path");
const editJson = require("edit-json-file");
async function serveData(fastify,options){
    fastify.get("/fetch-data/",(request,response)=>{
        let id = request.query.id;
        let type = request.query.type;
        let currentMonth = request.query.currentMonth;
        let category = request.query.category;
        console.log("type",type)
        if(type == "fetchArticleData"){
            let draftFilePath = path.join(__dirname,`../draft-data/${currentMonth}/${id}.json`);
            console.log("filepath to draft data : ", draftFilePath)
            let draftFile = editJson(draftFilePath,{
                autosave : true,
            }); 
            let draftData = draftFile.get();  
            return {
                status : "success",
                data : draftData,
            };                  
        }
        else if(type == "fetchMainData"){
            let mainData;
            let mainDataPath = path.join(__dirname,"../draft-data/data-main.json");
            let mainDataFile = editJson(mainDataPath);
            mainData = mainDataFile.get();
            return {
                status : "success",
                data : mainData,
            }
        }
        else if(type == "fetchHomepageData"){
            let homepageData;
            let pathToHomeData = path.join(__dirname,"../draft-data/data-homepage.json");
            let homeData = editJson(pathToHomeData,{autosave : true});
            homepageData = homeData.get();
            console.log("homepage Data : ", homepageData)
            return {
                status : "success",
                homepageData
            }
        }
        else if(type == "fetchAllCategoryData" || "fetchCategoryData"){
            let carCareData = editJson(path.join(__dirname,"../draft-data/data-category-car-care.json")).get();
            let carNewsData = editJson(path.join(__dirname,"../draft-data/data-category-car-news.json")).get();
            let carResearchData = editJson(path.join(__dirname,"../draft-data/data-category-car-research.json")).get();
            let hotNewWheelsData = editJson(path.join(__dirname,"../draft-data/data-category-hot-new-wheels.json")).get();
            let hotTopicsData = editJson(path.join(__dirname,"../draft-data/data-category-hot-topics.json")).get();
            let reviewsData = editJson(path.join(__dirname,"../draft-data/data-category-reviews.json")).get();
            if(type == "fetchAllCategoryData"){
                return {
                    status : "success",
                    categoryData : {
                        carCareData,carNewsData,carResearchData,hotNewWheelsData,hotTopicsData,reviewsData
                    }
                }
            }
            else if(category == "Hot Topics"){
                return {
                    status : "success",
                    categoryData : hotTopicsData
                }
            }
            else if(category == "Car News"){
                return {
                    status : "success",
                    categoryData : carNewsData
                }
            }
            else if(category == "Reviews"){
                return {
                    status : "success",
                    categoryData : reviewsData
                }
            }
            else if(category == "New and Used Cars Research"){
                return {
                    status : "success",
                    categoryData : carResearchData
                }
            }
            else if(category == "Car Care"){
                return {
                    status : "success",
                    categoryData : carCareData
                }
            }
            else if(category == "Hot New Wheels"){
                return {
                    status : "success",
                    categoryData : hotNewWheelsData
                }
            }
        }
        return true;
    })
}
module.exports = serveData;