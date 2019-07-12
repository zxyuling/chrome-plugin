(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const $ = __webpack_require__(1)
const indexcss = __webpack_require__(2)

const utils = __webpack_require__(3)
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


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
],[[0,0,2]]]);