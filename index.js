const context = {}
$('body').on('click',e=>{
	$('.spider-outline').removeClass('spider-outline')
	const $target = $(e.target)
	$target.addClass('spider-outline')
	context.$dom = $target
})
const getName = (src) => {
	if(/base64/.test(src)){
		return +new Date()
	}else{
		const url = src.match(/([^?]*)\??/)[1]||''
		const pathArray = url.split(/\\|\//)
		const firstName = pathArray[pathArray.length-1]
		const firstNameArray = firstName.split('.')
		firstNameArray.pop()
		const nameEx = firstNameArray[firstNameArray.length-1]
		const name = firstNameArray.join('')
		return name
	}
}
var loadImageToBlob  = function(url) {
	return new Promise((res,rej)=>{
		if(!url) return false;
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = 'blob';
		xhr.onload = function() {
			this.status == 200 ? res(this.response) : rej(false)
		}
		xhr.send();
		return true;
	})
}

const downImage = ($dom) => {
	$dom.find('img').each((index,item)=>{
		const name = getName(item.src)
		loadImageToBlob(item.src).then(res=>{		
			$(`<a href="${URL.createObjectURL(res)}" download=${name} target="_blank"></a>`)[0].click()
		})	
		
		
	})
}
const custom = ($dom) => {
	chrome.runtime.sendMessage({$dom}, function(response) {
	    console.log('收到来自后台的回复：' + response);
	})
}
const dom2str = ($dom) => {
	return $('<html></html>').append($dom.clone())[0].innerHTML
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	switch(true){
		case request.cmd=='download':{
			loadImageToBlob(request.src).then(res=>{		
			$(`<a href="${URL.createObjectURL(res)}" download=${name} target="_blank"></a>`)[0].click()
		})
		};break
		case request.rule==1:sendResponse(dom2str(context.$dom));break
		case request.rule==0:downImage(context.$dom);break
	}
});
