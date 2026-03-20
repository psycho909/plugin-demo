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

export function ArtLB(data) {
	var config = {
		addClass: "default lb-art",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterClose: function () {
			gbox.close();
		},
	};

	var HTML = `
		<div class="lb-art-content">
			<img src="${data.img}" alt="" />
			<a href="javascript:;" class="lb-art__btn-download official-bgm-download"></a>
		</div>
	`;
	gbox.open(HTML, config);
}
