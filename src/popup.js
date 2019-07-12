const $  = require('jquery')
const utils = require('./utils/index')
const $button = $('.switch-button')
window.$ = $
const Background = chrome.extension.getBackgroundPage();
const init = async function(){
	const spiderIsOpen = await utils.Storage.get('spiderIsOpen')
	Background.downloadChange(spiderIsOpen)
	const $switch = $('.switch')
	if(spiderIsOpen){
		$switch.addClass('left')
	}else{
		$switch.removeClass('left')
	}
	$switch.on('click',function(){
		if($(this).hasClass('left')){
			$(this).removeClass('left')
			closeSpider()
		}else{
			$(this).addClass('left')	
			openSpider()
		}
	})
}
init()


function closeSpider(){
	utils.sendMessageToContentScript({cmd:'close'});
	utils.Storage.set({'spiderIsOpen':false})
	Background.downloadChange(false)
}

function openSpider(){
	utils.sendMessageToContentScript({cmd:'open'});
	utils.Storage.set({'spiderIsOpen':true})
	Background.downloadChange(true)
}