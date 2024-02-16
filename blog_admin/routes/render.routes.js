const render = require("../controllers/render.controller")

let previewRoute = {
    method: "GET",
    url : "/:blogid/preview/:draftid",
    handler: render.preview
}

let articleRoute = {
    method: "GET",
    url: "/:blogid/render-article/:draftid",
    handler: render.article
}

let homeRoute = {
    method: "GET",
    url : "/:blogid/render-home",
    handler: render.homepage
}

let categoryRoute = {
    method: "GET",
    url : "/:blogid/render-category/:category",
    handler: render.category
}

module.exports = {
    previewRoute,
    articleRoute,
    homeRoute,
    categoryRoute
}