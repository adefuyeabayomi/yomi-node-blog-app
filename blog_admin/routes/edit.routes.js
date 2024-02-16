const edit = require("../controllers/edit.controller")

let edit_schema = {
    response: {
        200 : {
            type: 'object',
            additionalProperties: true,
            properties : {
                message : {
                    type: 'string',
                }
            },
            required: ['message']
        }
    },
    body: {
        type: 'object',
        additionalProperties: true,
    }
}

let editDraft = {
    method: "PUT",
    url: "/:blogid/edit-draft/:draftid",
    schema: edit_schema,
    handler: edit
}

module.exports = editDraft
