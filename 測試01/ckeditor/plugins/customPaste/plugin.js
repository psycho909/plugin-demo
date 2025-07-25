CKEDITOR.plugins.add("customPaste", {
	requires: "clipboard",
	init: function (editor) {
		editor.on("paste", function (evt) {
			var fragment = CKEDITOR.htmlParser.fragment.fromHtml(evt.data.dataValue);
			var writer = new CKEDITOR.htmlParser.basicWriter();
			function walk(node) {
				if (node.type === CKEDITOR.NODE_ELEMENT) {
					if (node.attributes.style) delete node.attributes.style;
					if (node.attributes.class) delete node.attributes.class;
					if (node.attributes.id) delete node.attributes.id;
				}
				if (node.children) node.children.forEach(walk);
			}
			fragment.forEach(walk);
			fragment.writeHtml(writer);
			evt.data.dataValue = writer.getHtml();
		});
		editor.on("afterPaste", function () {
			var imgs = editor.document.find("img");
			imgs.toArray().forEach(function (imgElem) {
				var src = imgElem.getAttribute("src");
				if (src && src.indexOf("data:image/") === 0) {
					console.log("發現 base64 圖片，準備上傳");
					// 上傳流程...
				} else {
					console.log("不是 base64 圖片，src:", src);
				}
			});
		});
	}
});
