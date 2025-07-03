// Loading顯示
export function loadingShow() {
	document.querySelector("#loadingProgress").style.display = "block";
}
// Loading隱藏
export function loadingHide() {
	document.querySelector("#loadingProgress").style.display = "none";
}
// 刪除Cookie
export function deleteCookie(name) {
	return new Promise((resolve, reject) => {
		// 將Cookie的過期日期設為過去的時間，使其失效
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		// 檢查Cookie是否已刪除
		if (!getCookie(name)) {
			resolve();
		} else {
			reject("無法刪除Cookie");
		}
	});
}
// 增加Cookie
export function setCookie(name, value = true, hours = 1) {
	let date = new Date();
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + "; " + expires + "; path=/";
}
// 獲取Cookie
export function getCookie(name) {
	var nameString = name + "=";
	var value = document.cookie.split(";").filter(function (item) {
		return item.indexOf(nameString) > -1;
	});
	if (value.length) {
		return value[0].trim().substring(nameString.length, value[0].length);
	} else {
		return false;
	}
}
export const imgLoading = async (data) => {
	let urlList = [];
	let promiseAll = [];
	let count = 0;
	let all = document.querySelectorAll("*");
	let ignore = ["SCRIPT", "STYLE", "HEAD", "HEAD", "TITLE", "META", "HTML"];
	let regex = /url\("([^"]+)"\)/;
	let promise = (imgUrl) => {
		return new Promise(function (resolve, reject) {
			var img = new Image();
			img.src = imgUrl;
			img.onload = function () {
				count++;
				resolve(true);
			};
			img.onerror = function () {
				count++;
				resolve(false);
			};
		});
	};

	all.forEach(function (v, i) {
		if (ignore.indexOf(v.tagName) > -1) {
			return;
		}
		if (v.tagName == "IMG") {
			urlList.push(v.src);
		}
		if (window.getComputedStyle(v, "::before").backgroundImage !== "none") {
			let matches = window.getComputedStyle(v, "::before").backgroundImage.match(regex);
			if (matches && matches.length >= 2) {
				let extractedUrl = matches[1];
				urlList.push(extractedUrl);
			}
		}
		if (window.getComputedStyle(v, "::after").backgroundImage !== "none") {
			let matches = window.getComputedStyle(v, "::after").backgroundImage.match(regex);
			if (matches && matches.length >= 2) {
				let extractedUrl = matches[1];
				urlList.push(extractedUrl);
			}
		}
		if (window.getComputedStyle(v).backgroundImage !== "none") {
			let matches = window.getComputedStyle(v).backgroundImage.match(regex);
			if (matches && matches.length >= 2) {
				let extractedUrl = matches[1];
				urlList.push(extractedUrl);
			}
		}
	});
	for (let i = 0; i < urlList.length; i++) {
		let p = await promise(urlList[i]);
		promiseAll.push(p);
		data.countNum(count, urlList.length);
	}
	return await Promise.all(promiseAll);
};

/**
 * 說明: 更新視頻元素的寬度和高度，以保持原始寬高比
 * @returns
 * updateScreenSize()
 */
export function updateScreenSize() {
	var targetWidth, targetHeight, videoElement, videoWidth, videoHeight, newWidth, newHeight;

	// 獲取窗口的寬度和高度
	targetWidth = window.innerWidth;
	targetHeight = window.innerHeight;

	// 重新定義並檢查取得視頻元素
	videoElement = document.querySelector("video"); // 假設視頻元素是 <video> 標籤
	if (!videoElement) {
		console.warn("Video element not found");
		return;
	}

	// 獲取視頻元素的原始寬度和高度
	videoWidth = videoElement.videoWidth;
	videoHeight = videoElement.videoHeight;

	// 確保視頻的寬高比有效
	if (!videoWidth || !videoHeight) {
		console.warn("Invalid video dimensions");
		return;
	}

	// 計算新寬度和高度，保持視頻的原始寬高比
	if (targetWidth / targetHeight < videoWidth / videoHeight) {
		// 當窗口的寬高比小於視頻的寬高比時，以高度為基準計算寬度
		newWidth = (targetHeight * videoWidth) / videoHeight;
		newHeight = targetHeight;
	} else {
		// 當窗口的寬高比大於或等於視頻的寬高比時，以寬度為基準計算高度
		newWidth = targetWidth;
		newHeight = (targetWidth * videoHeight) / videoWidth;
	}
	// 設置視頻元素的寬度和高度
	videoElement.style.width = `${newWidth}px`;
	videoElement.style.height = `${newHeight}px`;
}

