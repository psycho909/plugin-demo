function Hello() {
	alert("Hello World");
}

// 數字轉千位符
function toThousands(num) {
	return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}
