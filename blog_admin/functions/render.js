const path = require("path")
const editJson = require("edit-json-file")
const interpolate = require("string-interpolation-js").default
const getRandom = require("../utils/randomArrEle")
const fs = require("fs")
const moment = require("moment")

//render-assets
let header_temp = path.join(__dirname,`../render-assets/header-temp.html`)
let pathToArticleTemp = path.join(__dirname,"../render-assets/article-temp.html");        
let pathToImageTemp = path.join(__dirname,"../render-assets/image-temp.html");
let pathToSubHeadingTemp = path.join(__dirname,"../render-assets/subheading-temp.html");
let pathToParaTemp = path.join(__dirname,"../render-assets/para-temp.html");
let listItemTemp = "<li> :item </li> \n";
let pathToListTemp = path.join(__dirname,"../render-assets/list-temp.html");
let pathToCatTemp = path.join(__dirname,"../render-assets/more-in-cat-temp.html");
let pathToMoreCatItem = path.join(__dirname,"../render-assets/more-cat-item.html");
//load all the render assets.
let headerTempStr = fs.readFileSync(header_temp).toString()
let imageSectionTemp = fs.readFileSync(pathToImageTemp).toString();
let subHeadingSection = fs.readFileSync(pathToSubHeadingTemp).toString();
let listSection = fs.readFileSync(pathToListTemp).toString();
let paragraphSection = fs.readFileSync(pathToParaTemp).toString();
let moreInCat = fs.readFileSync(pathToCatTemp).toString();        
let articleTempFile = fs.readFileSync(pathToArticleTemp).toString();
let moreCatItem = fs.readFileSync(pathToMoreCatItem).toString();
let preview_page_temp = fs.readFileSync(path.join(__dirname,'../render-assets/preview-render-temp.html')).toString()
let article_page_temp = fs.readFileSync(path.join(__dirname,'../render-assets/article-temp.html')).toString()
let cat_page_temp = fs.readFileSync(path.join(__dirname,'../render-assets/catTemp.html')).toString()
let home_page_temp = fs.readFileSync(path.join(__dirname,'../render-assets/homepage-main.html')).toString()
let catTop = fs.readFileSync(path.join(__dirname,"../render-assets/cat-top-temp.html")).toString()
let catMostRecent = fs.readFileSync(path.join(__dirname,"../render-assets/cat-most-recent.html")).toString() 
let homeItemTemp = fs.readFileSync(path.join(__dirname,"../render-assets/home-item-temp.html")).toString()
let homeCat = fs.readFileSync(path.join(__dirname,"../render-assets/home-category.html")).toString()

function fetchDraft(blogid,draftid){
    let path_to_article_json = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
    let draft = editJson(path_to_article_json).read()
    return draft
}
// generator functions only return the strings they were meant to return. Its easier to maintain and see what you're accomplishing.
function generateLinkItem(resourceLink, resourceName){
    return `\n<li><a href="${resourceLink}">${resourceName}</a></li>\n`
}

function generateHeader(blogid,category){
    // Logo Link --> link to logo
    // category --> category name
    // allCat --> rest of category
    let template = headerTempStr
    let admin_data_blogs = path.join(__dirname,`../admin_data/blogs.json`)
    let blogData = editJson(admin_data_blogs).read()[blogid]
    let logoLink = `./blog_assets/images/${blogData.logo.name}${blogData.logo.extension}`
    let catLinks = blogData.categories.map(x=>{
        let link = `./${x}.html`
        return generateLinkItem(link,x)
    })
    catLinks.unshift(generateLinkItem('./index.html','Home'))
    catLinks = catLinks.join("")
    let iParams = {
        logoLink,
        catLinks
    }
    return interpolate(template,iParams) 
}

function generateImageItem(content){
    console.log({content})
    let template = imageSectionTemp
    let link = `./blog_assets/images/${content.name}${content.extension}`
    let credits = content.credits
    let iParams = {
        link,
        credits
    }
    return interpolate(template,iParams)
}

function generateParagraphItem(content){
    let template = paragraphSection
    let iParams = {
        body : content
    }
    return interpolate(template,iParams)
}

function generateSubheadingItem(content){
    let template = subHeadingSection
    let iParams = {
        body: content
    }
    return interpolate(template,iParams)
}

function generateListItem(content){
    let template = listItemTemp
    let iParams = {
        item: content
    }
    return interpolate(template,iParams)
}

function generateList(content){
    content = content.map(item=>{
        return generateListItem(item.itemContent)
    }).join("\n")

    let template = listSection
    let iParams = {
        body : content
    }
    return interpolate(template,iParams)
}

function generateMoreCatItem(article){
    // takes an article temp and creates a more in category item from it
    let firstPara = ''
    for(let sid of article.order){
        if(article.contents[sid].type == 'paragraph'){
            firstDraftPara = article.contents.content
            break
        }
    }
    let coverLink = `./blog_assets/images/${article.coverimage.name}${article.coverimage.extension}`
    let iParams = {
        title: article.title,
        firstPara,
        coverLink,
        category: article.category,
        timePublished:  moment(article.published).format("LLLL"),
        link: `./${article.id}.html`
    }
    
    return (template)=>{
        return interpolate(template,iParams)
    } 
}


function renderBody(order,contents){
    order = order.map(sid=>{
        let theContent = contents[sid]
        let type = theContent.type
        let compiled 
        type == 'image' ? compiled = generateImageItem(theContent.content) : false
        type == 'list' ? compiled = generateList(theContent.content) : false
        type == 'paragraph' ? compiled = generateParagraphItem(theContent.content) : false
        type == 'subheading' ? compiled = generateSubheadingItem(theContent.content) : false
        return compiled
    })

    return order.join("\n")
}

