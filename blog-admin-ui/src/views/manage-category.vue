<template>
    <div>
        <div class="m-2 pt-5 text-center">
            <h1 class="text-h3">Yomi's Node.js Blog App</h1>
            <h4 class="text-subheading-regular">Manage Your Category</h4>
            <p class="text-body-regular">Here you can create new drafts, edit top posts in category and more</p>
        </div>
        
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="box-style-1 manage-item-box mt-3">
                    <div class=" text-center center">
                        <p class="text-center text-h1"><i class="fas fa-file-alt"></i></p>
                        <h5 class="text-subheading-bold">Create New Blog Post</h5>
                        <div class="box-button-container pt-3">
                            <vs-button block flat dark @click="goToCreateDraft()">Create New Post</vs-button>
                        </div>
                    </div>
                </div>
                <div class="box-style-1 manage-item-box mt-3">
                    <div class=" text-center center">
                        <p class="text-center text-h1"><i class="fas fa-eye"></i></p>
                        <h5 class="text-subheading-bold">View Category Page</h5>
                        <div class="box-button-container pt-3">
                            <vs-button block warn flat @click="renderCategoryReq()"> Copy Link </vs-button>
                        </div>
                    </div>
                </div>
                <div class="box-style-1 manage-item-box mt-3">
                    <div class=" text-center center">
                        <p class="text-center text-h1"><i class="fas fa-cloud-download-alt"></i></p>
                        <h5 class="text-subheading-bold">Apply Saved Changes</h5>
                        <p v-if="false">This is necessary to make sure that edits made to a post reflect in the blog site.</p>
                        <div class="box-button-container pt-3">
                            <vs-button block flat color="#9203bb"> Apply Changes</vs-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="offset-top-5">
            <h5 class="text-subheading-bold text-center">* Top Posts * For {{ this.category }} Category</h5>
            <p class="text-center">Sort Method: Most Recently added appears first </p>
        </div>
        <div class="text-center text-body-bold offset-top-4" v-if="topDrafts.length==0"><i>No Post Added to Top Yet</i></div>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div v-for="draft in topDrafts" :key="draft.id" class="col-12 col-sm-6 col-md-4">
                    <div class="content-main p-2 m-2">
                        <div class="mc-main">
                            <div class="menu-container"><vs-button border color="#51b1ff" @click="openPostMenu(draft.id)"><i class="fas fa-ellipsis-v"></i></vs-button></div>
                        </div>
                        <div v-if="menuItem == draft.id" class="content-menu-container">
                            <p class="pointercursor" @click="deleteDraft(draft.id)">Delete</p>
                            <div class="divider m-1" v-if="draft.published == (null || '')"></div>
                            <p class="pointercursor" @click="publishDraft(draft.id)" v-if="draft.published == ''">Publish Draft</p>
                            <div class="divider m-1" v-if="draft.published !== null"></div>
                            <p class="pointercursor" @click="unpublishDraft(draft.id)" v-if="draft.published !== ''">Unpublish Draft</p>
                            <div class="divider m-1"></div>
                            <p class="pointercursor" @click="renderArticleReq(draft.id)">Render Article</p>
                        </div>
                        <div class="post_image_ill">
                            <img src="../assets/Instruction for correct pose during office work.jpg">
                        </div>
                        <div>
                            <p class="content-title">{{draft.title}}</p>
                        </div>
                        <div class="mt-2">
                            <p class="minor-post-details">Published Status: {{draft.published || 'Not yet published'}}</p>
                        </div>
                        <div>
                            <p class="minor-post-details">Created : {{ draft.timeCreated }}</p>
                        </div>
                        <div>
                            <p class="minor-post-details">Category : {{draft.category}}</p>
                        </div>
                        <div class="offset-top-2">
                            <vs-button primary flat block @click="goToEditDraft(draft.id)">Edit This Post</vs-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="offset-top-5">
            <h5 class="text-subheading-bold text-center">* Other Posts * For {{ this.category }} Category</h5>
        </div>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div v-for="draft in moreDrafts" :key="draft.id" class="col-12 col-sm-6 col-md-4">
                    <div class="content-main p-2 m-2">
                        <div class="mc-main">
                            <div class="menu-container"><vs-button border color="#51b1ff" @click="openPostMenu(draft.id,draft)"><i class="fas fa-ellipsis-v"></i></vs-button></div>
                        </div>
                        <div v-if="menuItem == draft.id" class="content-menu-container">
                            <p class="pointercursor" @click="addCategoryTop(draft.id)">Make Top In Category</p>
                            <div class="divider m-1"></div>
                            <p class="pointercursor" @click="deleteDraft(draft.id)">Delete</p>
                            <div class="divider m-1" v-if="draft.published == (null || '')"></div>
                            <p class="pointercursor" v-if="draft.published == ''" @click="publishDraft(draft.id)">Publish Draft</p>
                            <div class="divider m-1" v-if="draft.published !== ''"></div>
                            <p class="pointercursor" v-if="draft.published !== ''" @click="unpublishDraft(draft.id)">Unpublish Draft</p>
                            <div class="divider m-1"></div>
                            <p class="pointercursor" @click="renderArticleReq(draft.id)">Render Article</p>
                        </div>
                        <div class="post_image_ill">
                            <img src="../assets/Instruction for correct pose during office work.jpg">
                        </div>
                        <div>
                            <p class="content-title">{{draft.title}}</p>
                        </div>
                        <div class="mt-2">
                            <p class="minor-post-details">Published Status : {{draft.published || 'Not yet published'}}</p>
                        </div>
                        <div>
                            <p class="minor-post-details">Created : {{ draft.initialized }} </p>
                        </div>
                        <div>
                            <p class="minor-post-details">Category : {{draft.category}}</p>
                        </div>
                        <div class="offset-top-2">
                            <vs-button primary flat block @click="goToEditDraft(draft.id)">Edit This Post</vs-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <vs-dialog prevent-close v-model="articleRenderCompleted">
                <div class="center">
                    <p class="py-2">Post Successfully Rendered</p>
                    <p class="offset-top-1"></p>
                    <vs-button @click="copyPostLink()" block dark flat>Copy Article Link</vs-button>
                </div>
        </vs-dialog>
        <vs-dialog prevent-close v-model="categoryRendered">
                <div class="center">
                    <p class="py-2">Category Page Successfully Rendered</p>
                    <p class="offset-top-1"></p>
                    <vs-button block dark flat @click="copyCatLink()">Copy Cat Link</vs-button>
                </div>
        </vs-dialog>
    </div>
