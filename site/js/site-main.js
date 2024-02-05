function getCat (category) {
    let catTxt = "";
    if(category == "Hot Topics"){
        catTxt = "cat-hot-topics";
    }
    else if(category == "Car News"){
        catTxt = "cat-car-news";
    }
    else if(category == "Reviews"){
        catTxt = "cat-reviews";
    }
    else if(category == "New and Used Cars Research"){
        catTxt = "cat-car-research";
    }
    else if(category == "Car Care"){
        catTxt = "cat-car-care";
    }
    else if(category == "Hot New Wheels"){
        catTxt = "cat-hot-new-wheels";
    }
    return catTxt + ".js";
}

console.log("cat path", getCat(category));

let app = new Vue({
    el : "#app",
    data : {
        ham : "",
        animateClass : "animate__animated animate__slideOutRight",
        catData : catData
    },
    computed : {
        guest : function (){
            return window.localStorage.getItem("username") || "Guest User";
        },
        catJSPath : function () {
            let carPath = getCat(this.category);
            console.log("car path", carPath);
            return carPath;
        },
        allData : function () {
            let result = [];
            for(let each of this.catData.all.order){
                result.push(this.catData.all.data[each]);
            }
            console.log("all data", result);
            return result;
        }
    },
    methods : {
        updateHam : function () {
            if(this.ham == ""){
                this.ham = "yt-ham-active";
                this.animateClass = "animate__animated animate__slideInRight";
            }
            else {
                this.ham = "";
                this.animateClass = "animate__animated animate__slideOutRight"
            }
        },
        getTime : function (timestamp){
            let data = moment(timestamp).format("LLLL");
            console.log("date", data);
            return data;
        }
    },
    created : function () {
        setTimeout(()=>{
            document.getElementsByClassName("blog-menu-container")[0].style.opacity = 1;
        }, 2000);
        console.log("cat data",this.catData, this.allData);
    }
})