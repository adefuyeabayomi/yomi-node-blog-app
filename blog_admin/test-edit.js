const editJson = require("edit-json-file");
const path = require("path");
let pathToMain = path.join(__dirname,"/draft-data/data-main.json");
const moment = require("moment")();
let mainFile = editJson(pathToMain,{
    autosave : true
});

let currentMonth = `${moment.format("MMMM")}${moment.format("YYYY")}`;
let a = mainFile.get(currentMonth);

console.log(a,currentMonth,pathToMain)