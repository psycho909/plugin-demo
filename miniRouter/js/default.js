/* /js/default.js */
const { createApp } = Vue;

const app = createApp({
    setup() {
        // 因為 router 已經掛載到 window，這裡可以直接印出來測試
        console.log('目前路由狀態:', router.query);

        return {};
    }
});

// 【關鍵步驟】啟用 MiniRouter
// 因為我們在 MiniRouter.js 裡寫了 global.MiniRouter = router
// 所以這裡直接用全域變數即可
app.use(MiniRouter);

app.mount('#app');