// 1. 引入外部資料 (確保相對路徑與檔名正確)
import { navbarData } from "./config/navbarData.js";

// 2. BF Header 縮放邏輯
function handleBFHeader() {
    let originalSize = { width: 0, height: 0 };
    let headerInitialized = false;

    function scaleHeader() {
        const header = document.getElementById("BF_divHeader");
        if (!header) return;

        const windowWidth = window.innerWidth;
        const baseWidth = 1920; // 基準寬度

        if (windowWidth >= baseWidth) {
            header.style.zoom = "";
        } else {
            const scale = windowWidth / baseWidth;
            header.style.zoom = scale;
        }
    }

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

    observer.observe(document.body, { childList: true, subtree: true });
    initHeader();
}

// 3. Navbar 渲染與邏輯組件
const NavbarComponent = {
    // 動態載入 CSS，並確保載入完成後才執行 callback
    injectCSS(callback) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './assets/css/navbar.css'; // 請確認此路徑是否正確對應你的 CSS
        
        // 確保 CSS 載入且套用後，再執行後續的高寬計算
        link.onload = () => {
            if (callback) callback();
        };
        
        document.head.appendChild(link);
    },

    // 建立 HTML 字串
    buildHTML() {
        let navItemsHTML = navbarData.map((item, index) => {
            let childrenHTML = '';
            if (item.children && item.children.length > 0) {
                let childrenLi = item.children.map(child => {
                    const targetAttr = child.target ? 'target="_blank" rel="noopener noreferrer"' : 'target="_self"';
                    return `
                        <li class="nav-li2">
                            <a href="${child.url}" class="nav-li2__item" data-nav="${child.id}" id="${child.id}" ${targetAttr}>
                                <span>${child.name}</span>
                            </a>
                        </li>
                    `;
                }).join('');
                childrenHTML = `<ul class="nav-list2">${childrenLi}</ul>`;
            }

            return `
                <li class="nav-li">
                    <a href="javascript:;" class="nav-li__item" data-index="${index}" data-nav="${item.id}" id="${item.id}">
                        <span>${item.name}</span>
                    </a>
                    ${childrenHTML}
                </li>
            `;
        }).join('');

        return `
            <nav class="nav" id="navRef">
                <div class="nav-logo-box">
                    <a href="javascript:;" class="nav-logo"></a>
                    <a href="javascript:;" class="nav-switch"></a>
                </div>
                <div class="nav-wrap" id="navWrapRef">
                    <a href="javascript:;" class="nav-open" id="navToggleBtn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                    <div class="nav-box" id="navBoxRef">
                        <ul class="nav-list" id="navListRef">
                            ${navItemsHTML}
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    },

    // 綁定事件與高度計算邏輯
    initLogic() {
        const nav = document.getElementById('navRef');
        const navWrap = document.getElementById('navWrapRef');
        const navBox = document.getElementById('navBoxRef');
        const navList = document.getElementById('navListRef');
        const navToggleBtn = document.getElementById('navToggleBtn');
        const navMainItems = document.querySelectorAll('.nav-li__item');
        const navLiElements = document.querySelectorAll('.nav-li');

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;

        let navToggle = false;
        let navItemId = null;

        // 手機版選單開關邏輯
        navToggleBtn.addEventListener('click', () => {
            navToggle = !navToggle;
            if (navToggle) {
                navBox.classList.add('-open');
                document.body.style.overflow = "hidden";
            } else {
                navBox.classList.remove('-open');
                document.body.style.overflow = "";
            }
        });

        // 點擊主選單項目邏輯
        navMainItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const index = item.getAttribute('data-index');
                if (index == navItemId) {
                    navItemId = null;
                    item.classList.remove('active');
                } else {
                    navMainItems.forEach(i => i.classList.remove('active')); 
                    navItemId = index;
                    item.classList.add('active');
                }
            });
        });

        // 電腦版滑鼠移入下拉與高度計算邏輯
        if (!isMobile && navBox && navWrap && navList) {
            // 此時 CSS 已經確保載入，所以這裡抓取的高度會是精準的
            const style = window.getComputedStyle(navBox);
            const height = parseInt(style.height) || 0;
            const marginTop = parseInt(style.marginTop) || 0;

            navWrap.setAttribute("data-height", `${height + marginTop}`);

            const setNavHeight = () => {
                const originalHeight = parseInt(navWrap.getAttribute("data-height"));
                const newHeight = navList.clientHeight - navBox.clientHeight + originalHeight;
                navWrap.style.height = `${newHeight}px`;
            };

            navBox.addEventListener("mouseenter", () => {
                nav.classList.add("-open");
                navWrap.classList.add("-open");
                document.querySelector(".nav-logo")?.classList.add("-open");
                setNavHeight();
            });

            navBox.addEventListener("mouseleave", () => {
                nav.classList.remove("-open");
                navWrap.classList.remove("-open");
                document.querySelector(".nav-logo")?.classList.remove("-open");
                navWrap.style.height = `${navWrap.getAttribute("data-height")}px`;
            });

            navLiElements.forEach((navItem) => {
                navItem.addEventListener("mouseenter", function () {
                    this.querySelector(".nav-li__item").classList.add("active");
                });
                navItem.addEventListener("mouseleave", function () {
                    this.querySelector(".nav-li__item").classList.remove("active");
                });
            });

            // 防抖函數 (處理螢幕縮放時的高度重置)
            const debounce = (func, wait) => {
                let timeout;
                return function (...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            };

            const handleResize = debounce(() => {
                const currentHeight = parseInt(window.getComputedStyle(navBox).height) || 0;
                const currentMt = parseInt(window.getComputedStyle(navBox).marginTop) || 0;
                navWrap.style.height = "";
                navWrap.setAttribute("data-height", `${currentHeight + currentMt}`);
            }, 250);

            window.addEventListener("resize", handleResize);
        }
    },

    // 啟動程序
    mount() {
        // 1. 先把 HTML 塞入畫面
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.buildHTML();
        document.body.prepend(wrapper.firstElementChild);

        // 2. 注入 CSS，並在 CSS 載入完成後執行邏輯綁定
        this.injectCSS(() => {
            // 加上 requestAnimationFrame 確保瀏覽器已經完成畫面的實體繪製
            requestAnimationFrame(() => {
                this.initLogic();
                handleBFHeader(); 
            });
        });
    }
};

// 4. 等待 DOM 載入完成後自動掛載
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavbarComponent.mount());
} else {
    NavbarComponent.mount();
}