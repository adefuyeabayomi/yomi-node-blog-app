<template>
    <div id="edit-post">
        <div class="buffer-container">
            <div class="sidebar-container">
                <div class="tools-container">
                    <div class="tool-icon-container mb-4">
                        <vs-tooltip success>
                            <vs-button success flat @click="addImage()">
                                <i class="fas fa-image"></i>
                            </vs-button>
                            <template #tooltip>
                                Insert New Image To Draft
                            </template>
                        </vs-tooltip>
                    </div>
                    <div class="tool-icon-container mb-4">
                        <vs-tooltip primary>
                            <vs-button primary flat @click="addSubheading()">
                                <i class="fas fa-memory"></i>
                            </vs-button>
                            <template #tooltip>
                                Add a New Sub-Heading
                            </template>
                        </vs-tooltip>
                    </div>
                    <div class="tool-icon-container mb-4">
                        <vs-tooltip warn>
                            <vs-button warn flat @click="addParagraph()">
                                <i class="fas fa-align-center"></i>
                            </vs-button>
                            <template #tooltip>
                                Add New Paragraph
                            </template>
                        </vs-tooltip>
                    </div>
                    <div class="tool-icon-container mb-4">
                        <vs-tooltip dark>
                            <vs-button dark flat @click="addList()">
                                <i class="fas fa-th-list"></i>
                            </vs-button>
                            <template #tooltip>
                                Add A List
                            </template>
                        </vs-tooltip>
                    </div>
                    <div class="tool-icon-container mb-4">
                        <vs-tooltip color="#7d33ff">
                            <vs-button color="#7d33ff" flat @click="previewDraft()">
                                <i class="fas fa-eye"></i>
                            </vs-button>
                            <template #tooltip>
                                Preview The Draft
                            </template>
                        </vs-tooltip>
                    </div>
                    <div class="tool-icon-container mb-4">
                        <vs-tooltip primary>
                            <vs-button primary flat @click="publishDraft()">
                                <i class="fas fa-eye"></i>
                            </vs-button>
                            <template #tooltip>
                                Publish The Draft
                            </template>
                        </vs-tooltip>
                    </div>
                    <div class="tool-icon-container mb-4">
                        <vs-tooltip color="rgb(233, 171, 244)">
                            <vs-button color="rgb(233, 171, 244)" @click="unpublishDraft()">
                                <i class="fas fa-eye-slash"></i>
                            </vs-button>
                            <template #tooltip>
                                Unpublish The Draft
                            </template>
                        </vs-tooltip>
                    </div>
                    <div class="tool-icon-container mb-4">
                        <vs-tooltip danger>
                            <vs-button danger flat>
                                <i class="fas fa-archive"></i>
                            </vs-button>
                            <template #tooltip>
                                Delete The Draft
                            </template>
                        </vs-tooltip>
                    </div>
                </div>
            </div>
            <div class="edit-contents-container p-4">
                <div class="header-area center">
                    <p class="h1 pt-3 pb-1 bold-font">Edit Draft</p>
                    <p> To make a change to an already existing content, just click on that section, it will switch to edit mode.</p>
                </div>
                <div class="render-contents-container">
                    <div class="article-header-section">
                        <!--the article data and main i.e title, cover-image, cover-image-credits, category, published date , js-time-ago-->
                        <div class="edit-title-container fine-box">
                            <div v-if="!editMode || editMode && editingCurrent !== 'title'" class="render pointercursor" title="Post Title, Click To Edit This Section" @click="goToEditMode('title')">
                                <div class="post-title-container">
                                    <div>
                                        <p class="post-title section-title-style">Title : "{{draftData.title}}"</p>
                                    </div>
                                </div>
                            </div>
                            <div v-if="editMode && editingCurrent == 'title'"  class="edit">
                                <div>
                                    <textarea v-model="draftData.title" placeholder="Update Post Title Here" class="block-edit-input"></textarea>
                                    <vs-button block class="no-margin" warn flat @click="saveTitle(draftData.title)">Save Updated Title</vs-button>
                                </div>
                            </div>
                        </div>
                        <div class="edit-cover-image-container fine-box">
                            <div v-if="!editMode || editMode && editingCurrent !== 'cover-image'"  class="render" title="Click To Edit This Section" @click="goToEditMode('cover-image')">
                                <div class="no-image-container">
                                    <p class="bold-font">Cover Image <i class="fas fa-image"></i></p>
                                    <p class="center"><strong>File Saved Successfully :</strong> {{coverLink}}</p>
                                    <p><strong>Cover Image Credits : </strong> {{draftData.coverCredits}}</p>
                                </div>
                            </div>
                            <div v-if="editMode && editingCurrent == 'cover-image'"  class="edit">
                                <div class="border p-2 pb-3">
                                    <p class="p-1">Upload a new image to update the cover image</p>
                                    <input type="file" id="updateCover" class="updateCoverInput" accept="image/*">
                                </div>
                                <div class="border p-2 pb-3 mt-3 mb-3">
                                    <p class="p-1">Update the photo credits for The Cover Image</p>
                                    <vs-input v-model="draftData.coverCredits" block placeholder="Input Photo Credits here"></vs-input>
                                </div>
                                    <vs-button warn flat class="no-margin" block @click="updateCoverInfo()">Update the cover image / credits</vs-button>
                            </div>
                        </div>
                        <div class="edit-details-container fine-box">
                            <!--cartegory and published details-->
                            <div v-if="!editMode || editMode && editingCurrent !== 'details'" class="render" title="Click To Edit This Section" @click="goToEditMode('details')">
                                <p class="bold-font">Post Details</p>
                                <p>Category : {{draftData.category}}</p>
                                <p>Published Time : {{publishedTime}}</p>
                                <p>Created : {{createdTime}}</p>
                            </div>
                            <div v-if="editMode && editingCurrent == 'details'"  class="edit">
                                <div>
                                    <p>Update Post Category ({{category}})</p>
                                    <div class="category-options-container pt-3 pb-3">
                                        <vs-radio v-model="category" val="Hot Topics">Hot Topics</vs-radio>
                                        
                                        <vs-radio v-model="category" val="Car News">Car News</vs-radio>
                                        
                                        <vs-radio v-model="category" val="Reviews">Reviews</vs-radio>
                                        
                                        <vs-radio v-model="category" val="New and Used Cars Research">New and Used Cars Research</vs-radio>
                                        
                                        <vs-radio v-model="category" val="Car Care">Car Care</vs-radio>
                                        
                                        <vs-radio v-model="category" val="Hot New Wheels">Hot New Wheels</vs-radio>
                                    </div>
                                    <div class="mt-2">
                                        <vs-button class="no-margin" warn flat block @click="updateCategory()">Update Cartegory</vs-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pt-5 pb-2 center bold-font">
                        Add and Edit The Post Body Below <i class="fas fa-chevron-circle-down"></i>
                    </div>
                    <div class="article-main-content-section" v-for="section in sectionsArray" :key="section.sid">
                        <div class="item-id-container pointercursor"  v-if="!editMode" title="click to perform other edits" @click="openOtherEditBox(section.sid)">
                            <i class="fas fa-pen"></i> {{section.type}} 
                        </div>
                        <div class="item-delete-container" v-if="editMode && editingCurrent == section.sid" @click="deleteSection(section.sid)">
                            Delete
                        </div>
                        <div class="edit-image-box-container fine-box" v-if="section.type == 'image'">
                            <div  v-if="!editMode || editMode && editingCurrent !== section.sid"  title="Click To Edit This Section" class="render" @click="goToEditMode(section.sid,section.content)">
                                <div class="edit-image-info-container">
                                    <p class="bold-font"><i class="fas fa-image"></i> Image</p>
                                    <p class="">File : {{section.content.imageFileName}}{{section.content.imageFileExtension}}</p>
                                    <p> Credits : {{section.content.credits}}</p>
                                </div>
                            </div>
                            <div v-if="editMode && editingCurrent == section.sid"  class="edit">
                                <div class="border p-2 pb-3">
                                    <p class="p-1">Upload an image.</p>
                                    <input type="file" id="editImageInput" class="updateCoverInput" accept="image/*">
                                </div>
                                <div class="border p-2 pb-3 mt-3 mb-3">
                                    <p class="p-1">Update Image Credits</p>
                                    <vs-input v-model="currentImgCredits" block placeholder="Input Photo Credits here"></vs-input>
                                </div>
                                <vs-button class="no-margin" warn flat block @click="updatePostImageSection(section.sid)">Update<i class="fas fa-check-circle p-1"></i></vs-button>
                            </div>
                        </div>
                        <div class="edit-paragraph-box-container fine-box" v-if="section.type == 'paragraph'">
                            <div v-if="!editMode || editMode && editingCurrent !== section.sid"  title="Click To Edit This Section" class="render" @click="goToEditMode(section.sid,section.content)">
                                {{section.content}}
                            </div>
                            <div v-if="editMode && editingCurrent == section.sid"  class="edit">
                                <div>
                                    <textarea v-model="draftData.contents[section.sid].content" placeholder="Update Post Title Here" class="block-edit-input"></textarea>
                                    <vs-button block class="no-margin" warn flat @click="updateTextSection(draftData.contents[section.sid].content, section.sid)">Save Updated Paragraph</vs-button>
                                </div>
                            </div>
                        </div>
                        <div class="edit-subheading-box-container fine-box subheading-edit" v-if="section.type == 'subheading'">
                            <div v-if="!editMode || editMode && editingCurrent !== section.sid"  title="Click To Edit This Section" class="render" @click="goToEditMode(section.sid,section.content)">
                                {{section.content}}
                            </div>
                            <div v-if="editMode  && editingCurrent == section.sid"  class="edit">
                                <div>
                                    <textarea v-model="draftData.contents[section.sid].content" placeholder="Update Post Title Here" class="block-edit-input"></textarea>
                                    <vs-button block class="no-margin" warn flat @click="updateTextSection(draftData.contents[section.sid].content, section.sid)">Save Updated Subheading</vs-button>
                                </div>                    
                            </div>
                        </div>
                        <div class="edit-list-box-container fine-box" v-if="section.type == 'list'">
                            <div title="Click To Edit This Section" class="render" @click="goToEditMode(section.sid,section.content)">
                                <p class="pb-2"  v-if="editMode  && editingCurrent == section.sid">Editing List</p>
                                <div class="listItem" v-for="item in section.content" :key="item.lid">
                                    <div class="border p-2 mb-2 text-left row list-container">
                                        <div class="list-item-content"><i class="fas fa-star-of-david"></i> {{item.itemContent}}</div>
                                        <div v-if="editMode  && editingCurrent == section.sid" class="p-1 list-item-edit row">
                                            <vs-button primary flat class="le-btn" @click="openlistedit(section.sid,item.lid,item.itemContent)"><i class="fas fa-pen"></i></vs-button>
                                            <vs-button danger flat class="le-btn" @click="openlistitemdelete(section.sid,item.lid)"><i class="fas fa-archive"></i></vs-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <vs-dialog v-model="listItemEditActive">
                                <div class="center">
                                    <p class="py-2">Update List Item</p>
                                    <vs-input v-model="listItemEdit" placeholder="Input list item content here." block></vs-input>
                                    <vs-button block color="#ef6c00" flat gradient @click="updateListItem()" >Update</vs-button>
                                </div>
                            </vs-dialog>
                            <vs-dialog v-model="listItemDeleteActive">
                                <div class="center">
                                    <p class="py-2">Are you sure you want to delete this item?</p>
                                    <vs-button danger block flat @click="deleteListItem()" >Delete</vs-button>
                                </div>
                            </vs-dialog>
                            <div v-if="editMode && editingCurrent == section.sid"  class="edit">
                                <div>
                                    <vs-input v-model="currentListItem" block placeholder="Input a new list item"></vs-input>
                                </div>
                                <div class="container_fluid">
                                    <div class="row">
                                        <div class="col-6 pt-3">
                                            <vs-button class="no-margin" block primary warn flat @click="addNewListItem(section.sid)">Add new list item</vs-button>
                                        </div>
                                        <div class="col-6 pt-3">
                                            <vs-button class="no-margin" block primary border @click="saveList(section.content,section.sid)">Save Changes</vs-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <vs-dialog v-model="previewCompletedModalActive">
                                <div class="center">
                                    <p class="py-2">Rendered the preview successfully</p>
                                    <vs-button @click="copyPreviewLink()" block dark flat>Copy Preview Link</vs-button>
                                </div>
                        </vs-dialog>
                        <vs-dialog v-model="publishCompletedModalActive">
                                <div class="center">
                                    <p class="py-2 insert-edit-h">Published Draft Successfully</p>
                                    <p class="pb-2" style="font-size : 80%">All the necessary changes have been applied and all the files have been updated. To have the changes reflected online, you must now push the changes to the github repository else it will remain only local on this machine.</p>
                                    <vs-button @click="copyPostLink()" block dark flat>Copy Post Link</vs-button>
                                </div>
                        </vs-dialog>
                        <vs-dialog v-model="otherEditActive">
                                <div class="center">
                                    <p class="py-2 insert-edit-h">Insert Before The currently selected Section.</p>
                                    <div class="other-edit-buttons-container">
                                        <div class="row">
                                            <div class="col-4 tool-icon-container mb-4">
                                                <vs-button success flat @click="addSectionInPlace('image','before')" >Image _<i class="fas fa-image"></i></vs-button>
                                            </div>
                                            <div class="col-4 tool-icon-container mb-4">
                                                <vs-button primary flat @click="addSectionInPlace('subheading','before')">Sub Heading _<i class="fas fa-memory"></i></vs-button>
                                            </div>
                                            <div class="col-4 tool-icon-container mb-4">
                                                <vs-button warn flat @click="addSectionInPlace('paragraph','before')">Paragraph _<i class="fas fa-align-center"></i></vs-button>
                                            </div>
                                            <div class="col-4 tool-icon-container mb-4">
                                                <vs-button dark flat @click="addSectionInPlace('list','before')">List _<i class="fas fa-th-list"></i></vs-button>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="py-2 insert-edit-h">Insert After The currently selected Section.</p>
                                    <div class="other-edit-buttons-container">
                                        <div class="row">
                                            <div class="col-4 tool-icon-container mb-4">
                                                <vs-button success flat  @click="addSectionInPlace('image','after')">Image _<i class="fas fa-image"></i></vs-button>
                                            </div>
                                            <div class="col-4 tool-icon-container mb-4">
                                                <vs-button primary flat @click="addSectionInPlace('subheading','after')">Sub Heading _<i class="fas fa-memory"></i></vs-button>
                                            </div>
                                            <div class="col-4 tool-icon-container mb-4">
                                                <vs-button warn flat @click="addSectionInPlace('paragraph','after')">Paragraph _<i class="fas fa-align-center"></i></vs-button>
                                            </div>
                                            <div class="col-4 tool-icon-container mb-4">
                                                <vs-button dark flat @click="addSectionInPlace('list','after')" >List _<i class="fas fa-th-list"></i></vs-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </vs-dialog>
                    </div>
                </div>               
            </div>
        </div>
    </div>
