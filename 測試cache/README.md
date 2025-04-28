# 避免瀏覽器快取工具庫

這是一個用於動態載入資源並避免瀏覽器快取的JavaScript工具庫。提供了JSON、CSS和JavaScript檔案的動態載入功能，並確保每次都能取得最新的資源內容。

## 主要功能

### 1. 動態載入JSON (fetchNonCachedJSON)
提供帶有重試機制和超時控制的JSON資料載入功能。

```javascript
fetchNonCachedJSON('data.json', {
    retries: 2,    // 重試次數，預設2次
    timeout: 10000 // 超時時間，預設10秒
})
    .then(data => console.log('資料已載入:', data))
    .catch(err => console.error('無法載入JSON資料:', err));
```

### 2. 動態載入CSS (loadCSS)
動態載入CSS檔案，並確保載入最新版本。

```javascript
loadCSS('styles.css')
    .then(() => console.log('CSS已套用'))
    .catch(err => console.error('無法載入CSS:', err));
```

### 3. 動態載入JavaScript (fetchNonCachedJS)
提供帶有重試機制的JavaScript檔案動態載入功能。

```javascript
fetchNonCachedJS('script.js', {
    retries: 2 // 重試次數，預設2次
})
    .then(() => console.log('JS已載入'))
    .catch(err => console.error('無法載入JS:', err));
```

#### 在 Vue 3 (CDN版本) 中的使用範例

```html
<!-- 引入 Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Vue應用程式 -->
<div id="app">
    <div v-if="!loading && !error">
        <page1 v-if="data" :pageData="data"></page1>
    </div>
    <div v-else-if="loading">載入中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
</div>

<script>
// 應用程式初始化函數
async function initializeApp() {
    try {
        // 先載入必要的JS檔案
        await fetchNonCachedJS("https://example.com/tools.js");

        // 創建Vue應用程式
        let app = Vue.createApp({
            components: {
                page1: page1 // 假設page1是一個已定義的元件
            },
            setup() {
                // 使用組合式API管理狀態
                let data = Vue.ref(null);
                let loading = Vue.ref(true);
                let error = Vue.ref(null);

                // 載入JSON資料的函數
                let fetchData = async () => {
                    try {
                        loading.value = true;
                        data.value = await fetchNonCachedJSON("https://example.com/data.json");
                    } catch (err) {
                        error.value = "資料載入失敗";
                        console.error(err);
                    } finally {
                        loading.value = false;
                    }
                };

                // 元件掛載時載入資料
                Vue.onMounted(() => {
                    fetchData();
                });

                // 返回模板需要的資料和方法
                return {
                    data,
                    loading,
                    error
                };
            }
        });

        // 掛載應用程式
        app.mount("#app");
    } catch (err) {
        console.error("初始化應用失敗:", err);
        // 顯示友善的錯誤訊息
        document.getElementById("app").innerHTML = "應用載入失敗，請重新整理頁面";
    }
}

// 啟動應用程式
initializeApp();
</script>
```

這個範例展示了：

1. 使用非同步函數`initializeApp`來初始化應用
2. 在建立Vue應用前，先使用`fetchNonCachedJS`載入必要的工具
3. 使用Vue 3的Composition API來管理狀態和邏輯
4. 結合`fetchNonCachedJSON`來載入資料
5. 完整的錯誤處理機制

這種方式的優點：
- 確保必要的JS檔案先載入完成
- 使用async/await使程式碼更容易理解
- 統一的錯誤處理機制
- 良好的載入狀態管理

## 為什麼需要三個不同的函數？

工具庫分別提供三個專門的函數來處理不同類型的資源，這是基於以下考量：

### 1. JSON載入 (fetchNonCachedJSON)
- 需要將回應內容解析為JSON格式
- 需要超時控制機制，避免請求過久影響使用者體驗
- 適合用於載入設定檔或API資料
- 使用fetch API直接獲取資料，無需建立DOM元素

### 2. CSS載入 (loadCSS)
- 需要創建`<link>`元素並加入到`document.head`
- CSS檔案載入不需要重試機制，因為CSS通常是漸進式載入
- 樣式表需要立即套用到頁面上
- 不需要額外的資料處理，只需確保載入成功

### 3. JavaScript載入 (fetchNonCachedJS)
- 需要創建`<script>`元素並加入到`document.head`
- JavaScript執行錯誤可能會影響整個應用，因此需要重試機制
- 需要特殊的載入完成標記（isExternalJSLoaded）和事件通知
- 載入失敗時需要清理DOM中的script標籤
- 腳本的執行順序很重要，需要確保正確的載入順序

這種分離設計提供了更好的錯誤處理、更精確的資源控制，以及更符合各種資源特性的載入策略。

## 特點

- 所有方法都返回Promise，支援異步操作
- 內建重試機制，提高載入成功率
- JSON載入支援超時控制
- 自動添加時間戳參數避免快取
- 提供詳細的載入狀態日誌
- JavaScript載入完成後會觸發`externalJSLoaded`事件

## 參數說明

### fetchNonCachedJSON 選項
- `retries`: 重試次數，預設為2次
- `timeout`: 請求超時時間，預設為10000毫秒(10秒)

### loadCSS
無額外選項參數

### fetchNonCachedJS 選項
- `retries`: 重試次數，預設為2次

## 事件

- `externalJSLoaded`: 當JavaScript檔案成功載入後觸發
- `window.isExternalJSLoaded`: 布林值，標示JavaScript是否已成功載入