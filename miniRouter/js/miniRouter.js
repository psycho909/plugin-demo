(function (global) {
    if (typeof Vue === 'undefined') {
        console.error('❌ [MiniRouter] Vue not found.');
        return;
    }

    const router = Vue.reactive({
        query: {},
        path: ''
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
    router.push = (arg1, arg2) => {
        const params = new URLSearchParams(window.location.search);

        if (typeof arg1 === 'object' && arg1 !== null) {
            Object.keys(arg1).forEach(key => {
                if (arg1[key] === null || arg1[key] === undefined) {
                    params.delete(key);
                } else {
                    params.set(key, arg1[key]);
                }
            });
        } else {
            params.set(arg1, arg2);
        }
        
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