function renderMoreInCategory(topInCat,cat_articles){
    let template = moreInCat
    topInCat = topInCat.map( x =>{
        let article = cat_articles.filter(article => {
            return article.id == x
        })[0]
        // the content is of type article, i.e top in cat is an array, cat_articles are actually articles. 
        return article ? generateMoreCatItem(article)(moreCatItem) : ""
    }).join("\n")

    let iParams = {
        categoryItemsBody : topInCat
    }
    return interpolate(template,iParams)
}

function renderPreview(article_json){
    let body = renderBody(article_json.order,article_json.contents)
    let template = preview_page_temp
    let iParams= {
        title : article_json.title,
        category: article_json.category,
        covercredits: article_json.coverimage.credits,
        coverImageLink : "../blog_assets/images/" + article_json.coverimage.name + article_json.coverimage.extension,
        articleBody: body
    }
    return interpolate(template,iParams)
}

function renderArticle(article_json,topInCat,blogid){
    let header = generateHeader(blogid,article_json.category)
    // make sure this section is updated to fit the 
    let top4 =topInCat.slice(0,4)
    top4 = top4.map(draftid=>{
        let _path_to_article = path.join(__dirname,`../articles_json/${blogid}/${draftid}.json`)
        return(editJson(_path_to_article).read())
    })
    let template = article_page_temp
    let body = renderBody(article_json.order,article_json.contents)
    let moreInCategory = renderMoreInCategory(topInCat,top4)
    let timePublished = article_json.published
    let iParams = {
        title : article_json.title,
        category: article_json.category,
        timePublished,
        covercredits: article_json.coverimage.credits,
        coverImageLink : "./blog_assets/images/" + article_json.coverimage.name + article_json.coverimage.extension,
        articleBody: body,
        moreInCategory,
        header
    }
    return interpolate(template,iParams)
}


function renderHomeItems(arr,blogid){
    arr = arr.map(draftid=>{
        let article = fetchDraft(blogid,draftid)
        return generateMoreCatItem(article)(homeItemTemp)
    })
    return arr
}

function renderHome(blogid){
    let header = generateHeader(blogid,'homepage')
    let path_to_blog_data = path.join(__dirname,`../articles_json/compose/${blogid}.pages_data.json`)
    let blog_json = editJson(path_to_blog_data,{
        autosave: true
    })
    let blog_data = blog_json.read()
    let page_data = blog_data["homepage"]
    let top = page_data.top
    let recent = page_data.more.slice(0,5)
    //let therest = page_data.more.slice(5,page_data.more.length-1)
    top = renderHomeItems(top,blogid)
    recent = renderHomeItems(recent,blogid)
    let categories = Object.keys(blog_data)
    for(let each of categories){
        renderCategory(each,blogid)
    }
    categories = categories.filter(x=>x!=='homepage')
    categories = categories.map(x=>{
        let theCat = blog_data[x]
        let more = theCat.more.slice(0,4)
        more= renderHomeItems(more,blogid)
        more.unshift(`Top in ${x} Category`)
        return interpolate(homeCat,more)
    })
    let homeProperties = {
    header,
    otherCategories : ""
    }
    let topCount = 1
    let recentCount = 1
    let categoryCount = 1
    for(let each of top){
        let prop = `topPosts${topCount}`
        homeProperties[prop] = each;
        topCount++
    }
    
    for(let each of recent){
        let prop = `mostRecent${recentCount}`
        homeProperties[prop] = each;
        recentCount++
    }

    for(let each of categories){
        if(categoryCount > 1){
            homeProperties.otherCategories += `${each}\n`
        }   
        else {
            let prop = `category${categoryCount}`
            homeProperties[prop] = each;
            categoryCount++
        }
    }

    let HomeHTML = interpolate(home_page_temp,homeProperties)
    let pathToHome = path.join(__dirname,`../../blog_folder_${blogid}/index.html`)
    fs.writeFileSync(pathToHome,HomeHTML)
    return pathToHome
}

function renderCategory(category,blogid){
    let header = generateHeader(blogid,category)
    let path_to_blog_data = path.join(__dirname,`../articles_json/compose/${blogid}.pages_data.json`)
    let blog_json = editJson(path_to_blog_data,{
        autosave: true
    })

    let blog_data = blog_json.read()
    let page_data = blog_data[category]
    let top = page_data.top
    let recent = page_data.more.slice(0,4)
    let therest = page_data.more.slice(6,page_data.more.length-1)

    top = renderHomeItems(top,blogid)

    recent = renderHomeItems(recent, blogid)

    console.log(top.length,recent.length,{top,recent})
    
    therest = renderHomeItems(therest, blogid)

    top = interpolate(catTop,top)

    recent = interpolate(catMostRecent,recent)

    therest = therest.join("\n")
    let template = cat_page_temp
    let iParams = {
        pagename: category,
        catTop: top,
        catMostRecent: recent,
        catMore: therest,
        header
    }
    let catHTML = interpolate(template,iParams)
    let pathToCat = path.join(__dirname,`../../blog_folder_${blogid}/${category}.html`)
    fs.writeFileSync(pathToCat,catHTML)
    renderCatArticles(blog_data,category,blogid)
    return pathToCat
}

function renderCatArticles(blog_data,category,blogid){
    let catData= blog_data[category]
    let allCatPosts = catData.top.concat(catData.more)
    allCatPosts.forEach(draftid=>{
        let rendered = renderArticle(fetchDraft(blogid,draftid),catData.top,blogid)
        let blog_post_file = path.join(__dirname,`../../blog_folder_${blogid}/${draftid}.html`)
        fs.writeFileSync(blog_post_file, rendered)
    })
}

module.exports = {
    renderPreview,
    renderArticle,
    renderHome,
    renderCategory
}
