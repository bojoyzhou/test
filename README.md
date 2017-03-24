
重点在于怎么获取url上面的参数和防止xss注入
获取url参数可以使用正则来提取
function getQuery(name, url) {
	var u = arguments[1] || window.location.search,
		reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
		r = u.substr(u.indexOf("\?") + 1).match(reg);
	return r != null ? r[2] : "";
}


document.getElementById('imgid').src = getQuery('imgurl')
document.getElementById('mobileid').src = getQuery('mobile')

之前的工作内容中并不涉及到编写测试用例的部分，所以不是很清楚应该怎样写，我的想法是需要写出所有可能的情况，然后判断结构是否符合预期
测试重点应该是在输错3次的累加规则是怎么样的，我理解的是每次登录成功会重置这个次数

1. 密码输入正确，预期登录成功
2. 第一次输入错误，第二次正确，预期登录成功
3. 前两次输入错误，第三次正确，预期登录成功
4. 前三次输入错误，第四次登录，预期出现验证码，输入正确密码，预期登录成功
4. 前三次输入错误，第四次登录，预期出现验证码，输入正确密码，预期登录成功，再次连续输错三次密码，才预期出现验证码