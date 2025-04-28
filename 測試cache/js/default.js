import page1 from "./components/page1.js";

// 在頁面載入時動態加載 CSS
document.addEventListener("DOMContentLoaded", () => {
	loadCSS("https://tw.hicdn.beanfun.com/beanfun/promo/Test/t/assets/css/fix.css"); // 將 'styles.css' 替換為你的 CSS 檔案路徑
});

// 使用範例
// fetchNonCachedJSON("data.json").then((data) => {
// 	// 處理載入的資料
// 	console.log(data);
// });
// vue3

async function initializeApp() {
	try {
		// 先載入 JS
		await fetchNonCachedJS("https://tw.hicdn.beanfun.com/beanfun/promo/Test/t/tools.js");

		let app = Vue.createApp({
			components: {
				page1: page1
			},
			setup() {
				let data = Vue.ref(null);
				let loading = Vue.ref(true);
				let error = Vue.ref(null);

				let fetchData = async () => {
					try {
						loading.value = true;
						data.value = await fetchNonCachedJSON("https://tw.hicdn.beanfun.com/beanfun/promo/Test/t/data.json");
					} catch (err) {
						error.value = "資料載入失敗";
						console.error(err);
					} finally {
						loading.value = false;
					}
				};

				Vue.onMounted(() => {
					fetchData();
				});

				return {
					data,
					loading,
					error
				};
			}
		});

		app.mount("#app");
	} catch (err) {
		console.error("初始化應用失敗:", err);
		// 顯示一些友好的錯誤信息給用戶
		document.getElementById("app").innerHTML = "應用載入失敗，請重新整理頁面";
	}
}

initializeApp();
