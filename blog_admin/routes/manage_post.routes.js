const { unpublish, publish, delete_draft, preview } =  require("../controllers/manage_post.controller")

let manage_schema = {
    body: {
        type: 'object',
        additionalProperties : true
    },
    response : {
        200 : {
            type: 'object',
            additionalProperties: true
        }
    }
}

let unpublishRoute = {
    method: "POST",
    schema: manage_schema,
    handler: unpublish,
    url: "/:blogid/manage-post/unpublish/:draftid"
}

let publishRoute = {
    method: "POST",
    schema: manage_schema,
    handler: publish,
    url: "/:blogid/manage-post/publish/:draftid"
}

let delete_draft_Route = {
    method: "POST",
    schema: manage_schema,
    handler: delete_draft,
    url: "/:blogid/manage-post/delete_draft/:draftid"
}

let preview_Route = {
    method: "POST",
    schema: manage_schema,
    handler: preview,
    url: "/manage-post/preview/:aid"
}


module.exports = {
    unpublishRoute,
    publishRoute,
    delete_draft_Route,
    preview_Route
}