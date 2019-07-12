const $ = require('jquery')
const indexcss = require('./index.less')

const utils = require('./utils')
const context = {}

class Listener{
	constructor(target,event, fun){
		this.fun = fun
		this.target = target
		this.event = event
	}
	open(){
		$(this.target).on(this.event,this.fun)
	}
	remove(){
		$(this.target).unbind(this.event,this.fun)
		$('.spider-outline').removeClass('spider-outline')
	}
}
const select = new Listener('body', 'click', e => {
	$('.spider-outline').removeClass('spider-outline')
	const $target = $(e.target)
	$target.addClass('spider-outline')
	context.$dom = $target
})
utils.Storage.get('spiderIsOpen').then(res=>{
	console.log(res)
	if(res){
		select.open()
	}else{
		select.remove()
	}
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log(request)
	switch(true){
		case request.rule==0:{
			if(context.$dom){
				if(context.$dom[0].tagName == 'IMG'){
					utils.download(context.$dom[0].src)
				}else{
					context.$dom.find('img').each((index, item) => {
						utils.download(item.src)
					})
				}
			}
		};break
		case request.cmd=='close':{
			select.remove()
		};break
		case request.cmd=='open':{
			select.open()
		};break
	}
});
