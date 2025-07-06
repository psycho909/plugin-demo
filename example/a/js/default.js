import { setCookie, getCookie, deleteCookie, loadingShow, loadingHide } from "./tool.js";
// 阻止瀏覽器預設scroll
if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}
const BASE_W = 1920; // 原始設計寬
const BASE_H = 1080; // 原始設計高（16:9）

function fit16by9() {
	const vw = window.innerWidth;
	const vh = window.innerHeight;

	// 取最小倍率，確保整個畫面都露出
	const scale = Math.min(vw / BASE_W, vh / BASE_H);

	const app = document.getElementById("app");
	app.style.width = BASE_W + "px";
	app.style.height = BASE_H + "px";
	app.style.position = "absolute";
	app.style.top = "0"; // y 置頂
	app.style.left = "50%"; // 先把左邊對到視窗中線
	app.style.transformOrigin = "top center";
	app.style.transform = `translateX(-50%) scale(${scale})`; // 往左拉半寬再縮放
}

// 直接使用
if (!isMobile.any) {
	// 初始執行 + 監聽視窗變動
	fit16by9();
	window.addEventListener("resize", fit16by9);
}
