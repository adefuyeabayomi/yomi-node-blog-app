<template>
    <div id="create-draft-area">
        <div class="header-area m-4 center">
            <h2 class="text-h2">Create New Blog Post</h2>
            <p>Fill the necessary details before you can proceed.</p>
            <p>Blog id: {{ blogid }}, Category : {{ category }}</p>
        </div>
        <div class="draft-details m-4">
            <div>
                <p class="text-subheading-bold">Input a Title (Required)</p>
                <div class="mt-1">
                    <vs-input v-model="title" placeholder="Enter Title Here" block active></vs-input>
                </div>
            </div>
        </div>
        <div class="draft-details m-4">
            <div class="p-3">
                <div class="pt-1">
                    <vs-button block flat dark @click="sendCreateRequest()" > Create Draft </vs-button>
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
import { createNew, managePage } from "../utils/requests"
export default {
    data : function () {
        return {
            title : "",
            activeWarning : false,
        }
    },
    
    computed : {
        blogid (){
            return this.$route.params.blogid
        },
        category(){
            return this.$route.params.category
        }
    },
    methods : {
        goToEditDraft(id) {
            this.$router.push(
                {
                    path : `/${this.blogid}/${this.category}/edit-draft/${id}`,
                }
            )
        },
        async sendCreateRequest () {
            if(this.title.length == 0){
                this.activeWarning = true;
                return
            }
            let loader= this.$vs.loading({
                type : "circles",
                text : "please wait, your article is being created"
            })
            let data = {
                title: this.title,
                category: this.category
            }
            createNew(this.blogid,data).then(res=>{
                let blogid = this.blogid
                let category = this.category
                this.goToEditDraft(res.data.aid)
                loader.close()
                managePage(blogid,{
                    draftid: res.data.aid, type: 'add', page: 'homepage'
                }).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.error(err)
                })

                managePage(blogid,{
                    draftid: res.data.aid, type: 'add', page: category
                }).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.error(err)
                })

            }).
            catch((err)=>{
                console.log("error", err)
                loader.close()
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
.draft-details{
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
    width: 100%;
    margin: 0px auto;
    flex-wrap: wrap;
    justify-content: center;
}

</style>

