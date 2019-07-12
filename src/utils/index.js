const $ = require('jquery')

const  loadFileToBlob  = function(url) {
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

module.exports = {
	download(src){
		const name = getName(src)
		loadFileToBlob(src).then(res=>{		
			$(`<a href="${URL.createObjectURL(res)}" download=${name} target="_blank"></a>`)[0].click()
		})
	},
	sendMessageToContentScript(message,callback){
	    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	    {
	        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
	        {
	            if(callback) callback(response);
	        });
	    });
	},
	Storage: {
		set(op){
			return new Promise(function(res, rej){
				chrome.storage.sync.set(op,res)
			})
		},
		get(key){
			return new Promise(function(res, rej){
				chrome.storage.sync.get(key,result=>res(result[key]))
			})
		}
	}
}