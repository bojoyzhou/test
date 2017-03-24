(function(table) {
	table.addEventListener('click', onclick)
	table.addEventListener('mousedown', onmousedown)
	document.addEventListener('mouseup', onmouseup)
	var isChangeCol = false
	var lastSortIndex = null
	var dragTarget = null
	var timestamp = null

	function onclick(e) {
		if (timestamp && Date.now() - timestamp < 300) {
			return
		}
		if (e.target.tagName.toUpperCase() == 'TH') {
			if (lastSortIndex === e.target.cellIndex) {
				var tbody = table.querySelector('tbody')
				var children = Array.prototype.slice.call(tbody.children).reverse()
				for (var i = 0; i < children.length; i++) {
					tbody.appendChild(children[i])
				}
			} else {
				reverse(e.target.cellIndex)
				lastSortIndex = e.target.cellIndex
			}
		}
	}

	function onmousedown(e) {
		if (e.target.tagName.toUpperCase() == 'TH') {
			dragTarget = e.target
			document.addEventListener('mousemove', onmousemove)
		}
	}

	function onmouseup(e) {
		if (isChangeCol) {
			lastSortIndex = null
			document.removeEventListener('mousemove', onmousemove)
			isChangeCol = false
			timestamp = Date.now()
		}
	}

	function onmousemove(e) {
		var index = dragTarget.cellIndex
		var rows = table.querySelectorAll('tr')
		var col = []
		for (var i = 0; i < rows.length; i++) {
			col.push(rows[i].children[index])
		}
		var rect = dragTarget.getBoundingClientRect()
		var clientX = e.clientX,
			p, pindex = index,
			prect
		if (clientX > rect.right) {
			p = dragTarget.nextElementSibling
			while (p) {
				prect = p.getBoundingClientRect()
				if (clientX > prect.left + prect.width / 2) {
					p = p.nextElementSibling
					pindex += 1
					continue
				} else {
					break
				}
			}
		} else if (clientX < rect.left) {
			p = dragTarget.previousElementSibling
			while (p) {
				prect = p.getBoundingClientRect()
				if (clientX < prect.left + prect.width / 2) {
					p = p.previousElementSibling
					pindex -= 1
					continue
				} else {
					break
				}
			}
		}
		if (index > pindex) {
			isChangeCol = true
			return insertBefore(index, pindex)
		} else if (index < pindex) {
			isChangeCol = true
			return insertBefore(pindex, index)
		}
	}

	function insertBefore(a, b) {
		var tbody = table.querySelector('tbody')
		var thead = table.querySelector('thead')
		var row
		row = thead.children[0]
		row.insertBefore(row.children[a], row.children[b])
		for (var i = 0; i < tbody.children.length; i++) {
			row = tbody.children[i];
			row.insertBefore(row.children[a], row.children[b])
		}
	}

	function reverse(index) {
		var tbody = table.querySelector('tbody')
		var arr = Array.prototype.slice.call(tbody.children)
		var sortA = sort.bind(arr)
		sortA(function(a, b) {
			var avalue = a.children[index].textContent,
				bvalue = b.children[index].textContent
			if (!isNaN(parseFloat(avalue))) {
				return parseFloat(avalue) < parseFloat(bvalue)
			} else {
				return avalue < bvalue
			}
		}).forEach(function(tr) {
			tbody.appendChild(tr)
		})
	}
})(document.querySelector('table'))

function sort(func, arr) {
	arr = arr || this
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (func(arr[j], arr[i])) {
				var tmp = arr[i]
				arr[i] = arr[j]
				arr[j] = tmp
			}
		}
	}
	return arr
}


var sortB = sort.bind([2, 3, 4, 1, 2, 4, 2])
var ret = sortB(function(a, b) {
	return a > b
})

console.log(ret)

/**
[
	['1', '农场化肥A', '2', '50', '100', ],
	['2', '飞车道具C', '1', '80', '80', ],
	['3', '空间装扮K', '1', '120', '120', ],
	['4', '农场狗粮C', '4', '60', '240', ],
	['5', '音速种子', '2', '110', '220', ],
	['6', '农场化肥D', '5', '60', '300', ],
	['7', 'AVA装扮C', '1', '300', '300', ],
	['8', '三国道具C', '15', '60', '900', ],
	['9', 'DNF道具B', '4', '300', '1200', ],
	['10', '农场化肥H', '6', '20', '120', ],
	['11', '农场化肥B', '1', '80', '80', ],
	['12', 'Q宠元宝', '100', '1', '100', ],
	['13', '三国道具K', '9', '20', '180', ]
]
**/