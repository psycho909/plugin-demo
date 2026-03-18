import { navbarData } from "../config/navbarData.js";
// import { MessageLB } from "../lightbox.js";
// 創建一個獨立的函數來處理 BF_divHeader
function handleBFHeader() {
	let originalSize = { width: 0, height: 0 };
	let headerInitialized = false;

	function scaleHeader() {
		const header = document.getElementById("BF_divHeader");
		if (!header) return;

		const windowWidth = window.innerWidth;
		const baseWidth = 1920; // 基準寬度

		if (windowWidth >= baseWidth) {
			// 如果瀏覽器寬度大於等於 1920px，使用初始容器的寬度和高度
			header.style.zoom = "";
		} else {
			// 如果瀏覽器寬度小於 1920px，進行縮放
			const scale = windowWidth / baseWidth;

			header.style.zoom = scale;
		}
	}

	// 初始化
	function initHeader() {
		const header = document.getElementById("BF_divHeader");
		if (header && !headerInitialized) {
			originalSize = {
				width: header.offsetWidth,
				height: header.offsetHeight
			};
			headerInitialized = true;
			scaleHeader();
			window.addEventListener("resize", scaleHeader);
		}
	}

	// 使用 MutationObserver 來監視 body 的變化
	const observer = new MutationObserver((mutations) => {
		for (let mutation of mutations) {
			if (mutation.type === "childList") {
				initHeader();
				if (headerInitialized) {
					observer.disconnect();
					break;
				}
			}
		}
	});

	// 監視 body 的變化
	observer.observe(document.body, { childList: true, subtree: true });

	// 初始檢查，以防 BF_divHeader 已經存在
	initHeader();
}

// 在 window 加載完成後執行
window.addEventListener("load", handleBFHeader);
let navbar = {
	props: {
		music: {
			type: String,
			default: ""
		}
	},
	setup(props) {
		const navRef = Vue.ref(null);
		const navWrapRef = Vue.ref(null);
		const navBoxRef = Vue.ref(null);
		const navListRef = Vue.ref(null);
		const navToggle = Vue.ref(null);
		const navItemId = Vue.ref(null);
		const getTarget = (child) => {
			if (child.target) {
				return {
					target: "_blank",
					rel: "noopener noreferrer"
				};
			}
			return { target: "_self" };
		};

		const handleResize = Vue.ref(null);

		const initNavigation = () => {
			const nav = navRef.value;
			const navBox = navBoxRef.value;
			const navWrap = navWrapRef.value;
			const navList = navListRef.value;
			if (!isMobile.any && navBox && navWrap && navList) {
				const style = window.getComputedStyle(navBox);
				const height = parseInt(style.height);
				const marginTop = parseInt(style.marginTop);

				navWrap.setAttribute("data-height", `${height + marginTop}`);

				const setNavHeight = () => {
					const originalHeight = parseInt(navWrap.getAttribute("data-height"));
					const newHeight = navList.clientHeight - navBox.clientHeight + originalHeight;
					navWrap.style.height = `${newHeight}px`;
				};

				navBox.addEventListener("mouseenter", () => {
					nav.classList.add("-open");
					navWrap.classList.add("-open");
					document.querySelector(".nav-logo").classList.add("-open");
					setNavHeight();
				});

				navBox.addEventListener("mouseleave", () => {
					nav.classList.remove("-open");
					navWrap.classList.remove("-open");
					document.querySelector(".nav-logo").classList.remove("-open");
					navWrap.style.height = `${navWrap.getAttribute("data-height")}px`;
				});

				const navItems = navWrap.querySelectorAll(".nav-li");
				navItems.forEach((navItem) => {
					navItem.addEventListener("mouseenter", function () {
						this.querySelector(".nav-li__item").classList.add("active");
					});

					navItem.addEventListener("mouseleave", function () {
						this.querySelector(".nav-li__item").classList.remove("active");
					});
				});

				// Debounce function
				const debounce = (func, wait) => {
					let timeout;
					return function executedFunction(...args) {
						const later = () => {
							clearTimeout(timeout);
							func(...args);
						};
						clearTimeout(timeout);
						timeout = setTimeout(later, wait);
					};
				};

				// Resize handler
				handleResize.value = debounce(() => {
					const height = parseInt(style.height);
					const marginTop = parseInt(style.marginTop);
					navWrap.style.height = "";
					navWrap.setAttribute("data-height", `${height + marginTop}`);
				}, 250);

				window.addEventListener("resize", handleResize.value);
			}
		};

		const handleOpen = () => {
			navToggle.value = !navToggle.value;
			if (navToggle.value) {
				document.querySelector("body").style.overflow = "hidden";
			} else {
				document.querySelector("body").style.overflow = "";
			}
		};
		const navItemClick = (index) => {
			if (index == navItemId.value) {
				navItemId.value = null;
			} else {
				navItemId.value = index;
			}
		};
		// 初始化
		Vue.onMounted(() => {
			initNavigation();
			navbarData.forEach((section) => {
				section.children.forEach((child) => {
					if (child.onClick) {
						document.getElementById(child.id).addEventListener("click", child.onClick);
					}
				});
			});
		});

		// 卸載
		Vue.onUnmounted(() => {
			if (handleResize.value) {
				window.removeEventListener("resize", handleResize.value);
			}
		});
		Vue.onMounted(() => {});
		return {
			navbarData,
			getTarget,
			navRef,
			navWrapRef,
			navBoxRef,
			navListRef,
			navToggle,
			handleOpen,
			navItemClick,
			navItemId
		};
	},
	template: `
			<nav class="nav" ref="navRef">
				<div class="nav-logo-box">
					<a href="javascript:;" class="nav-logo"></a>
					<a href="javascript:;" class="nav-switch"></a>
				</div>
				<!-- -open -->
				<div class="nav-wrap" ref="navWrapRef">
					<a href="javascript:;" class="nav-open" @click="handleOpen" :data-toggle="navToggle">
						<span></span>
						<span></span>
						<span></span>
					</a>
					<div class="nav-box" :class="{ '-open': navToggle }" ref="navBoxRef">
						<ul class="nav-list" ref="navListRef">
							<li v-for="(item, index) in navbarData" :key="index" class="nav-li">
								<a href="javascript:;" class="nav-li__item" :class="{ 'active':navItemId == index }" :data-nav="item.id" :id="item.id" @click="navItemClick(index)">
									<span>{{ item.name }}</span>
								</a>
								<ul v-if="item.children" class="nav-list2">
									<li v-for="(child, childIndex) in item.children" :key="childIndex" class="nav-li2">
										<a :href="child.url" class="nav-li2__item" :data-nav="child.id" :id="child.id" v-bind="getTarget(child)">
											<span>{{ child.name }}</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
    `
};

export default navbar;
