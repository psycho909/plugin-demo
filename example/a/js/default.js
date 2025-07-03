import { setCookie, getCookie, deleteCookie, loadingShow, loadingHide } from "./tool.js";
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}
