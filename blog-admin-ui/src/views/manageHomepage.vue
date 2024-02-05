<template>
    <div id="manage-homepage-area" class="p-5 pt-1">
        <div class="header-area fine-shadow center">
            <p class="h1 pt-3 pb-1 bold-font">Manage Homepage</p>
            <p>Make changes to the blog's homepage here</p>
        </div>
        <div class="render-homepage-section fine-shadow">
            <p class="slight-weight p-3 pb-1"> Re-render the homepage</p>
            <p class="ninety-font p-2 mb-2">Re rendering the homepage will make sure any changes made will be applied on the homepage.</p>
            <vs-button block success flat class="no-margin" @click="reRenderHomepage()">Render</vs-button>
        </div>
        <vs-dialog v-model="renderResponseModal">
            <div class="render-response">
                <p class="slight-weight p-3">Render Successful</p>
                <p>Homepage up to date now.</p>
                <vs-button warn flat @click="copyHomeLink()" block>Copy Homepage Link</vs-button>
            </div>
        </vs-dialog>
        <div class="manage-top-trending fine-shadow">
            <p class="slight-weight p-3 pb-1"> Manage Top Posts Section On the homepage</p>
            <p class="ninety-font p-2 mb-2">The top trending section of the homepage contains six posts that are all located on the landing section of the homepage. Manage which posts are going to be part of the top post section.</p>
            <p class="px-3 slight-weight">All posts in the top posts section</p>
        </div>
        <div class="manage-top-trending fine-shadow">
            <p class="slight-weight p-3 pb-1">Add post to the top posts from all the published posts</p>
        </div>
    </div>
</template>

<script>
export default {
    data : function () {
        return {
            renderResponseModal : false,
            homeLink : "",
            homepageData : {},
            categoryData : {}
        }
    },
    methods : {
        fetchHomepageData () {
            console.log("fetching homepage data");
            let url = "http://localhost/fetch-data/";
            window.axios.get(url,{
                params : {
                    type : "fetchHomepageData"
                }
            })
            .then(response=>{
                console.log("response from the hompage data req," ,response.data);
                this.homepageData = response.data.homepageData;
            })
            .catch(err=>{
                console.log("unable to fetch, An error occured", err)
            })
        },
        fetchAllCategoryData () {
            
            console.log("fetching homepage data");
            let url = "http://localhost/fetch-data/";
            window.axios.get(url,{
                params : {
                    type : "fetchAllCategoryData"
                }
            })
            .then(response=>{
                console.log("response from the category data req," ,response.data);
                this.categoryData = response.data.categoryData;
            })
            .catch(err=>{
                console.log("unable to fetch, An error occured", err)
            })
            
        },
        reRenderHomepage(){
            console.log("re rendering homepage");
            let url = "http://localhost/update-homepage/";
            window.axios.get(url,{})
            .then(response=>{
                console.log("Re rendered the homepage", response.data);
                this.renderResponseModal = true;
                this.homeLink = response.data.homeLink;
            })
            .catch(err=>{
                console.log("unable to render the homepage now", err);
            })
        },
        copyHomeLink(){
            navigator.clipboard.writeText(this.homeLink);
            this.$vs.notification({
                title : "Link copied success",
                text: "Home Link Copied. Paste in the url bar of your browser to preview",
                color: "#98c2ff",
            });
            this.renderResponseModal = false;
        }
    },  
    created : function () {
        this.fetchHomepageData();
        this.fetchAllCategoryData();
    },

}
</script>

<style lang="scss">

.fine-shadow{
    padding : 20px;
    border-radius : 10px;
    box-shadow: 0px 0px 10px hsl(193deg 81% 87%);
    height: 100%;
    margin-top: 30px;
}
.slight-weight {
    font-weight: 600;
    font-size: 90%;
}
.ninety-font{
    font-size: 90%;
}
</style>