/**
 * 說明: 檢查所有視頻是否已經加載完成
 * callback: 回調函數
 * @param {*} callback
 * @returns
 * checkAllVideosLoaded(function(isLoaded) {})
 */
export function checkAllVideosLoaded(callback) {
	var videos = document.querySelectorAll("video");
	var videosCount = videos.length;
	var loadedCount = 0;

	if (videosCount === 0) {
		console.warn("No video elements found");
		callback(true); // 沒有視頻元素，認為已經加載完成
		return;
	}

	function onVideoLoaded() {
		loadedCount++;
		if (loadedCount === videosCount) {
			callback(true); // 所有視頻元素已經加載完成
		}
	}

	videos.forEach(function (video) {
		if (video.readyState >= 2) {
			// 如果視頻已經加載
			onVideoLoaded();
		} else {
			// 為尚未加載的視頻添加事件監聽器
			video.addEventListener("loadeddata", onVideoLoaded);
		}
	});
}

/**
 * 說明: 檢查視頻是否已經播放完畢
 * videoElement: 視頻元素
 * callback: 回調函數
 * detectVideoEnd($(".layer-page video")[0],function(){
 *    console.log("Video ended");
 * })
 */
export function detectVideoEnd(videoElement, callback) {
	if (!videoElement) {
		console.warn("Video element not found");
		return;
	}

	videoElement.addEventListener("ended", function () {
		callback();
	});
}

/**
 * 說明: 檢查網址的hash值是否符合目標hash值
 * targetHash: 目標hash值
 * @param {*} targetHash
 * @returns
 */
export function checkHash(targetHash) {
	var hash = window.location.hash;

	if (hash === targetHash || hash === "") {
		return true;
	} else {
		return false;
	}
}
/**
 * 說明：獲取網址的hash值
 * @param {string} hash
 */
export function getHash() {
	var hash = window.location.hash;

	if (hash) {
		return hash;
	} else {
		return "";
	}
}

// 說明: 獲取網址參數
// 傳入key值，回傳對應的value，並轉小寫
export function getUrlSearchParams(params) {
	let param = new URL(location.href).searchParams.get(params.toLowerCase());
	if (param) {
		let lan_param = param.toLowerCase();
		return lan_param;
	} else {
		return false;
	}
}

export function getUrlParam(param) {
	let url = window.location.href;
	const urlObject = new URL(url);

	const queryParam = urlObject.searchParams.get(param);
	if (queryParam !== null) {
		return queryParam;
	}

	const hashPart = urlObject.hash.slice(1);

	const queryIndex = hashPart.indexOf("?");
	if (queryIndex !== -1) {
		const hashQuery = hashPart.slice(queryIndex + 1);
		const hashParams = new URLSearchParams(hashQuery);
		return hashParams.get(param);
	}
	return null;
}

// 取得影片資訊
export const getVideoMetadata = (url, data) => {
	return new Promise((resolve) => {
		const video = document.createElement("video");
		video.onloadedmetadata = () => {
			data.videoWidth = video.videoWidth;
			data.videoHeight = video.videoHeight;
		};
		video.oncanplaythrough = () => {
			resolve(url);
		};
		video.src = url;
	});
};

export function escapeHTML(str) {
	return str.replace(/[&<>"']/g, function (match) {
		return {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
		}[match];
	});
}
export function formatNumberWithCommas(number) {
	if (number) {
		return number.toLocaleString();
	} else {
		return 0;
	}
}
export const isMp4 = (url) => {
	var ext = url.split(".").pop().toLowerCase();
	return ext === "mp4";
};
export function checkVideoCanPlay(url) {
	return new Promise((resolve, reject) => {
		const video = document.createElement("video");

		video.oncanplaythrough = () => {
			resolve(url);
			video.remove();
		};

		video.onerror = () => {
			reject(new Error("Video cannot be played"));
			video.remove();
		};

		video.src = url;
		video.load();
	});
}
