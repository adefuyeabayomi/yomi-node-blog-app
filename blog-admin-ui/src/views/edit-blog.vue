<template>
    <div class="edit-blog">
        <div class="m-2 pt-5 text-center">
            <h1 class="text-h3">Yomi's Node.js Blog App</h1>
            <h4 class="text-subheading-regular">Edit Blog's Details</h4>
            <p class="text-body-regular">Edit Your Blog's Details Here</p>
        </div>
        <div class="col-11 center">
            <div class="offset-top-5">  
                <vs-input v-model="blog_name" dark label="What is your blog's name" block placeholder="Input the blog name">
                    <template #icon>
                        <i class='fas fa-align-left'></i>
                    </template>
                </vs-input>
            </div>
            <div  class="offset-top-5">  
                <vs-input v-model="blog_description" dark label="Description: Tell us more about your blog, Don't worry you can always update it later" block placeholder="Input description">
                    <template #icon>
                        <i class='fas fa-align-left'></i>
                    </template>
                </vs-input>
            </div>
            <div class="offset-top-5">  
                <vs-input v-model="blog_author" dark label="Author" block placeholder="Input Author's name">
                    <template #icon>
                        <i class='fas fa-align-left'></i>
                    </template>
                </vs-input>
            </div>
            <div class="offset-top-5 col-12 col-sm-8 col-md-6">  
                <vs-input id="logo-input" dark label="Upload Logo" block type="file"></vs-input>
            </div>
            <div>
                <p class="text-small-regular" v-if="logoUploaded">You have already uploaded a logo img <span class="text-small-bold"> {{ blog.logo.name + blog.logo.extension }} </span>, You can upload another one if you wish to update it</p>
                <p class="text-small-regular" v-if="!logoUploaded">You have not uploaded any photo as Logo</p>
            </div>
        </div>
        <div class="col-10 center mt-3 offset-top-1">
            <vs-button block flat color="#894382" @click="sendUpdateRequest()">Save Updated Details</vs-button>
        </div>
    </div>
</template>

<script>
import { updateBlog, fetchBlog } from '../utils/requests'
export default {
    data : function (){
        return {
            blog_name: '',
            blog_description: '',
            blog_author: '',
            blog: {},
            logoUploaded: false
        }
    },
    computed : {
        blogid (){
            return this.$route.params.blogid
        }
    },
    methods : {
        logo (){
            let logoInput = document.querySelector('#logo-input input')
            return logoInput.files[0]
        },
        goToManageBlog(blogid){
            let manageBlog = {
                path: `/manage-blog/${blogid}`,
            }
            this.$router.push(manageBlog)
        },
        sendUpdateRequest () {
            let {blog_name,blog_description,blog_author} = this
            let file = this.logo()
            let requestBody = new FormData()
            blog_name ? requestBody.append("name",blog_name) : true
            blog_description ?  requestBody.append("description",blog_description) : true
            blog_author ? requestBody.append("author",blog_author) : true
            file ?  requestBody.append("file",file) : true
            let headers = {
                "Content-Type" : "multipart/form"
            }
            updateBlog(this.blogid,requestBody,headers)
            .then((res)=>{
                this.goToManageBlog(res.data.blog.id)
                this.logo() ? this.logoUploaded = true: false;
            })
            .catch((err)=>{
                console.error("Error", err.message)
            })
        },
        
    },
    created (){
        console.log("initialize blog in ")
        fetchBlog(this.blogid)
        .then((res)=>{
        console.log("res",res)
        this.blog = res.data.blog
        this.blog_name = this.blog.name
        this.blog_description = this.blog.description 
        this.blog_author = this.blog.author 
        this.blog.logo.name ? this.logoUploaded = true : false
        })
        .catch((err)=>{
            console.error("Error", err.message)
        })
    }
}
</script>