// 共用的防快取 URL 生成函數
function getNonCachedUrl(url) {
	return `${url}${url.includes("?") ? "&" : "?"}_=${Date.now()}`;
}

// 避免 JSON 快取的 Fetch 方法 (帶重試和超時)
function fetchNonCachedJSON(url, options = {}) {
	const { retries = 2, timeout = 10000 } = options;
	const nonCachedUrl = getNonCachedUrl(url);

	return new Promise((resolve, reject) => {
		// 添加超時控制
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);

		const fetchWithRetry = (retriesLeft) => {
			fetch(nonCachedUrl, {
				signal: controller.signal
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					return response.json();
				})
				.then((data) => {
					clearTimeout(timeoutId);
					console.log("成功載入最新JSON資料");
					resolve(data);
				})
				.catch((error) => {
					if (retriesLeft > 0 && error.name !== "AbortError") {
						console.warn(`重試獲取JSON (剩餘嘗試: ${retriesLeft})...`);
						fetchWithRetry(retriesLeft - 1);
					} else {
						clearTimeout(timeoutId);
						console.error("獲取JSON時發生錯誤:", error);
						reject(error);
					}
				});
		};

		fetchWithRetry(retries);
	});
}

// 動態載入 CSS 文件，避免快取 (返回Promise)
function loadCSS(url) {
	return new Promise((resolve, reject) => {
		const nonCachedUrl = getNonCachedUrl(url);
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = nonCachedUrl;

		link.onload = () => {
			console.log("成功載入最新CSS資料");
			resolve(link);
		};

		link.onerror = (error) => {
			console.error("載入CSS時發生錯誤:", error);
			reject(error);
		};

		document.head.appendChild(link);
	});
}

// 動態獲取JS，避免快取 (帶重試機制)
function fetchNonCachedJS(url, options = {}) {
	const { retries = 2 } = options;

	return new Promise((resolve, reject) => {
		const loadScript = (retriesLeft) => {
			const nonCachedUrl = getNonCachedUrl(url);
			const script = document.createElement("script");
			script.src = nonCachedUrl;

			script.onload = () => {
				console.log("成功載入最新JS資料");
				window.isExternalJSLoaded = true;
				window.dispatchEvent(new Event("externalJSLoaded"));
				resolve(script);
			};

			script.onerror = (error) => {
				if (retriesLeft > 0) {
					console.warn(`重試獲取JS (剩餘嘗試: ${retriesLeft})...`);
					// 移除失敗的腳本
					document.head.removeChild(script);
					loadScript(retriesLeft - 1);
				} else {
					console.error("獲取JS時發生錯誤:", error);
					reject(error);
				}
			};

			document.head.appendChild(script);
		};

		loadScript(retries);
	});
}

// 使用示例
/*
// 載入JSON
fetchNonCachedJSON('data.json')
    .then(data => console.log('資料已載入:', data))
    .catch(err => console.error('無法載入JSON資料:', err));

// 載入CSS
loadCSS('styles.css')
    .then(() => console.log('CSS已套用'))
    .catch(err => console.error('無法載入CSS:', err));

// 載入JS
fetchNonCachedJS('script.js')
    .then(() => console.log('JS已載入'))
    .catch(err => console.error('無法載入JS:', err));
*/
