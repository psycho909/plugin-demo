(function (global) {
    if (typeof Vue === "undefined") {
        console.error("❌ [MiniRouter] Vue not found.");
        return;
    }

    // 定義頁面與組件的對照表 (Map)
    let _routesMap = {};

    const router = Vue.reactive({
        query: {},
        path: "",
        currentPage: "home" // 預設首頁
    });

    const parse = () => {
        const params = new URLSearchParams(window.location.search);
        const newQuery = {};
        for (const [key, value] of params.entries()) {
            newQuery[key] = value;
        }
        router.query = newQuery;
        router.path = window.location.pathname;

        // 自動判定當前頁面，若網址沒參數則回退到 default
        router.currentPage = newQuery["page"] || "home";
    };

    const updateUrl = (params, replace = false) => {
        const str = params.toString();
        const url = str ? `?${str}` : window.location.pathname;

        if (replace) {
            window.history.replaceState(null, "", url);
        } else {
            window.history.pushState(null, "", url);
        }

        parse();

        // 🔥 重要：這裡預留給 GA4 / GTM
        // gtag('event', 'page_view', { page_location: window.location.href });
        console.log("📡 Route Change:", url);
    };

    // 定義需要「黏在網址上」的行銷參數白名單
    const PRESERVED_KEYS = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "fbclid",
        "gclid",
        "line_id",
        "_ga"
    ];

    // 【功能1】切換大頁面 (會清空舊參數，但保留 UTM，且 extraParams 優先權最高)
    router.go = (pageName, extraParams = {}) => {
        // 1. 取得當前網址的所有參數
        const currentParams = new URLSearchParams(window.location.search);

        // 2. 建立一個全新的參數容器
        const newParams = new URLSearchParams();

        // 3. 先把目標頁面設定進去
        newParams.set("page", pageName);

        // 4. [順序調整] 先把舊網址裡的 UTM 參數「抄寫」過來
        // 這樣如果 extraParams 沒傳這些值，就會保留舊的
        PRESERVED_KEYS.forEach((key) => {
            if (currentParams.has(key)) {
                newParams.set(key, currentParams.get(key));
            }
        });

        // 5. [順序調整] 再把 extraParams 設定進去
        // 因為這一步是「後執行」，所以如果 extraParams 有同名參數，會覆蓋掉第 4 步的值
        Object.keys(extraParams).forEach((key) => {
            if (extraParams[key] !== null && extraParams[key] !== undefined) {
                newParams.set(key, extraParams[key]);
            }
        });

        // 6. 更新網址
        updateUrl(newParams);

        console.log(`[MiniRouter] Navigated to ${pageName}`);
    };

    // 【功能2】僅修改參數 (保留當前頁面和其他參數)
    router.push = (arg1, arg2) => {
        const params = new URLSearchParams(window.location.search);

        if (typeof arg1 === "object" && arg1 !== null) {
            Object.keys(arg1).forEach((key) => {
                if (arg1[key] === null || arg1[key] === undefined) {
                    params.delete(key);
                } else {
                    params.set(key, arg1[key]);
                }
            });
        } else if (typeof arg1 === "string") {
            params.set(arg1, arg2);
        }

        updateUrl(params);
    };

    router.install = (app, options = {}) => {
        _routesMap = options.routes || {}; // 初始化路由表

        window.addEventListener("popstate", parse);
        parse(); // 初始化解析

        app.config.globalProperties.$router = router;

        // 註冊一個全域組件 <mini-view> 代替 <router-view>
        app.component("MiniView", {
            computed: {
                view() {
                    const page = router.currentPage;
                    return _routesMap[page] || null;
                }
            },
            template: `<component :is="view" />`
        });

        console.log("✅ MiniRouter Installed with Query Mode (Priority: ExtraParams > UTM)");
    };

    global.MiniRouter = router;
})(window);