import page1 from "./components/page1.js";

// 避免JSON快取的Fetch方法
function fetchNonCachedJSON(url) {
	// 使用時間戳動態產生唯一查詢參數
	const nonCachedUrl = `${url}?_=${new Date().getTime()}`;

	return fetch(nonCachedUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("成功載入最新JSON資料");
			return data;
		})
		.catch((error) => {
			console.error("獲取JSON時發生錯誤:", error);
		});
}
// 動態載入 CSS 文件，避免快取
function loadCSS(url) {
	const timestamp = new Date().getTime(); // 生成唯一時間戳
	const fullUrl = `${url}?_=${timestamp}`; // 加上時間戳參數
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = fullUrl; // 動態設置 href

	document.head.appendChild(link); // 加入到 <head> 中
}

// 在頁面載入時動態加載 CSS
// document.addEventListener("DOMContentLoaded", () => {
// 	loadCSS("styles.css"); // 將 'styles.css' 替換為你的 CSS 檔案路徑
// });
function fetchNonCachedJS(url) {
	// 使用時間戳動態產生唯一查詢參數
	const nonCachedUrl = `${url}?_=${new Date().getTime()}`;

	const script = document.createElement("script");
	script.src = nonCachedUrl;

	return new Promise((resolve, reject) => {
		script.onload = () => {
			console.log("成功載入最新JS資料");
			// 設置全局標記
			window.isExternalJSLoaded = true;
			// 觸發自定義事件
			window.dispatchEvent(new Event("externalJSLoaded"));
			resolve();
		};
		script.onerror = (error) => {
			console.error("獲取JS時發生錯誤:", error);
			reject(error);
		};
		document.head.appendChild(script);
	});
}
// 使用範例
// fetchNonCachedJSON("data.json").then((data) => {
// 	// 處理載入的資料
// 	console.log(data);
// });
// vue3

async function initializeApp() {
	// 先載入 JS
	await fetchNonCachedJS("https://tw.hicdn.beanfun.com/beanfun/promo/Test/t/tools.js");
	let app = Vue.createApp({
		components: {
			page1: page1
		},
		setup() {
			let data = Vue.ref(null);
			let fetchData = async () => {
				data.value = await fetchNonCachedJSON("https://tw.hicdn.beanfun.com/beanfun/promo/Test/t/data.json");
			};
			Vue.onMounted(() => {
				fetchData();
			});
			return {
				data
			};
		}
	});
	app.mount("#app");
}

initializeApp();
