
let catHandler = require("../controllers/category.controller")

let updateCatRoute = {
    method: "POST",
    url: "/:blogid/category",
    handler: catHandler.updateCat
}

module.exports = {
    updateCatRoute
}