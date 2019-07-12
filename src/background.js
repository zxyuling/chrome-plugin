const $ = require('jquery')
const utils = require('./utils/index')
const spider = require('./assests/spider.png')
let isDownload = true
const mainId = chrome.contextMenus.create({
    //type: 'normal'， // 类型，可选：["normal", "checkbox", "radio", "separator"]，默认 normal
    title: '小蜘蛛', // 显示的文字，除非为“separator”类型否则此参数必需，如果类型为“selection”，可以使用%s显示选定的文本
    contexts: ['all'], // 上下文环境，可选：["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]，默认page
})
const downloadImg = chrome.contextMenus.create({
    //type: 'normal'， // 类型，可选：["normal", "checkbox", "radio", "separator"]，默认 normal
    title: '下载选区内图片', // 显示的文字，除非为“separator”类型否则此参数必需，如果类型为“selection”，可以使用%s显示选定的文本
    contexts: ['all'], // 上下文环境，可选：["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]，默认page
    parentId:mainId,
    onclick: function(){
        if(isDownload){
    	    utils.sendMessageToContentScript({rule:0});
        }
    }, // 单击时触发的方法
})
window.downloadChange = function(value){
    isDownload = value
}