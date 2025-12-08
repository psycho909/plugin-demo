(function (global) {
    if (typeof Vue === 'undefined') {
        console.error('❌ [MiniRouter] Vue not found.');
        return;
    }

    const router = Vue.reactive({
        query: {},
        path: '',
        // 【重要】設定「永遠不被清除」的參數
        // 即使切換頁面，這些參數也會自動保留 (例如活動開關、來源追蹤)
        preserveKeys: ['start', 'utm_source', 'token'] 
    });

    const parse = () => {
        const params = new URLSearchParams(window.location.search);
        const newQuery = {};
        for (const [key, value] of params.entries()) {
            newQuery[key] = value;
        }
        router.query = newQuery;
        router.path = window.location.pathname;
    };

    const updateUrl = (params) => {
        const str = params.toString();
        const url = str ? `?${str}` : window.location.pathname;
        window.history.pushState(null, '', url);
        parse();
    };

    /**
     * router.push
     * 預設行為：清除舊參數 (Reset)
     * 參數說明：
     * router.push('key', 'val')          -> ?key=val (舊的 id 會消失，但 preserveKeys 會留著)
     * router.push('key', 'val', true)    -> ?old=1&key=val (保留舊參數)
     * router.push({ key: 'val' })        -> ?key=val
     * router.push({ key: 'val' }, true)  -> ?old=1&key=val
     */
    router.push = (arg1, arg2, arg3) => {
        
        let newParamsObj = {};
        let keepExisting = false; // 預設為 false (清除舊參數)

        // 參數判斷
        if (typeof arg1 === 'object' && arg1 !== null) {
            newParamsObj = arg1;
            // 物件寫法: router.push({ page: 'mission' }, true)
            keepExisting = arg2 === true; 
        } else {
            newParamsObj = { [arg1]: arg2 };
            // 單值寫法: router.push('page', 'mission', true)
            keepExisting = arg3 === true; 
        }

        let params;

        if (keepExisting) {
            // [保留模式]：基於目前的 URL 修改
            params = new URLSearchParams(window.location.search);
        } else {
            // [預設模式]：建立全新的參數 (清除舊的)
            params = new URLSearchParams();
            
            // 自動把 preserveKeys (如 start=true) 救回來
            const currentParams = new URLSearchParams(window.location.search);
            router.preserveKeys.forEach(key => {
                if (currentParams.has(key)) {
                    params.set(key, currentParams.get(key));
                }
            });
        }

        // 設定新參數
        Object.keys(newParamsObj).forEach(key => {
            const val = newParamsObj[key];
            if (val === null || val === undefined) {
                params.delete(key);
            } else {
                params.set(key, val);
            }
        });
        
        updateUrl(params);
    };

    router.remove = (keyOrArray) => {
        const params = new URLSearchParams(window.location.search);
        
        if (Array.isArray(keyOrArray)) {
            keyOrArray.forEach(k => params.delete(k));
        } else {
            params.delete(keyOrArray);
        }
        updateUrl(params);
    };

    router.install = (app) => {
        window.addEventListener('popstate', parse);
        parse();
        app.config.globalProperties.$router = router;
        console.log('✅ MiniRouter Installed');
    };

    global.router = router;
    global.MiniRouter = router;

})(window);