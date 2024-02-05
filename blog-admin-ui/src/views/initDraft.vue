<template>
    <div id="create-draft-area">
        <div class="header-area m-4 center">
            <p class="h1 pt-3 pb-1 bold-font">Create New Draft</p>
            <p>Fill the necessary details before you can proceed.</p>
        </div>
        <div class="draft-details m-4">
            <div>
                <p class="h4">Select the category ({{category}})</p>
                <div class="category-options-container">
                    <vs-radio v-model="category" val="Hot Topics">Hot Topics</vs-radio>
                    
                    <vs-radio v-model="category" val="Car News">Car News</vs-radio>
                    
                    <vs-radio v-model="category" val="Reviews">Reviews</vs-radio>
                    
                    <vs-radio v-model="category" val="New and Used Cars Research">New and Used Cars Research</vs-radio>
                    
                    <vs-radio v-model="category" val="Car Care">Car Care</vs-radio>
                    
                    <vs-radio v-model="category" val="Hot New Wheels">Hot New Wheels</vs-radio>
                </div>
            </div>
        </div>
        <div class="draft-details m-4">
            <div>
                <p class="h4">Input a Title (Required)</p>
                <div class="">
                    <vs-input v-model="title" placeholder="Enter Title Here" block active></vs-input>
                </div>
            </div>
        </div>
        <div class="draft-details m-4">
            <div>
                <p class="h4">Upload The Cover Photo (Optional)</p>
                <div class="cover-photo-container">
                    <form enctype="multipart/form-data" id="cover-input">
                        <input class="file-input-cover" accept="image/*" type="file" >                           
                    </form>
                </div>
                <p class="pt-4">Input the credits for the cover image you want to use, if you don't have it now, you can always come back to add it in the future during the editing process.
                </p>
                <div class="">
                    <vs-input v-model="credits" placeholder="Enter Photo Credits Here" block active></vs-input>
                </div>
            </div>
        </div>
        <div class="draft-details m-4">
            <div class="p-3">
                <p class="h4">Proceed To Create Draft.</p>
                <div class="pt-1">
                    <vs-button block success @click="sendCreateRequest()" > Create Draft </vs-button>
                </div>
            </div>
        </div>
        <vs-dialog v-model="activeWarning">
            <div class="pt-4 center">
                <p>You did not input anything in the title. Input some text to proceed</p>
            </div>
        </vs-dialog>
    </div>
</template>

<script>
export default {
    data : function () {
        return {
            category : "Hot Topics",
            title : "",
            credits : "",
            activeWarning : false,
        }
    },
    methods : {
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
        async sendCreateRequest () {

            let fileInput = document.getElementsByClassName("file-input-cover")[0];
            let noFile = false;
            if(fileInput.files.length == 0){
                noFile = true;
            }
            noFile;
            console.log("no file :", noFile);

            if(this.title.length == 0){
                this.activeWarning = true;
                return;
            }
            let loader= this.$vs.loading({
                type : "circles",
                text : "please wait while your article is being initialized."
            })
            let url = "http://localhost/create-draft/";
            let myEle = document.getElementById("cover-input");
            let file = await myEle.firstChild.files[0];
            let formData = new FormData();
            formData.append("file",file)
            formData.append("noFile",noFile);
            formData.append("title",this.title);
            formData.append("category", this.category);
            formData.append("credits",this.credits)
            console.log(formData)
            window.axios.post(url,formData,{
                headers : {
                    "Content-Type" : "multipart/form"
                }
            }).then(res=>{
                console.log("response", res.data.articleID);
                this.goToEditDraft(res.data.articleID,res.data.currentMonth);
                loader.close();
            }).
            catch((err)=>{
                console.log("error", err);
                loader.close();
            })
        }
    }
}
</script>

<style lang="scss">
.file-input-cover {
    padding: 10px;
    border: 1px solid #bbdefb;
    width: max-content;
    border-radius: 10px;
}
.header-area, .draft-details{
    padding : 20px;
    border-radius : 10px;
    box-shadow: 0px 0px 10px hsl(193deg 81% 87%);
    height: 100%;
}
.category-options-container > div{
    width : max-content;
    padding : 5px 15px;
}
.category-options-container {
    display : flex;
    width: max-content;
    margin: 0px auto;
}
</style>

