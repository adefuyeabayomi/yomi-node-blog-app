const path = require("path")
const fs = require("fs")
let generateID = require("../utils/generateID")

function saveImage (blogid, file , credits){
    file.name = file.name.replaceAll("(","")
    file.name = file.name.replaceAll(")","")

    let parsed = path.parse(file.name)
    let name = parsed.name.split(" ").join("_") + generateID(10)
    let extension = parsed.ext
    let imagePathAbs = path.join(__dirname,`../../blog_folder_${blogid}/blog_assets/images/${name + extension}`)
    fs.writeFileSync(imagePathAbs,file.data)
    console.log("image created success",{ name , extension , credits })
    return { name , extension , credits }
}

module.exports = saveImage