</template>
<script>
import {format} from "js-time-ago";
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export default {
    data : function () {
        return {
            name : "edit-post",
            editMode : false,
            draftData : {},
            publishedTime : "",
            createdTime : "",
            editTarget : "",
            editContentID : "",
            currentImgCredits: "",
            currentContent : "",
            category : "",
            currentListItem : "",
            listItemEdit : "",
            listItemEditActive : false,
            listItemDeleteActive : false,
            LIE_LID : "",
            LIE_SID : "",
            DEL_LID : "",
            DEL_SID : "",
            previewLink : "",
            previewCompletedModalActive : false,
            otherEditActive : false,
            otherEditSID : "",
            folder : this.$route.query.currentMonth,
            articleID : this.$route.query.articleID,
            publishCompletedModalActive : false,
            postLink : ""
        }
    },
    methods : {
        goToEditMode (target,content){
            this.editMode = true;
            this.editTarget = target;
            this.currentContent = content;
            console.log(this.editTarget, this.currentContent);
        },
        published : async function() {
            if(this.draftData.published == null){
                this.publishedTime = "not yet published";
            }
            else {
                this.publishedTime = await format(this.draftData.published);
            }
        },
        created : async function () {
            this.createdTime = await format(this.draftData.initialized);
        },
        openlistedit(sid,lid,content){
            this.listItemEditActive = true;
            this.listItemEdit = content;
            console.log("opening list edit", sid, lid);
            this.LIE_LID = lid;
            this.LIE_SID = sid;
        },
        openlistitemdelete(sid,lid){
            this.DEL_LID = lid;
            this.DEL_SID = sid;
            this.listItemDeleteActive = true;
        },
        updateListItem(sid = this.LIE_SID,lid = this.LIE_LID){
            let itemIndex = 0;
            console.log("updating list item",this.draftData.contents[sid].content);
            for(let each of this.draftData.contents[sid].content){
                console.log(each.lid, lid, each.lid == lid);
                let equal = each.lid == lid;
                if(equal){
                    break;
                }
                itemIndex++;
            }
            console.log("item index is ", itemIndex);
            this.draftData.contents[sid].content[itemIndex].itemContent = this.listItemEdit;
            this.saveList(this.draftData.contents[sid].content,sid);
            this.listItemEditActive = false;
        },
        deleteListItem(sid=this.DEL_SID,lid=this.DEL_LID){
            console.log("deleting list item");
            let itemIndex = 0;
            console.log("updating list item",this.draftData.contents[sid].content);
            for(let each of this.draftData.contents[sid].content){
                console.log(each.lid, lid, each.lid == lid);
                let equal = each.lid == lid;
                if(equal){
                    break;
                }
                itemIndex++;
            }
            console.log("item index is ", itemIndex);
            this.draftData.contents[sid].content.splice(itemIndex,1);
            this.saveList(this.draftData.contents[sid].content,sid);
            if(this.draftData.contents[sid].content.length == 0){
                this.deleteSection(sid)
            }
            console.log("item Count = ",this.draftData.contents[sid].content.length,this.draftData.contents[sid].content)
            this.listItemDeleteActive = false;
        },
        generateID : function (length = 30) {
            let result = '';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        openOtherEditBox(sid){
            this.otherEditActive = true;
            this.otherEditSID = sid;
            console.log("sid",sid,this.otherEditSID);
        },
        addNewListItem(sid){
            let newListItem = {
                lid : this.generateID(),
                itemContent : this.currentListItem
            }
            console.log("new list item",newListItem);
            this.draftData.contents[sid].content.push(newListItem);
            this.updateView();
            this.currentListItem = "";
        },
        saveNewSection(data){
            let url = "http://localhost/edit-draft/";
            window.axios.get(url,{
                params : {
                    id: this.$route.query.articleID,
                    sid : JSON.parse(data).sid,
                    currentMonth : this.$route.query.currentMonth,
                    data,
                    type : "addNewSection",
                }
            }).then((response)=>{
                console.log("response", response.data);
            }).catch((error)=>{
                console.error("Error : ",error);
            })
        },

        addSectionInPlace(type,where){ 
            let itemIndex = 0;
            let theSID = this.otherEditSID;
            for(let each of this.draftData.order){
                let equal = each == theSID;
                if(equal){
                    break;
                }
                itemIndex++;
            }
            console.log("item index is ", itemIndex,where);
            let data;
            if(type == "image"){
                data = {
                    type : "image",
                    content : {
                        imageFileName : "",
                        imageFileExtension : "",
                        credits : ""
                        },
                    sid : this.generateID(30)
                }
            }
            else if(type == "paragraph"){
                data = {
                    type : "paragraph",
                    content : "A new paragraph",
                    sid : this.generateID(30),
                }
            }
            else if(type == "subheading"){
                data = {
                    type : "subheading",
                    content : "A new Sub-Heading",
                    sid : this.generateID(30)
                }
            }
            else if(type == "list"){
                data = {
                    type : "list",
                    content : [
                        {
                            itemContent : "A list item",
                            lid : this.generateID(20)
                        }
                    ],
                    sid : this.generateID(30)
                }
            }
            console.log("data",data);
            this.draftData.contents[data.sid] = data;
            if(where == "before"){
                if(itemIndex == 0){
                    this.draftData.order.unshift(data.sid);
                }
                else {
                    this.draftData.order.splice(itemIndex,0,data.sid);                    
                }
            }
            else {
                this.draftData.order.splice(itemIndex+1,0,data.sid);
            }
            // save the order and the data in the draftDataFile;
            let url = "http://localhost/edit-draft/";
            console.log()
            window.axios.get(url,{
                params : {
                    sid : data.sid,
                    id : this.articleID,
                    data : JSON.stringify(data),
                    type : "addNewInPlace",
                    orderData : JSON.stringify(this.draftData.order),
                    folder: this.folder
                }
            })
            .then(res=>{
                console.log("response ", res.data)
            })
            .catch(err=>{
                console.log("Error", err)
            })
            this.otherEditActive = false;
        },
        addImage : function () {
            console.log("adding-image")
            let imageSectionData = {
                type : "image",
                content : {
                    imageFileName : "",
                    imageFileExtension : "",
                    credits : ""
                    },
                sid : this.generateID(30)
            }
            this.draftData.contents[imageSectionData.sid] = imageSectionData;
            this.draftData.order.push(imageSectionData.sid);
            this.saveNewSection(JSON.stringify(imageSectionData));
            // send request to add the data to the server and draft data;
        },
        addParagraph : function () {
            console.log("adding paragraph")
            let paraSectionData = {
                type : "paragraph",
                content : "A new paragraph",
                sid : this.generateID(30),
            }
            this.draftData.contents[paraSectionData.sid] = paraSectionData;
            this.draftData.order.push(paraSectionData.sid);
            this.saveNewSection(JSON.stringify(paraSectionData));
        },
        addList : function () {
            console.log("adding list");
            let listSectionData = {
                type : "list",
                content : [
                    {
                        itemContent : "A list item",
                        lid : this.generateID(20)
                    }
                ],
                sid : this.generateID(30)
            }
            this.draftData.contents[listSectionData.sid] = listSectionData;
            this.draftData.order.push(listSectionData.sid);
            this.saveNewSection(JSON.stringify(listSectionData));
        },
        addSubheading : function () {
            console.log("adding subheading")
            let subHeadingSectionData = {
                type : "subheading",
                content : "A new Sub-Heading",
                sid : this.generateID(30)
            }
            this.draftData.contents[subHeadingSectionData.sid] = subHeadingSectionData;
            this.draftData.order.push(subHeadingSectionData.sid);
            this.saveNewSection(JSON.stringify(subHeadingSectionData));
        },
        updateParagraph(content,sid){
            let url = "http://localhost/edit-draft/";
            window.axios.get(url,{
                params : {
                    id: this.$route.query.articleID,
                    currentMonth : this.$route.query.currentMonth,
                    data : JSON.stringify({para : content}),
                    type : "updatePara",
                    sid
                }
            }).then((response)=>{
                console.log("response", response.data);
                this.editTarget = "";
                this.editMode = false;
                this.updateView();
            }).catch((error)=>{
                console.error("Error : ",error);
            })            
        },    
        saveList (content,sid) {
            let url = "http://localhost/edit-draft/";
            window.axios.get(url,{
                params : {
                    id: this.$route.query.articleID,
                    currentMonth : this.$route.query.currentMonth,
                    data : JSON.stringify({list : content}),
                    type : "updateListSection",
                    sid
                }
            }).then((response)=>{
                console.log("response", response.data);
                this.editTarget = "";
                this.editMode = false;
                this.draftData.contents[sid] = response.data.data;
                this.updateView();
            }).catch((error)=>{
                console.error("Error : ",error,content);
            }) 
        },    
        updateTextSection(content,sid){
            let url = "http://localhost/edit-draft/";
            window.axios.get(url,{
                params : {
                    id: this.$route.query.articleID,
                    currentMonth : this.$route.query.currentMonth,
                    data : JSON.stringify({text : content}),
                    type : "updateTextSection",
                    sid
                }
            }).then((response)=>{
                console.log("response", response.data);
                this.editTarget = "";
                this.editMode = false;
                this.draftData.contents[sid] = response.data.data;
                this.updateView();
            }).catch((error)=>{
                console.error("Error : ",error);
            })            
        },
        saveTitle (newTitle) {
            let url = "http://localhost/edit-draft/";
            window.axios.get(url,{
                params : {
                    id: this.$route.query.articleID,
                    currentMonth : this.$route.query.currentMonth,
                    data : JSON.stringify({title : newTitle}),
                    type : "updateTitle",
                }
            }).then((response)=>{
                console.log("response", response.data);
                this.editTarget = "";
                this.editMode = false;
            }).catch((error)=>{
                console.error("Error : ",error);
            })
        },
        updateCoverInfo(){
            let credits = this.draftData.coverCredits;
            console.log("updating cover info");
            let coverUpdateInput = document.getElementById("updateCover");
            let file; file;
            if(coverUpdateInput.files.length !== 0){
                file = coverUpdateInput.files[0];
            }
            let formData = new FormData();
            formData.append("file",file);
            console.log("file",file);
            formData.append("credits",credits);
            formData.append("type","updateCoverInfo");
            formData.append("folder",this.draftData.folder);
            formData.append("id",this.draftData.id)
            let url = "http://localhost/create-draft/";
            window.axios.post(url,formData,{
                headers : {
                    "Content-Type" : "multipart/form"
                }
            }).then(res=>{
                console.log("saved cover info success", res.data)
                this.draftData.coverCredits = res.data.credits;
                if(file){
                    this.draftData.coverImageFileExtension = res.data.coverImageFileExtension;
                    this.draftData.coverImageFileName = res.data.coverImageFileName;                    
                }

                this.editTarget = "";
                this.editMode = false;
            }).
            catch((err)=>{
                console.log("error", err);
            })
        },
        updateCategory () {
            let newCat = this.category;
            console.log("updating category",newCat)
            let url = "http://localhost/edit-draft/";
            window.axios.get(url,{
                params : {
                    id: this.$route.query.articleID,
                    currentMonth : this.$route.query.currentMonth,
                    data : JSON.stringify({cat : newCat}),
                    type : "updateCat",
                }
            }).then((response)=>{
                console.log("response", response.data);
                this.draftData.category = newCat;
                this.editTarget = "";
                this.editMode = false;
            }).catch((error)=>{
                console.error("Error : ",error);
            })
        },
        updatePostImageSection (sid) {
            let currentImgCredits = this.currentImgCredits;
            let fileInput = document.getElementById("editImageInput");
            let file;
            if(fileInput.files.length !== 0){
                file = fileInput.files[0];
            }
            console.log(sid,currentImgCredits,fileInput.files);
            let formData = new FormData();
            formData.append("sid",sid);
            formData.append("credits",currentImgCredits);
            formData.append("file",file);
            formData.append("folder",this.draftData.folder);
            formData.append("id",this.draftData.id);
            formData.append("type","updatePostImage");
            let url = "http://localhost/create-draft/";
            window.axios.post(url,formData,{
                headers : {
                    "Content-Type" : "multipart/form"
                }
            }).then(res=>{
                console.log("saved cover info success", res.data)
                this.currentImgCredits = "";
                console.log("daraft data", this.draftData.contents[sid],sid)
                this.draftData.contents[sid] = res.data.data;
                this.updateView();
                if(file){
                console;
                }
                this.editTarget = "";
                this.editMode = false;
            }).
            catch((err)=>{
                console.log("error", err);
            })
        },
        updateView(){
            this.draftData.order.push({});
            this.draftData.order.pop();
        },
        deleteSection(sid,folder=this.$route.query.currentMonth){
            console.log(sid,folder,"deleting the section now.",this.draftData.order.length)
            // find out where it is on the order.
            // splice it and move on with your life.
            let itemIndex = 0;
            for(let each of this.draftData.order){
                console.log(each, sid, each == sid);
                let equal = each == sid;
                if(equal){
                    break;
                }
                itemIndex++;
            }
            console.log("item index is ", itemIndex);
            this.draftData.order.splice(itemIndex,1);
            this.draftData.contents[sid] = null;
            let theNewOrder = this.draftData.order;
            let theNewContents = this.draftData.contents;
            console.log({theNewContents,theNewOrder});
            let url = "http://localhost/edit-draft/";
            window.axios.get(url,{
                params : {
                    id : this.$route.query.articleID,
                    sid,
                    folder : folder ,
                    theNewContents : JSON.stringify(theNewContents),
                    theNewOrder : JSON.stringify(theNewOrder),
                    type : "updateContentsAD",

                }
            }).then(res=>{
                console.log("response from update after delete",res.data);
                this.editMode = false;
            }).catch(err=>{
                console.log("Error : ", err.message)
            })
        },
        copyPreviewLink(){
            navigator.clipboard.writeText(this.previewLink);
            this.$vs.notification({
                title : "Link copied success",
                text: "Preview Link Copied. Paste in the url bar of your browser to preview",
                color: "#98c2ff",
            });
            this.previewCompletedModalActive = false;
        },
        copyPostLink(){
            navigator.clipboard.writeText(this.postLink);
            this.$vs.notification({
                title : "Link copied success",
                text: "Post Link Copied. Paste in the url bar of your browser to see it",
                color: "#98c2ff",
            });
            this.publishCompletedModalActive = false;
        },
        previewDraft(id = this.$route.query.articleID,folder=this.$route.query.currentMonth){
            console.log("previewing draft file");
            let url = "http://localhost/render-preview/";
            window.axios.get(url,{
                params : {
                    id,folder
                }
            }).then(res=>{
                console.log("response from preview draft request", res.data);
                this.previewCompletedModalActive = true;
                this.previewLink = res.data.previewPath;
            }).catch(err=>{
                if(err){
                    console.log("Error from preview render" , err)
                }
            })
        },
        publishDraft(){
            console.log("publishing the draft file");
            let url = "http://localhost/publish-draft/";
            window.axios.get(url,{
                params : {
                    id : this.articleID,
                    folder : this.folder
                }
            }).then(response=>{
                console.log("response_publish", response.data);
                this.postLink = response.data.renderedPath
                this.publishCompletedModalActive = true;
            }).catch(error=>{
                console.error("error_publish",error)
            })
        },
        unpublishDraft(){
            console.log("unpublishing draft");
            let url = "http://localhost/unpublish-post/";
            window.axios.get(url,{
                params : {
                    id : this.articleID,
                    folder : this.folder
                }
            }).then(res=>{
                console.log("response from unpublish draft request", res.data);
                this.$vs.notification({
                    title : "res from the unpublish",
                    text : res.data
                })
            }).catch(err=>{
                if(err){
                    console.log("Error from unpublish draft" , err);
                }
            })
        }
    },
    computed : {
        coverLink : function () {
            if(this.draftData.coverImageFileExtension == "nofile"){
                return "You have not uploaded any cover photo"
            }
            else{
                return this.draftData.coverImageFileName + this.draftData.coverImageFileExtension
            }
        },
        editingCurrent (){
            return this.editTarget;
        },
        sectionsArray(){
            let result = [];
            if(this.draftData.order){
                for(let each of this.draftData.order){
                    result.push(this.draftData.contents[each]);
                }                
            }
            return result;
        }

    },  
    created : function () {
        let id = this.$route.query.articleID;
        let currentMonth = this.$route.query.currentMonth;
        let url = "http://localhost/fetch-data/";
        window.axios.get(url,{
            params : {
                id,currentMonth,type : "fetchArticleData"
            }
        }).then((response)=>{
            console.log(response.data.data);
            this.draftData = response.data.data;
            console.log("this.draftdata", this.draftData);
            this.published();
            this.created();
            this.category = this.draftData.category;
        }).catch(error=>{
            console.log("Req Error", error)
        })
        // send request to fetch the data
        console.log(this.$route.query.articleID + ".json")
    }
}
</script>
<style lang="scss">
.sidebar-container{
    width: 60px;
    border: 1px solid #bbdefb;
    height: 100vh;
    position: fixed;
}
.render:hover{
    cursor : pointer;
}
.edit-contents-container{
    margin-left : 60px;
}
.tool-icon-container > div {
    width: max-content;
    margin: 0px auto;
}
.tool-icon-container  button{
    padding: 5px 2px !important;
}
.tools-container {
    margin-top : 15vh;
}
.fine-box{
    margin : 30px auto 0px auto;
}
.header-area  ,.fine-box{
    padding : 20px;
    border-radius : 10px;
    box-shadow: 0px 0px 10px hsl(193deg 81% 87%);
    height: 100%;
}
.block-edit-input {
    width : 100%;
    border : 1px solid rgb(148, 228, 255);
    height : 220px;
    border-radius : 10px;
    padding : 15px;
    margin-bottom : 15px;
    color : rgb(233, 171, 244);
}
.updateCoverInput {
    border: 1px solid #bbdefb;
    padding: 5px 10px;
    border-radius: 10px;
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
.list-item-edit{
    width: max-content;
}
.list-item-edit i{
    padding-top : 4px;
    padding-bottom : 4px;
}
.list-item-content{
    flex : 1;
}
.list-container{
    align-items: center;
}
.le-btn{
    flex: 1;
    padding: 0px !important;
}
.subheading-edit{
    font-weight: 600 !important;
    font-size: 140%;
}
.item-id-container {
    font-size: 75%;
    border-radius: 24px;
    border: 1px solid #cdcdcd;
    width: max-content;
    padding: 0px 15px;
    color: #a5d6a7;
    position: absolute;
    margin-top: -15px;
    margin-left: 77%;
}
.item-delete-container {
    font-size: 75%;
    color: #f48fb1;
    border: 1px solid;
    width: max-content;
    border-radius: 12px;
    padding: 0px 19px;
    position: absolute;
    margin-top: -15px;
    margin-left: 77%;
}

.item-delete-container:hover{
    cursor : pointer;
    background : #fadce6;
    box-shadow : 0px 0px 10px #f48fb1;
}
.item-delete-container:active{
    background: #b75475;
    cursor : pointer;
    box-shadow : 0px 0px 10px #f48fb1;
}
.insert-edit-h{
    font-weight: 600;
    font-size: 90%;
}
</style>