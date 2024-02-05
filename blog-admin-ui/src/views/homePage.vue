<template>
    <div id="homepage-area">
        <div class="admin-header m-5">
            <p class="h1 center pt-5 pb-1 px-2" style="font-weight : 900">Blog Admin Interface</p>
            <p class="center p-1">Welcome Back, Manage Your Contents Here Now.</p>
        </div>
        <div class="divider pb-5"></div>
        <div class="container-fluid pb-5">
            <p class="h2 pb-4">Top Management Operations</p>
            <div class="row main-items-row">
                <div class="col">
                    <div class="main-item-container">
                        <div class="mi-image-container">
                            <img src="../assets/DrawKit Vector Illustration Project Manager (3).png">
                        </div>
                        <div>
                            <p class="pt-2">Create new draft article here</p>
                            <vs-button flat block @click="goToInitDraft()">Create New Draft</vs-button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="main-item-container">
                        <div class="mi-image-container">
                            <img src="../assets/DrawKit Vector Illustration Project Manager (18).png">
                        </div>
                        <div>
                            <p class="pt-2">Manage Homepage</p>
                            <vs-button flat block @click="goToManageHome()">Proceed to manage homepage</vs-button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="main-item-container">
                        <div class="mi-image-container">
                            <img src="../assets/DrawKit Vector Illustration Project Manager (17).png">
                        </div>
                        <div>
                            <p class="pt-2">Manage Categories</p>
                            <vs-button flat block @click="goToManageCategories()">Proceed to category section</vs-button>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="main-item-container">
                        <div class="mi-image-container">
                            <img src="../assets/DrawKit Vector Illustration Project Manager (13).png">
                        </div>
                        <div>
                            <p class="pt-2">View Site's Statistics</p>
                            <vs-button flat block>Proceed To Statistics</vs-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider pb-5"></div>
        <div class="search-for-post-container">
            <div class="m-4">
                <p class="h2">Search</p>
                <p>Input related text to search for published posts and drafts.</p>
                <div class="container">
                    <div class="row">
                        <div class="col-3">
                            <vs-button block dark> Search </vs-button>
                        </div>
                        <div class="col-9">
                            <vs-input type="text" block placeholder="Input Keywords Here"></vs-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="statistics-container mt-5 mb-5">
            <div class="statistics-main m-3">
                <p class="h2 pt-3 pb-4">Statistics</p>
                <div>
                    <div class="divider m-2"></div>
                    <p>Total Created : {{number}}</p>
                    <div class="divider m-2"></div>
                    <p>Total Published : {{number}}</p>
                    <div class="divider m-2"></div>
                    <p>Total Unpublished Drafts : {{number}}</p>
                    <div class="divider m-2"></div>
                    <p>Last Time A Post Was Published : {{new Date()}}</p>
                    <div class="divider m-2"></div>
                    <p>Title of latest published post : {{title}}</p>
                    <div class="divider m-2"></div>
                    <p> For real time statistics on customer use of the website, visit your google analytics with <a href="./baller.html">YOUR GOOGLE ANALYTICS LINK</a></p>
                </div>
            </div>
        </div>
        <div class="all-contents-container">
            <div class="ac-container-main">
                <p class="h2 pt-3 pb-4">All Posts</p>
                <p>A list of all the contents created so far</p>
                <div class="divider m-2"></div>
                <div class="sorting-params-container">
                    <p class="bold-font">Sorting Parameters</p>
                    <div class="m-3 p-3 border mx-5">
                        <p>Published Status : <span class="bold-font">({{publishedStatus}})</span></p>
                        <div class="center px-5 py-2">
                            <vs-select block placeholder="Select Your Preferred Published Status : Default is Both published and unpublished." v-model="publishedStatus">
                                <vs-option label="Only Unpublished" value="unpublished">
                                Only Unpublished
                                </vs-option>
                                <vs-option label="Published" value="published">
                                Only Published
                                </vs-option>
                                <vs-option label="Published And Unpublished" value="all">
                                Both Published and Unpublished (All)
                                </vs-option>
                            </vs-select>
                        </div>
                    </div>
                    <div class="m-3 p-3 border mx-5">
                        <p>Category : {{category}}</p>
                        <div class="center px-5 py-2">
                            <vs-select placeholder="Select a category : Default" v-model="category" block>
                                <vs-option label="Car News" value="Car News">
                                Car News
                                </vs-option>
                                <vs-option label="Car Care" value="Car Care">
                                Car Care
                                </vs-option>
                                <vs-option label="Hot New Wheels" value="Hot New Wheels">
                                Hot New Wheels
                                </vs-option>
                                <vs-option label="New and Used Car Research" value="New and Used Car Research">
                                New and Used Car Research
                                </vs-option>
                                <vs-option label="Hot Topics" value="Hot Topics">
                                Hot Topics
                                </vs-option>
                                <vs-option label="Reviews" value="Reviews">
                                Reviews
                                </vs-option>
                                <vs-option label="All Categories" value="all">
                                    All
                                </vs-option>
                            </vs-select>
                        </div>
                    </div>
                </div>
                <div class="divider m-2"></div>
                <div class="content-lists container-fluid">
                    <div class="row">
                        <div class="col-3" v-for="post in modifiedResult" :key="post.id">
                            <div class="content-main p-3 m-3">
                                <div class="mc-main">
                                    <div class="menu-container" @click="updateDisplay(post.id)"><vs-button border color="#51b1ff"><i class="fas fa-ellipsis-v"></i></vs-button></div>
                                </div>
                                <div v-if="menuItem == post.id" class="content-menu-container">
                                    <p class="pointercursor" @click="addCategoryTop(post.id,post.category,post.folder)">Make Top In Category</p>
                                    <div class="divider m-1"></div>
                                    <p class="pointercursor">Delete</p>
                                    <div class="divider m-1"></div>
                                    <p class="pointercursor" @click="goToEditDraft(post.id,post.folder)">Edit This Draft/Post</p>
                                    <div class="divider m-1" v-if="post.published == null"></div>
                                    <p class="pointercursor" @click="publishDraft()" v-if="post.published == null">Publish Draft</p>
                                    <div class="divider m-1" v-if="post.published !== null"></div>
                                    <p class="pointercursor" @click="unpublishDraft()" v-if="post.published !== null">Unpublish Draft</p>
                                    <div class="divider m-1"></div>
                                    <p class="pointercursor" @click="addHomepageTop(post.id,post.category,post.folder)">Add To Homepage Top Trending List</p>
                                </div>
                                <div class="post_image_ill">
                                    <img src="../assets/Instruction for correct pose during office work.jpg">
                                </div>
                                <div>
                                    <p class="content-title">{{post.title}}</p>
                                </div>
                                <div class="mt-2">
                                    <p class="minor-post-details">Published Status : {{published(post.published)}}</p>
                                </div>
                                <div>
                                    <p class="minor-post-details">Created : {{ post.timeCreated }}</p>
                                </div>
                                <div>
                                    <p class="minor-post-details">Category : {{post.category}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {format} from "js-time-ago";
export default {
    data : function () {
        return {
            name : "homePage",
            number : 24,
            title : "An awesome post",
            mainData : {},
            articleData : {},
            allData : [],
            menuItem : "",
            publishedStatus : "published",
            category : "Car News",
        }
    },
    methods : {
        updateDisplay : function (id) {
            if(this.menuItem !== id){
                this.menuItem = id;
            }
            else {
                this.menuItem = "";
            }
        },
        goToEditDraft(id,currentMonth) {
            this.$router.push(
                {
                    path : "/edit-draft",
                    query : {
                        articleID : id,
                        currentMonth,
                    }
                }
            );
        },
        goToInitDraft(){
            this.$router.push("create-new-draft")
        },
        goToManageHome(){
            this.$router.push("manage-homepage");
        },
        goToManageCategories(){
            this.$router.push("manage-category")
        },  
        fetchArticleData(){
            let allPosts = [];
            for(let each of Object.keys(this.mainData)){
                for(let item of Object.keys(this.mainData[each])){
                    allPosts.push(this.mainData[each][item]);
                }
            }
            for(let each of allPosts){
                let id = each.articleID;
                let currentMonth = each.currentMonth;
                let url = "http://localhost/fetch-data/";
                window.axios.get(url,{
                    params : {
                        id,currentMonth,type : "fetchArticleData"
                    }
                }).then( async (response)=>{
                    console.log(response.data.data);
                    this.articleData[id] = response.data.data;
                    let time = await format(this.articleData[id].initialized);
                    console.log("time ", time)
                    response.data.data.timeCreated = time;
                    this.allData.push(response.data.data);
                }).catch(error=>{
                    console.log("Req Error", error)
                })
            }
        },
        published(status){
            if(status !== null){
                return "Published";
            }
            else return "Not Published"
        },
        addCategoryTop(id,category,folder){
            console.log("Adding to the top of the category");
            let url = "http://localhost/other-func/";
            window.axios.get(url,{
                params : {
                    id, category, what : "addToCatTop",folder
                }
            }).
            then(response=>{
                console.log("done, the post is added to top in category", response.data);
                this.$vs.notification({
                    title : "Success",
                    text : "Post added to the top in category successfully."
                })
            })
            .catch(err=>{
                console.log("Err", err);
                this.$vs.notification({
                    title : "Failed",
                    text : "Unable to add to the top in category"
                })
            })
        },
        publishDraft(){

        },
        unpublishDraft(){

        },
        addHomepageTop(id,category,folder){
            console.log("Adding to the top of the homepage");
            let url = "http://localhost/other-func/";
            window.axios.get(url,{
                params : {
                    id, category, what : "makeTopInHome",folder
                }
            }).
            then(response=>{
                console.log("done, the post is added to top in homepage", response.data);
                this.$vs.notification({
                    title : "Success",
                    text : "Post is added to top in homepage successfully."
                })
            })
            .catch(err=>{
                console.log("Err", err);
                this.$vs.notification({
                    title : "Failed",
                    text : "Unable to be added to top in homepagey"
                })
            })
        }
    },  
    computed : {
        modifiedResult : function() {
            let published = this.publishedStatus;
            let category = this.category;
            let result = this.allData;
            // sort out category;
            if(published == "unpublished"){
                result = result.filter(x=> x.published == null);
            }
            else if(published == "published"){
                result = result.filter(x=> x.published !== null)
            }
            if(category !== "all"){
                result = result.filter(x=> x.category === category)
            }
            return result;
        }
    },
    created : function () {

        let url = "http://localhost/fetch-data/"
        window.axios.get(url,{
            params : {
                type : "fetchMainData"
            }
        }).then((response)=>{
            console.log(response.data.data);
            this.mainData = response.data.data;
            this.fetchArticleData();
        }).catch(error=>{
            console.log("Req Error", error)
        })
        // send request to fetch the data
        console.log(this.$route.query.articleID + ".json")
    }
}
</script>
<style lang="scss">

.menu-container {
    width: max-content;
    float : right;
}
.content-menu-container{
    border: 1px solid #bbdefb;
    width: max-content;
    padding: 15px 5px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px #bbdefb;
    background-color: white;
    position: absolute;
    margin-left: 10%;
    margin-top: -5px;
    z-index: 4;
    width: inherit;
    font-size : 80%;
    float : right;
}
.divider {
    border-top : 1px solid rgb(210, 207, 255);
}
.content-main{
    box-shadow: 0px 0px 10px hsl(193deg 81% 87%);
    border-radius : 10px;
}
.content-title {
    font-weight : 600;
    font-size: 90%;
    color : #0060ad;
    text-align: left;
}
.main-items-row > div > div , .search-for-post-container> div, .admin-header,.statistics-main{
    padding : 20px;
    border-radius : 10px;
    box-shadow: 0px 0px 10px hsl(193deg 81% 87%);
    height: 100%;
}
.mi-image-container img {
    width : 100%;
}
.mc-main{
    height : 50px;
}
.post_image_ill{
    width: 70%;
    margin : 0px auto;
}
.post_image_ill img{
    width : 100%;
}
.minor-post-details {
    font-size: 80%;
    color : rgb(164, 164, 164);
    font-weight : 400;
    text-align : left;
}
</style>