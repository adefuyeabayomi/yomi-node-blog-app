<template>
    <div>
        <div class="m-2 pt-5 text-center">
            <h1 class="text-h3">Yomi's Node.js Blog App</h1>
            <h4 class="text-subheading-bold">{{blog.name}} Homepage</h4>
            <p class="text-body-regular">{{blog.description}}</p>
        </div>
        <div> 
            <div class="container-fluid">
                <div class="row justify-content-center align-items-center">
                    <p class="categories text-body-bold fit-text">Categories: </p>
                    <div v-for="category in blog.categories" :key="category" class="text-14-bold fit-text">
                        #{{ category }}
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="box-style-1 manage-item-box mt-3">
                    <div class=" text-center center">
                        <p class="text-center text-h1"><i class="fas fa-eye"></i></p>
                        <h5 class="text-subheading-bold">View Homepage</h5>
                        <div class="box-button-container pt-3">
                            <vs-button block warn flat @click="renderHomeReq()"> Copy Link </vs-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="offset-top-5">
            <h5 class="text-subheading-bold text-center">* Top Posts * In Homepage</h5>
            <p class="text-center">Sort Method: Most Recently added appears first </p>
        </div>
        <div class="text-center text-body-bold offset-top-4" v-if="topDrafts.length==0"><i>No Post Added to Top Yet</i></div>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div v-for="draft in topDrafts" :key="draft.title" class="col-12 col-sm-6 col-md-4">
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
            <h5 class="text-subheading-bold text-center">* Other Posts * In Homepage</h5>
        </div>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div v-for="draft in moreDrafts" :key="draft.title" class="col-12 col-sm-6 col-md-4">
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
        <vs-dialog prevent-close v-model="homeRendered">
                <div class="center">
                    <p class="py-2">Homepage Successfully Rendered</p>
                    <p class="offset-top-1"></p>
                    <vs-button block dark flat @click="copyHomeLink()">Copy Home Link</vs-button>
                </div>
        </vs-dialog>
    </div>
</template>

<script>
import "./style.manage-home.css"
import { fetchHomepageData,fetchHomepageDrafts,fetchBlog,managePostUnpublish,managePostPublish,managePage } from '@/utils/requests'
import { renderHomepage } from '../utils/requests'

export default {
    data () {
        return {
            blog : {},
            homepageData: {
                top: [],
                more: []
            },
            drafts : {},
            menuItem : '',
            postLink: '',
            homeLink: '',
            homeRendered: false,
            articleRenderCompleted: false,
        }
    },
    computed: {
        blogid (){
            return this.$route.params.blogid
        },
        topDrafts(){
            let {drafts} = this
            return this.homepageData.top.map(draftid=>{
                return drafts[draftid]
            })
        },
        moreDrafts(){
            let {drafts} = this
            return this.homepageData.more.map(draftid=>{
                return drafts[draftid]
            })
        }
    },
    methods: {
        copyPostLink(){
            navigator.clipboard.writeText(this.postLink);
            this.articleRenderCompleted = false
        },
        copyHomeLink(){
            navigator.clipboard.writeText(this.homeLink)
            this.categoryRendered = false
        },
        openPostMenu(id){
            this.menuItem !== id ? this.menuItem = id : this.menuItem = ''
        },
        updateBlogState(){
            fetchBlog(this.blogid)
            .then((res)=>{
            console.log("res",res)
            this.blog = res.data.blog
            })
            .catch((err)=>{
                console.error("Error", err.message)
            })            
        },
        updateHomepageData () {
            fetchHomepageData(this.blogid)
            .then(res=>{
                console.log("res", res.data)
                this.homepageData = res.data.homepageData
            })
            .catch(err=>{
                console.error("error", err.message)
            })
        },
        updateDrafts(){
            fetchHomepageDrafts(this.blogid)
            .then(res=>{
                console.log("res", res.data)
                let {allDrafts} = res.data
                let modified = {}
                allDrafts.forEach(draft=>{
                    modified[draft.id] = draft
                })
                this.drafts = modified
            })
            .catch(err=>{
                console.error("error", err.message)
            })
        },
        renderHomeReq(){
            renderHomepage(this.blogid)
            .then(res=>{
                console.log("res", res.data)
                this.homeLink = res.data.home
                this.homeRendered = true
            })
            .catch(err=>{
                console.error("error", err.message)
            })
        },
        addCategoryTop(draftid){
            managePage(this.blogid,{type: 'moveToTop', page: 'homepage', draftid})
            .then((res)=>{
            console.log("res",res)
                this.updateHomepageData()
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
            this.updateHomepageData()
            }).catch(error=>{
                console.error("Req Error", error)
            })
            managePage(this.blogid,{type: 'delete', page: 'homepage', draftid})
            .then((res)=>{
            console.log("res",res)
            this.updateHomepageData()
            }).catch(error=>{
                console.error("Req Error", error)
            })
        }
    },
    created () {
        this.updateBlogState(this.blogid)
        this.updateDrafts()
        this.updateHomepageData()

    }
}
</script>