</template>

<script>
import { getCatDrafts,managePage, managePostPublish, managePostUnpublish, renderArticle, renderCategory } from "@/utils/requests"
import "./style.manage-category.css"
export default {
    data: function (){
        return {
            drafts : {
                top: [],
                more : []
            },
            draftContents : {},
            menuItem: '',
            postLink: '',
            articleRenderCompleted: false,
            categoryRendered: false,
            catLink : ''
        }
    },
    computed : {
        blogid (){
            return this.$route.params.blogid
        },
        category(){
            return this.$route.params.category
        },
        topDrafts(){
            let top = []
            this.drafts.top.forEach(x=>{
                top.push(this.draftContents[x])
            })
            return top
        },
        moreDrafts(){
            let more = []
            this.drafts.more.forEach(x=>{
                more.push(this.draftContents[x])
            })
            return more
        }
    },
    methods: {
        renderArticleReq(draftid){
            renderArticle(this.blogid,draftid)
            .then((res)=>{
            console.log("res",res)
            this.postLink = res.data.path_to_post
            this.articleRenderCompleted = true

            }).catch(error=>{
                console.error("Req Error", error)
            this.$vs.notification({
                title : "Render Error",
                text: error.message,
                color: "#a592ff",
            });
            })

        },
        renderCategoryReq(){
            console.log("rendering category homepage and category articles")
            renderCategory(this.blogid,this.category)
            .then((res)=>{
                this.categoryRendered = true
                console.log(res.data)
                this.catLink = res.data.catLink
            })
            .catch((error)=>{
                this.$vs.notification({
                title : "Render Error",
                text: error.message,
                color: "#a592ff",
                })
            })
        },
        copyPostLink(){
            navigator.clipboard.writeText(this.postLink);
            this.articleRenderCompleted = false
        },
        copyCatLink(){
            navigator.clipboard.writeText(this.catLink)
            this.categoryRendered = false
        },
        goToCreateDraft(){
            let props = {
                path:  `/${this.blogid}/${this.category}/create-new-draft`
            }
            this.$router.push(props)
        },
        addCategoryTop(draftid){
            managePage(this.blogid,{type: 'moveToTop', page: this.category, draftid})
            .then((res)=>{
            console.log("res",res)
            this.renderUpdate()
            }).catch(error=>{
                console.error("Req Error", error)
            })
        },
        publishDraft(draftid){
            managePostPublish(this.blogid,draftid,{draftid})
            .then(res=>{
                console.log("response from publish draft request", res.data);
                this.$vs.notification({
                    title : "Published Success",
                    text : res.data.message
                })
            }).catch(error=>{
                console.error("error_publish",error)
            })
        },
        unpublishDraft(draftid){
            console.log("unpublishing draft")
            managePostUnpublish(this.blogid,draftid,{draftid})
            .then(res=>{
                console.log("response from unpublish draft request", res.data);
                this.$vs.notification({
                    title : "Unpublished Success",
                    text : res.data.message
                })
            }).catch(err=>{
                if(err){
                    console.log("Error from unpublish draft" , err);
                }
            })
        },
        deleteDraft(draftid){
            managePage(this.blogid,{type: 'delete', page: this.category, draftid})
            .then((res)=>{
            console.log("res",res)
            this.renderUpdate()
            }).catch(error=>{
                console.error("Req Error", error)
            })
            managePage(this.blogid,{type: 'delete', page: 'homepage', draftid})
            .then((res)=>{
            console.log("res",res)
            this.renderUpdate()
            }).catch(error=>{
                console.error("Req Error", error)
            })
        },
        openPostMenu(id){
            this.menuItem !== id ? this.menuItem = id : this.menuItem = ''
        },
        goToEditDraft(id) {
            this.$router.push(
                {
                    path : `/${this.blogid}/${this.category}/edit-draft/${id}`,
                }
            )
        },
        modifyDraft(array){
            let modified = {}
            for(let each of array){
                modified[each.id] = each
            }
            return modified
        },
        renderUpdate(){
            getCatDrafts(this.blogid,this.category)
            .then((response)=>{
                this.draftContents = this.modifyDraft(response.data.draftContents)
                this.drafts = response.data.data
                console.log("modified",this.draftContents,this.drafts)
            }).catch(error=>{
                console.error("Req Error", error)
            })
        }
    },
    created (){
        this.renderUpdate()
    }
}
</script>