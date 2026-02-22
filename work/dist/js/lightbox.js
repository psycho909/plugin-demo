import useEventStore from "./store.js";

export function MessageLB(msg, url, callback) {
	gbox.open(msg, {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			if (url) window.location.href = url;
		},
	});
}

export function LB(msg, url, callback) {
	var config = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: true,
		afterClose: function () {
			gbox.close();
		},
		actionBtns: [
			{
				text: "text1",
				class: "btn",
				click: function () {
					gbox.close();
				},
			},
			{
				text: "text2",
				class: "btn",
				click: function () {
					gbox.close();
				},
			},
		],
	};

	var HTML = "";
	gbox.open(HTML, config);
}
