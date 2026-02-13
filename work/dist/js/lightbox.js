import useEventStore from "./store.js";

export function MessageLB(msg, url, callback) {
	$.gbox.open(msg, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			if (url) window.location.href = url;
		},
		actionBtns: [
			{
				text: "確定",
				class: "btn-confirm",
				target: false,
				click: function () {
					if (url) window.location.href = url;
					else {
						$.gbox.close();
						if (callback) {
							callback();
						}
					}
				},
			},
			{
				text: "取消",
				class: "btn-cancel",
				click: function () {
					$.gbox.close();
				},
			},
		],
	});
}

export function LB(msg, url, callback) {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			$.gbox.close();
		},
		actionBtns: [
			{
				text: "text1",
				class: "btn",
				click: function () {
					$.gbox.close();
				},
			},
			{
				text: "text2",
				class: "btn",
				click: function () {
					$.gbox.close();
				},
			},
		],
	};

	var HTML = "";
	$.gbox.open(HTML, config);
}
