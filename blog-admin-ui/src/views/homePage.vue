<template>
    <div id="homepage-area">
        <div class="m-2 pt-5 text-center">
            <h1 class="text-h3">Yomi's Node.js Blog App</h1>
            <h4 class="text-subheading-regular">Blog Admin Interface</h4>
            <p class="text-body-regular">Welcome Back, Manage your blogs here</p>
        </div>
        <div class="m-2">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-9 col-sm-6 col-md-5 col-lg-4 col-xl-3 ">
                        <div class="p-3 m-2 box-style-1">
                            <div><img src="../assets/DrawKit Vector Illustration Project Manager (11).png"></div>
                            <div class="pt-2"><p class="text-subheading-bold text-center">You can create a new Blog here.</p></div>
                            <div class="pt-2"><vs-button class="text-body-bold" flat color="#65b7ff" block @click="create">Create New Blog</vs-button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-2 pt-4">
            <div>
                <h3 class="text-subheading-bold text-center" v-if="blogList.length == 0"><i>You have not created any blog yet!</i></h3>
                <h3 class="text-subheading-bold text-center" v-if="blogList.length > 0">My Blogs</h3>
            </div>
            <div class="container-fluid mt-2">
                <div class="row justify-content-center">
                    <div class="mt-2 col-11 col-sm-6 col-md-5 col-xl-4" v-for="blog in blogList" :key="blog">
                        <div class="p-3 box-style-1 text-body-regular">
                            <div class="blog-image-container">
                                <img class="width-200" src="../assets/DrawKit Vector Illustration Project Manager (18).png">
                                <div class="delete-blog-button">
                                    <vs-button danger flat class="le-btn" @click="openDeleteModal(blogs[blog].name,blog)"><i class="fas fa-archive"></i></vs-button>
                                </div>
                            </div>
                            <div><p class="text-body-bold">Blog ID : {{ blog }}</p></div>
                            <div><p>Blog Name : {{ blogs[blog].name || 'Not Set' }}</p></div>
                            <div><p>Blog Author : {{ blogs[blog].author || 'Not Set' }}</p></div>
                            <div><p>Description : {{ blogs[blog].description || 'Not Set' }}</p></div>
                            <div><vs-button class="text-body-bold" flat color="#65b7ff" @click="goToManageBlog(blog)" block >Manage Blog</vs-button></div>
                            <div><vs-button class="text-body-bold" flat color="#ff45d7" @click="goToEditBlog(blog)" block >Edit Blog</vs-button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <vs-dialog v-model="del_modal_active">
            <p class="text-body-bold">Are you sure you want to delete this blog?</p>
            <p class="text-body-regular">Blog Name : {{ blogToBeDeleted }}</p>
            <div class="pt-2"><vs-button class="text-body-bold" flat danger block @click="deleteBlogReq(blogToBeDeletedId)">Delete Blog</vs-button></div>
        </vs-dialog>
    </div>
</template>
<script>
import { fetchBlogs,createBlog,deleteBlog } from '../utils/requests'

import "./style.home.css"

export default {
    data : function (){
        return {
            blogs: {},
            del_modal_active: false,
            blogToBeDeleted: '',
            blogToBeDeletedId: ''
        }
    },  
    methods: {
        goToEditBlog(blogid){
            let editBlog = {
                path: `/edit-blog/${blogid}`,
            }
            this.$router.push(editBlog)
        },
        goToManageBlog(blogid){
            let manageBlog = {
                path: `/manage-blog/${blogid}`,
            }
            this.$router.push(manageBlog)
        },
        openDeleteModal(blog_name,blogid){
            this.blogToBeDeleted = blog_name
            this.blogToBeDeletedId = blogid
            this.del_modal_active = true
        },
        deleteBlogReq(blogid){
            deleteBlog(blogid)
            .then(()=>{
                this.refreshBlogList()
                this.del_modal_active = false
            })
            .catch(err=>{
                console.error(err.message)
                this.del_modal_active = false
            })
        },
        create(){
            createBlog()
            .then(res=>{
                this.goToEditBlog(res.data.Blog)
            })
            .catch(err=>{
                console.error(err.message)
            })
        },
        refreshBlogList (){
            fetchBlogs()
        .then((res)=>{
            this.blogs = res.data.blogs
        })
        .catch((err)=>{
            console.error("Error", err.message)
        })
        }
    },  
    computed : {
        blogList () {
            return Object.keys(this.blogs)
        }
    },
    created: function (){
        this.refreshBlogList()
    }
}
</script>