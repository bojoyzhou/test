(function(data) {
	var i, j, k, table = [],
		row, cell, newRow, temp = {}
	for (i = 0; i < data.length; i++) {
		row = data[i]
		newRow = []
		for (j = 0; j < row.length; j++) {
			if(temp[i + '_' + j]){
				continue
			}
			cell = [row[j], 1]
			for (k = i + 1; k < data.length; k++) {
				if (data[k][j] == row[j]) {
					cell[1] += 1
					temp[k + '_' + j] = 1
				} else {
					break
				}
			}
			newRow.push(cell)
		}
		table.push(newRow)
	}
	console.log(table)
	var tableElem = document.createElement('table')
	var rowElem = document.createElement('tr')
	var cellElem = document.createElement('td')
	for (i = 0; i < table.length; i++) {
		rowElem = document.createElement('tr')
		row = table[i]
		for (j = 0; j < row.length; j++) {
			cell = row[j]
			cellElem = document.createElement('td')
			cellElem.textContent = cell[0]
			cellElem.setAttribute('rowspan', cell[1])
			rowElem.appendChild(cellElem)
		}
		tableElem.appendChild(rowElem)
	}
	tableElem.setAttribute('border', '1')
	document.body.appendChild(tableElem)
})([
	['qq.com', 'sohu.com', 'baidu.com', 4, 55, 6, 4],
	['qq.com', 'xunlei.com', 'yahoo.com', 4, 6, 5, 4],
	['qq.com', 'sohu.com', 'baidu.com', 1, 6, 7, 4],
	['163.com', 'google.com', 'baidu.com', 8, 5, 7, 5],
	['360.com', 'google.com', 'sina.com', 1, 9, 9, 5]
])