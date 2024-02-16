const newDraft = require("../controllers/create.controller")

let createNewSchema = {

    body: {
        type: 'object',
        additionalProperties : false,
        properties : {
            title: {type: 'string'},
            category: {type: 'string'}
        },
        required: ['title', 'category']
    },

    response : {
        201 : {
            type: 'object',
            additionalProperties: false,
            properties : {
                message : {type : 'string'},
                aid : {type : 'string'},
            },
            required: ['message','aid']
        }
    }

}

let createRoute = {
    method: "POST",
    url: "/:blogid/draft",
    schema: createNewSchema,
    handler : newDraft,
}

module.exports = createRoute