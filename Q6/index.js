function ItemisRequired(form, name, err) {
	this.elem = form[name]
	this.check = function(){
		if(this.elem.value.replace(/(^\s+|\s+$)/,'').length){
			return true
		}else{
			return false
		}
	}
	this.bindEvent()
	this.initError(err)
}
function ItemisSameAs(form, name, err, item) {
	this.elem = form[name]
	this.item = item
	this.check = function(){
		return this.elem.value === this.item.getValue()
	}
	this.bindEvent()
	this.initError(err)
}
function ItemisUrl(form, name, err) {
	this.elem = form[name]
	this.check = function(){
		return !!this.elem.value.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g)
	}
	this.bindEvent()
	this.initError(err)
}
[ItemisRequired,
ItemisSameAs,
ItemisUrl].forEach(function(Item){
	Item.prototype.getValue = function getValue(){
		return this.check() && this.elem.value || null
	}
	Item.prototype.bindEvent = function bindEvent(){
		var that = this
		this.elem.addEventListener('blur', function(){
			if(!that.check()){
				that.showError()
			}else{
				that.hideError()
			}
		})
	}
	Item.prototype.showError = function getValue(){
		return this.error.style.display = 'inline-block'
	}
	Item.prototype.hideError = function getValue(){
		return this.error.style.display = 'none'
	}
	Item.prototype.initError = function initError(errmsg){
		var next = this.elem.nextElementSibling
		var error = document.createElement('span')
		error.className = 'error'
		error.textContent = errmsg
		error.style.display = 'none'
		this.error = error
		if(next){
			this.elem.parentElement.insertBefore(error, next)
		}else{
			this.elem.parentElement.appendChild(error)
		}
	}
})
function Validater(form) {
	this.form = form
	this.items = []
}
Validater.prototype.isRequired = function isRequired(name, err) {
	this.items.push(new ItemisRequired(this.form, name, err))
	return this
}
Validater.prototype.isSameAsLast = function isSameAsLast(name, err){
	this.items.push(new ItemisSameAs(this.form, name, err, this.items[this.items.length - 1]))
	return this
}
Validater.prototype.isUrl = function isUrl(name, err){
	this.items.push(new ItemisUrl(this.form, name, err))
	return this
}
Validater.prototype.check = function(){
	var ret = true
	for(var i = 0;i < this.items.length;i++){
		if(!this.item[i].check()){
			ret = false
		}
	}
	return ret
}
var validater = new Validater(document.getElementById('form'))
validater.isRequired('username', '用户名不能为空')
	.isRequired('password','密码不能为空')
	.isSameAsLast('repassword', '两次密码不一致')
	.isUrl('url','url格式不正确')

// document.getElementById(form)