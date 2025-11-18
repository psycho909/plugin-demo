/**
 * 響應式 Font Size 系統（帶平滑過渡）
 * PC: 1920px | Mobile: 768px
 */
(function() {
    const PC_WIDTH = 1920;
    const MOBILE_WIDTH = 768;
    
    // let resizeTimer = null;
    
    function setFontSize() {
        const html = document.documentElement;
        
        // 使用 clientWidth（不包含滾動條，與 CSS 更一致）
        let width = html.clientWidth;
        
        // 限制最大寬度為 1920px
        if (width > PC_WIDTH) {
            width = PC_WIDTH;
        }
        
        const designWidth = width <= MOBILE_WIDTH ? MOBILE_WIDTH : PC_WIDTH;
        const fontSize = (width / designWidth) * 16;
        
        // 啟用過渡效果
        // html.style.transition = `font-size 200ms ease-out`;
        html.style.fontSize = fontSize + 'px';
        
        // 清除過渡效果（避免影響其他動畫）
        // clearTimeout(resizeTimer);
        // resizeTimer = setTimeout(() => {
        //     html.style.transition = '';
        // }, TRANSITION_DURATION);
    }
    
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    
    // 初始化
    setFontSize();
    window.addEventListener('resize', debounce(setFontSize, 100));
    window.addEventListener('orientationchange', setFontSize);
    
})();