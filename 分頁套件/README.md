# 分頁套件 (Pagination Core)

一個簡單易用的 JavaScript 分頁套件，支援一般分頁和置中分頁兩種模式。

## 功能特點

-   支援一般分頁和置中分頁兩種模式
-   可自訂樣式
-   支援省略號顯示
-   支援首頁/末頁快速跳轉
-   支援上一頁/下一頁
-   支援上 N 頁/下 N 頁
-   支援動態更新總頁數
-   支援頁碼重置
-   提供頁碼變更回調函數
-   支援事件監聽機制
-   支援初始化完成事件

## 安裝方式

1. 下載 `PaginationCore.js` 檔案
2. 在您的專案中引入：

```javascript
import PaginationCore from "./path/to/PaginationCore.js";
```

## 使用方法

### 基本使用

```javascript
const pagination = new PaginationCore({
	container: document.querySelector("#pagination"),
	totalPage: 20,
	pageNumberLimit: 5,
	pageChange: (page) => {
		console.log(`當前頁碼：${page}`);
	},
	init: (page) => {
		console.log(`初始化完成，當前頁碼：${page}`);
	}
});
```

### 置中分頁模式

```javascript
const centerPagination = new PaginationCore({
	container: document.querySelector("#pagination"),
	totalPage: 100,
	pageNumberLimit: 5,
	mode: "center",
	pageChange: (page) => {
		console.log(`當前頁碼：${page}`);
	},
	init: (page) => {
		console.log(`初始化完成，當前頁碼：${page}`);
	}
});
```

### 事件監聽

除了在建構函式中設置回調函數，也可以使用事件監聽的方式：

```javascript
const pagination = new PaginationCore({
	container: document.querySelector("#pagination"),
	totalPage: 20,
	pageNumberLimit: 5
});

// 添加頁碼變更事件監聽
pagination.on("pageChange", (page) => {
	console.log(`當前頁碼：${page}`);
});

// 添加初始化完成事件監聽
pagination.on("init", (page) => {
	console.log(`初始化完成，當前頁碼：${page}`);
});

// 移除事件監聽
pagination.off("pageChange", callback);
pagination.off("init", callback);
```

### 更新總頁數

```javascript
// Promise 方式使用
pagination
	.updateTotalPage(30)
	.then((result) => {
		console.log(`更新成功 - 總頁數：${result.totalPage}，當前頁碼：${result.currentPage}`);
	})
	.catch((error) => {
		console.error("更新失敗：", error.message);
	});

// Async/Await 方式使用
async function updatePage() {
	try {
		const result = await pagination.updateTotalPage(30);
		console.log(`更新成功 - 總頁數：${result.totalPage}，當前頁碼：${result.currentPage}`);
	} catch (error) {
		console.error("更新失敗：", error.message);
	}
}
```

## 配置選項

| 參數            | 類型        | 預設值   | 說明                             |
| --------------- | ----------- | -------- | -------------------------------- |
| container       | DOM Element | null     | 分頁容器元素（必填）             |
| totalPage       | Number      | -        | 總頁數（必填）                   |
| pageNumberLimit | Number      | -        | 顯示的頁碼數量（必填）           |
| pageChange      | Function    | () => {} | 頁碼變更時的回調函數             |
| init            | Function    | () => {} | 初始化完成時的回調函數           |
| showFirst       | Boolean     | true     | 是否顯示首頁按鈕                 |
| showLast        | Boolean     | true     | 是否顯示末頁按鈕                 |
| mode            | String      | 'normal' | 分頁模式（'normal' 或 'center'） |
| styles          | Object      | {}       | 自訂樣式設定                     |

### 樣式設定選項

```javascript
styles: {
    active: {
        'background-color': '#007bff',
        'color': 'white',
        'border-color': '#007bff'
    },
    normal: {
        'transition': 'all 0.3s ease'
    },
    hover: {
        'background-color': '#e9ecef'
    },
    disabled: {
        'opacity': '0.5',
        'cursor': 'not-allowed'
    }
}
```

## 可用方法

| 方法名                    | 參數             | 說明           |
| ------------------------- | ---------------- | -------------- |
| setPage(page)             | Number           | 跳轉到指定頁碼 |
| goToFirstPage()           | -                | 跳轉到第一頁   |
| goToLastPage()            | -                | 跳轉到最後一頁 |
| prevPage()                | -                | 跳轉到上一頁   |
| nextPage()                | -                | 跳轉到下一頁   |
| goForward(n)              | Number           | 向後跳轉 n 頁  |
| goBackward(n)             | Number           | 向前跳轉 n 頁  |
| reset()                   | -                | 重置到第一頁   |
| updateTotalPage(newTotal) | Number           | 更新總頁數     |
| destroy()                 | -                | 銷毀分頁實例   |
| on(eventName, callback)   | String, Function | 添加事件監聽   |
| off(eventName, callback)  | String, Function | 移除事件監聽   |

## 事件類型

| 事件名     | 回調參數     | 說明             |
| ---------- | ------------ | ---------------- |
| pageChange | page: Number | 頁碼變更時觸發   |
| init       | page: Number | 初始化完成時觸發 |

## 範例

完整的使用範例請參考 `example.html`。

## 瀏覽器支援

-   Chrome (最新版本)
-   Firefox (最新版本)
-   Safari (最新版本)
-   Edge (最新版本)

## 注意事項

1. 確保容器元素存在於 DOM 中
2. 總頁數必須大於 0
3. 顯示的頁碼數量建議為奇數（置中模式時）
4. 樣式可以根據需求自由配置

## 授權

MIT License
