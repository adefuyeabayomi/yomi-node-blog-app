import axios from "axios";

let baseURL = "http://localhost"

function createNew (blogid,data){
    let url = `${baseURL}/${blogid}/draft`
    return axios.post(url,data)
}

function getDraft (blogid,category,draftid){
    let url = `${baseURL}/${blogid}/draft/${category}/${draftid}`
    return axios.get(url)
}

function getCatDrafts (blogid,category){
    let url = `${baseURL}/${blogid}/draft/${category}`
    return axios.get(url)
}

function editDraft(blogid,draftid,data,options){
    let url = `${baseURL}/${blogid}/edit-draft/${draftid}`
    return axios.put(url,data,options)
}

function managePage(blogid,options){  
    console.log({blogid,options}) 
    let endpoint = '/manage-page'
    let url = `${baseURL}/${blogid}${endpoint}`
    return axios.post(url,options)
}

function managePostUnpublish(blogid,draftid,options){
    let url = `${baseURL}/${blogid}/manage-post/unpublish/${draftid}`
    return axios.post(url,options)
}

function managePostPublish(blogid,draftid,options){
    let url = `${baseURL}/${blogid}/manage-post/publish/${draftid}`
    return axios.post(url,options)
}

function managePostDelete(blogid,draftid,options){
    let url = `${baseURL}/${blogid}/manage-post/delete_draft/${draftid}`
    return axios.post(url,options)
}

function renderPreview(blogid,draftid){
    let url = `${baseURL}/${blogid}/preview/${draftid}`
    return axios.get(url)
}

function renderCategory(blogid,category){
    let url = `${baseURL}/${blogid}/render-category/${category}`
    return axios.get(url)
}

function renderArticle(blogid,draftid){
    let url = `${baseURL}/${blogid}/render-article/${draftid}`
    return axios.get(url)
}

function renderHomepage(blogid){
    let url = `${baseURL}/${blogid}/render-home`
    return axios.get(url)
}

function createBlog(){
    let endpoint = '/blog'
    let url = `${baseURL}${endpoint}`
    return axios.post(url)
}

function fetchBlogs(){
    let endpoint = '/blog'
    let url = `${baseURL}${endpoint}`
    return axios.get(url)
}

function fetchBlog(blogid){
    let endpoint = '/blog/'
    let url = `${baseURL}${endpoint}${blogid}`
    return axios.get(url)
}

function fetchHomepageData(blogid){
    let url = `${baseURL}/blog/${blogid}/homepage`
    return axios.get(url)
}

function fetchHomepageDrafts(blogid){
    let url = `${baseURL}/blog/${blogid}/alldrafts`
    return axios.get(url)
}

function updateBlog(blogid,data,options){
    let endpoint = '/blog/'
    let url = `${baseURL}${endpoint}${blogid}`
    return axios.post(url,data,options)
}

function deleteBlog(blogid){
    let endpoint = '/blog/'
    let url = `${baseURL}${endpoint}${blogid}`
    return axios.delete(url)
}

function updateCategory(blogid,options){
    let endpoint = '/'
    let url = `${baseURL}${endpoint}${blogid}/category`
    // url takes the form http://localhost/blogid/category
    return axios.post(url,options)
}

export {
    createNew,
    getDraft,
    editDraft,
    getCatDrafts,
    managePage,
    managePostUnpublish,
    managePostPublish,
    managePostDelete,
    renderPreview,
    renderArticle,
    renderCategory,
    renderHomepage,
    fetchBlogs,
    createBlog,
    updateBlog,
    fetchBlog,
    deleteBlog,
    updateCategory,
    fetchHomepageData,
    fetchHomepageDrafts
}