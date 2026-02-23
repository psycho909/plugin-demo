import { MessageLB } from "./lightbox.js";
import { setCookie, getCookie, deleteCookie, loadingShow, loadingHide } from "./tool.js";
import useEventStore from "./store.js";
import {} from "./api.js";
// MessageLB("目前尚未開放登入，敬請期待後續精彩內容")
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}
function loadCSS(url) {
	const timestamp = new Date().getTime(); // 生成唯一時間戳
	const fullUrl = `${url}?_=${timestamp}`; // 加上時間戳參數
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = fullUrl; // 動態設置 href

	document.head.appendChild(link); // 加入到 <head> 中
}
loadCSS("https://tw.hicdn.beanfun.com/beanfun/event/DragonNest/MileStone2025/assets/css/fix.css");
const pinia = Pinia.createPinia();
const { storeToRefs } = Pinia;

let app = Vue.createApp({
	setup() {
		const store = useEventStore();
		let token = Vue.ref("");
		Vue.onMounted(async () => {
			try {
				await store.loadGameConfig();
			} catch (error) {
				console.error("載入遊戲配置失敗:", error);
			}
		});
		return {};
	}
});
app.use(pinia);
app.mount("#app");

var swiperAd = new Swiper(".main-ad__swiper", {
	navigation: {
		nextEl: ".main-ad__swiper-next",
		prevEl: ".main-ad__swiper-prev"
	}
});

var swiperMall = new Swiper(".main-mall__swiper", {
	navigation: {
		nextEl: ".main-mall__swiper-next",
		prevEl: ".main-mall__swiper-prev"
	}
});

if (typeof createCustomDropdown == "function") {
	createCustomDropdown(document.getElementById("mySelect1"));
	createCustomDropdown(document.getElementById("mySelect2"));
	createCustomDropdown(document.getElementById("mySelect3"));
}

if (isMobile.any) {
	let pg = new PaginationCore({
		container: document.querySelector("#pager-container"),
		totalPage: 20,
		initialPage: 1,
		pageNumberLimit: 10,
		mode: "select",
		labels: {
			first: "第一頁",
			last: "最後一頁",
			prev: "上一頁",
			next: "下一頁"
		}
	});
} else {
	let pg = new PaginationCore({
		container: document.querySelector("#pager-container"),
		totalPage: 20,
		initialPage: 1,
		pageNumberLimit: 10,
		labels: {
			first: "第一頁",
			last: "最後一頁",
			prev: "上一頁",
			next: "下一頁"
		}
	});
}
