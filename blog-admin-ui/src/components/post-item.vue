<template>
    <div class="col-12 col-sm-6 col-md-4">
        <div class="content-main p-2 m-2">
            <div class="mc-main">
                <div class="menu-container"><vs-button border color="#51b1ff" @click="openPostMenu(draft.id,draft)"><i class="fas fa-ellipsis-v"></i></vs-button></div>
            </div>
            <div v-if="menuItem == draft.id" class="content-menu-container">
                <p class="pointercursor" @click="addCategoryTop()">Make Top In Category</p>
                <div class="divider m-1"></div>
                <p class="pointercursor">Delete</p>
                <div class="divider m-1" v-if="draft.published == (null || '')"></div>
                <p class="pointercursor" v-if="draft.published == ''">Publish Draft</p>
                <div class="divider m-1" v-if="draft.published !== ''"></div>
                <p class="pointercursor" v-if="draft.published !== ''">Unpublish Draft</p>
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
</template>
<script>
export default {
    data: function () {
        return {}
    },
    props: {
        draft: Object,
        menuItem: String
    },
    created() {
        console.log("props", this.draft)
    }
}
</script>