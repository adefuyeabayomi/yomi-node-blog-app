<template>
    <div id="manage-homepage-area" class="p-3 pt-1">
        <div class="header-area fine-shadow center">
            <p class="h1 pb-1 bold-font">Manage Categories</p>
            <p>Make changes to the categories here</p>
        </div>
        <div class="select-category fine-shadow">
            <p class="slight-weight pb-4">Category Being Edited Currently :<span class="bold-font"> {{category}} Category</span></p>
            <vs-select placeholder="Select a category to perform management tasks on" v-model="category" block>
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
            </vs-select>
        </div>
        <div class="render-homepage-section fine-shadow">
            <p class="slight-weight p-3 pb-1"> Re-render Category Homepage</p>
            <p class="ninety-font p-2 mb-2">Re rendering the category homepage will make sure any changes made will be applied on the page.</p>
            <vs-button block success flat class="no-margin" @click="reRenderCategory()">Render</vs-button>
        </div>
        <vs-dialog v-model="renderResponseModal">
            <div class="render-response">
                <p class="slight-weight p-3">Render Successful</p>
                <p> {{category}} category Homepage up to date now.</p>
                <vs-button warn flat @click="copyCatLink()" block>Copy Category Homepage Link</vs-button>
            </div>
        </vs-dialog>
    </div>
</template>

<script>
export default {
    data : function () {
        return {
            category : "",
            renderResponseModal  : false,
            categoryData : {},
            homeLink : "",
        }
    },
    methods : {
        reRenderCategory(){
            if(this.category == ""){
                this.$vs.notification({
                    title : "You did not select any category. To proceed select a category to work with.",
                })
                return;
            }
            console.log("re rendering homepage");
            let url = "http://localhost/update-category-home/";
            window.axios.get(url,{
                params : {
                    category : this.category
                }
            })
            .then(response=>{
                console.log("Re rendered the category homepage", response.data);
                this.renderResponseModal = true;
                this.homeLink = response.data.homeLink;
            })
            .catch(err=>{
                console.log("unable to render the category homepage now", err);
            })
        },
        copyCatLink(){
            navigator.clipboard.writeText(this.homeLink);
            this.$vs.notification({
                title : "Link copied success",
                text: this.category + " Category Home Link Copied. Paste in the url bar of your browser to preview",
                color: "#98c2ff",
            });
            this.renderResponseModal = false;
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
    },
    created : function () {
        this.fetchAllCategoryData();
    }
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