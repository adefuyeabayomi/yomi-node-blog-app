<template>
    <div>
        <div class="m-2 pt-5 text-center">
            <h1 class="text-h3">Yomi's Node.js Blog App</h1>
            <h4 class="text-subheading-bold">Manage Your Blog "{{blog.name}}"</h4>
            <p class="text-body-regular">Here you can create categories, manage the homepage and the blog categories</p>
        </div>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="box-style-1 manage-item-box">
                    <div class=" text-center center">
                        <p class="text-center text-h1"><i class="fas fa-feather"></i></p>
                        <h5 class="text-subheading-bold">New Category</h5>
                        <p>Sets of related article/blog posts can be grouped, making it easy for users to find</p>
                        <div class="box-button-container pt-3">
                            <vs-button block flat dark @click="openCatModal()">Create New Category</vs-button>
                        </div>
                    </div>
                </div>
                <div class="box-style-1 manage-item-box">
                    <div class=" text-center center">
                        <p class="text-center text-h1"><i class="fas fa-feather"></i></p>
                        <h5 class="text-subheading-bold">Manage Homepage</h5>
                        <p>Manage your homepage, set top posts and many other edits to your homepage</p>
                        <div class="box-button-container pt-3">
                            <vs-button block warn flat @click="goToManageHomePage()">Manage Homepage</vs-button>
                        </div>
                    </div>
                </div>

                <div v-for="category in blog.categories" :key="category" class="box-style-1 manage-item-box mt-3">
                    <div class=" text-center center">
                        <p class="text-center text-h1"><i class="fas fa-feather"></i></p>
                        <h5 class="text-subheading-bold">#Category <br> 
                            <span class="text-body-bold">{{ category }}</span>
                        </h5>
                        <div class="box-button-container pt-3">
                            <vs-button block flat @click="goToManageCategory(category)">Manage Category</vs-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <vs-dialog v-model="cat_modal" prevent-close class="p-1">
            <template #header>
                <h4>
                    Create <b class="green">New Category</b>
                </h4>
            </template>

            <div class="con-form">
                <vs-input v-model="cat_input" placeholder="Input Category Name">
                    <template #icon>
                    <i class="fas fa-book"></i>
                    </template>
                </vs-input>
            </div>

            <template #footer>
            <div class="footer-dialog m-2">
                <vs-button block flat success @click="updateCatReq()">
                Create
                </vs-button>
            </div>
            </template>
        </vs-dialog>
    </div>
</template>
<script>
import { fetchBlog, updateCategory } from '@/utils/requests'
import "./style.manage-blog.css"
export default {
    data : function (){
        return {
            blog: {},
            blog_name: '',
            blog_description: '',
            blog_author: '',
            logoUploaded : false,
            cat_modal: false,
            cat_input: ''
        }
    },

    computed: {
        blogid (){
            return this.$route.params.blogid
        }
    },
    methods : {
        openCatModal(){
            this.cat_modal = true
        },
        updateCatReq(){
            if(this.cat_input.length < 3){
                this.cat_modal = false;
                this.$vs.notification({
                title : "Please fill in more than 3 characters for the category",
                color: "#cfad00",
                })
            }
            else{
                updateCategory(this.blogid,{catName: this.cat_input})
                .then(res=>{
                    console.log("res",res)
                    this.cat_modal = false
                    if(!res.data.status){
                        this.updateBlogState()
                    }
                })
                .catch(err=>{
                    console.error(err.message)
                    this.cat_modal = false
                })
            }
        },
        updateBlogState(){
            fetchBlog(this.blogid)
            .then((res)=>{
            this.blog = res.data.blog
            this.blog_name = this.blog.name
            this.blog_description = this.blog.description 
            this.blog_author = this.blog.author 
            this.blog.logo.name ? this.logoUploaded = true : false
            })
            .catch((err)=>{
                console.error("Error", err.message)
            })            
        },
        goToManageCategory(catName){
            let catProps = {
                path: `/${this.blogid}/manage-category/${catName}`
            }
            this.$router.push(catProps)
        },
        goToManageHomePage(){
            let routeProps = {
                path: `/${this.blogid}/manage-homepage`
            }
            this.$router.push(routeProps)
        }   
    },
     
    created (){
        this.updateBlogState()
    }
}
</script>