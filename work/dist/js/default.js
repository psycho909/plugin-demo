import { MessageLB } from "./lightbox.js";
import { setCookie, getCookie, deleteCookie, loadingShow, loadingHide } from "./tool.js";
import useEventStore from "./store.js";
import navbar from "./components/navbar.js";
import side from "./components/side.js";
import main from "./components/main.js";
import bgm from "./components/bgm.js";
import update from "./components/update.js";
import guide from "./components/guide.js";
import art from "./components/art.js";
import download from "./components/download.js";
import annou from "./components/annou.js";
import annouPage from "./components/annou-page.js";
import eventAnnouPage from "./components/event-annou-page.js";
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
	components: {
		side,navbar,"main-page":main,bgm,update,guide,art,download,annou,annouPage,eventAnnouPage
	},
	setup() {
		const store = useEventStore();
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
