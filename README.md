##第一题

这个没什么说的

##第二题

耗费了比较多的时间在这里，主要是关于拖动的效果上面，本来想实现一个当鼠标拖动的时候整列复制一个出来添加透明度然后移动，最后时间原因我还是放弃了。

这里有一个注意点是系统的sort是不稳定排序，这里需要一个稳定的排序，我选择了最简单的冒泡，其他的排序都比较生疏了，很难手写了

##第三题

写法不止一种，我只简单了写了一个setTimeout的（setInterval也是可以的，写法略有不同），如果需要考虑的更加仔细的话，可能需要考虑线程忙碌的情况下，定时器不准确的问题，不过一般应用场景下是忽略这个问题的

##第四题

考虑了很久，实在不确定关于浮点数对于100的乘除是否会有精度问题，最终使用了字符串的方式来处理

## 第五题

这里我使用了previousElemntSibling来向前计数，得到当前dom的index

## 第六题

这题我答得很牵强，也花的很多时间，因为实在没有在表单验证上面用过OOP来解决
如果这题是考察OOP的话，希望可以换题重考

## 第七题

重点在于怎么获取url上面的参数和防止xss注入
获取url参数可以使用正则来提取
```
function getQuery(name, url) {
	var u = arguments[1] || window.location.search,
		reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
		r = u.substr(u.indexOf("\?") + 1).match(reg);
	return r != null ? r[2] : "";
}


document.getElementById('imgid').src = getQuery('imgurl')
document.getElementById('mobileid').textContent = getQuery('mobile')
```
## 第八题
之前的工作内容中并不涉及到编写测试用例的部分，所以不是很清楚应该怎样写，我的想法是需要写出所有可能的情况，然后判断结构是否符合预期

测试重点应该是在输错3次的累加规则是怎么样的，我理解的是每次登录成功会重置这个次数

1. 密码输入正确，预期登录成功
2. 第一次输入错误，第二次正确，预期登录成功
3. 前两次输入错误，第三次正确，预期登录成功
4. 前三次输入错误，第四次登录，预期出现验证码，输入正确密码，预期登录成功
4. 前三次输入错误，第四次登录，预期出现验证码，输入正确密码，预期登录成功，再次连续输错三次密码，才预期出现验证码