(function() {
    const isDev = location.hostname === "localhost" || location.hostname.includes("127.0.0.1");
    const version = isDev ?  "20260114":Date.now() ;
    const modules = [
        "/MileStone2025/js/default.js",
        "/MileStone2025/js/lightbox.js",
        "/MileStone2025/js/store.js",
        "/MileStone2025/js/api.js",
        "/MileStone2025/js/Item.js",
        "/MileStone2025/js/components/bottom.js",
        "/MileStone2025/js/components/draw.js",
        "/MileStone2025/js/components/menu.js",
        "/MileStone2025/js/components/notice.js",
        "/MileStone2025/js/components/reward.js",
        "/MileStone2025/js/components/status.js"
    ];

    const imports = {};
    modules.forEach(path => {
        imports[path] = `${path}?v=${version}`;
    });

    const mapEl = document.createElement('script');
    mapEl.type = "importmap";
    mapEl.textContent = JSON.stringify({ imports: imports });
    document.head.appendChild(mapEl);
})();