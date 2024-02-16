const {getDraft, getCatDrafts} = require("../controllers/retrieve.controller")

let getDraftSchema = {
    response: {
        200 : {
            type: 'object',
            properties: {
                draft_data: {
                    type: 'object',
                    additionalProperties: true
                },
            },
            required: ['draft_data']
        }
    }
}

let getCatDraftsSchema = {
    response: {
        200: {
            type : 'object',
            properties : {
                draftContents: {
                    type : 'object',
                    properties : {
                        category : {type: 'string'},
                        published : {type: 'string'},
                        title : {type: 'string'},
                        id : {type: 'string'},
                        initialized : {type: 'string'},
                    },
                    additionalProperties: false
                }
            },
            additionalProperties: true
        }
    }
}

let getDraftRoute = {
    method: "GET",
    url : "/:blogid/draft/:category/:draftid",
    handler: getDraft
}

let getCatDraftsRoute = {
    method: "GET",
    url: "/:blogid/draft/:category",
    handler: getCatDrafts,
}

module.exports = { getDraftRoute , getCatDraftsRoute }