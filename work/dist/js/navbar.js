let navbarData = [];

function handleBFHeader() {
    let originalSize = { width: 0, height: 0 };
    let headerInitialized = false;

    function scaleHeader() {
        const header = document.getElementById("BF_divHeader");
        if (!header) return;

        const windowWidth = window.innerWidth;
        const baseWidth = 1920; 

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

const NavbarComponent = {
    injectCSS(callback) {
        const timestamp = new Date().getTime();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `./assets/css/navbar.css?v=${timestamp}`; 
        
        link.onload = () => {
            if (callback) callback();
        };
        
        document.head.appendChild(link);
    },

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

        if (!isMobile && navBox && navWrap && navList) {
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

    async mount() {
        try {
            const timestamp = new Date().getTime();
            const module = await import(`./navbarData.js?v=${timestamp}`);
            navbarData = module.navbarData;
            const wrapper = document.createElement('div');
            wrapper.innerHTML = this.buildHTML();
            document.body.prepend(wrapper.firstElementChild);
            this.injectCSS(() => {
                requestAnimationFrame(() => {
                    this.initLogic();
                    handleBFHeader(); 
                });
            });
            
        } catch (error) {
            console.error("Navbar 資料載入失敗:", error);
        }
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavbarComponent.mount());
} else {
    NavbarComponent.mount();
}