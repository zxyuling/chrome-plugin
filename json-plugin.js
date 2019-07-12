const fs = require('fs')
class jsonplugin{
	constructor(option){
		this.option = option
	}
	apply(compiler){
		compiler.hooks.afterEmit.tap('json',function(compilation){
			fs.readFile(__dirname + '/manifest.json',function(err,data){
				fs.writeFile(compilation.compiler.outputPath + '/manifest.json', data, () => {})
			})
		})
	}
}
module.exports = jsonplugin