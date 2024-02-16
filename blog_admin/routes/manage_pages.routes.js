const manage_page = require("../controllers/manage_pages.controller")

let manage_page_schema = {
    body: {
        type: 'object',
        properties : {
            draftid : {type: 'string'},
            type: {type: 'string'},
            page: {type: 'string'}
        },
        required: ['draftid','type','page']
    },
    response: {
        200 : {
            type: 'object',
            additionalProperties: true
        }
    }
}

let manage_page_route = {
    method: "POST",
    schema: manage_page_schema,
    url: "/:blogid/manage-page",
    handler : manage_page
}

module.exports = manage_page_route