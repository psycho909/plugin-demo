# 跑馬燈元件使用說明

## 目錄

-   [基本使用](#基本使用)
-   [配置選項](#配置選項)
-   [方法說明](#方法說明)
-   [使用範例](#使用範例)

## 基本使用

### 1. 引入 JS 文件

```html
<script src="跑馬燈.js"></script>
```

### 2. HTML 結構

跑馬燈支援兩種使用方式：直接使用 HTML 結構或通過 JavaScript 動態添加內容。

#### 方式一：直接使用 HTML 結構

可以選擇使用預設結構或自定義結構：

##### 簡寫結構

```html
<!-- 基本結構 -->
<div id="marquee-container">
	<div class="marquee-item">項目1</div>
	<div class="marquee-item">項目2</div>
	<div class="marquee-item">項目3</div>
</div>
```

##### 正規使用結構

```html
<!-- 自定義結構（使用自定義的 wrapper 和 content） -->
<div id="marquee-container">
	<div class="marquee-wrapper">
		<div class="marquee-content">
			<div class="marquee-item">項目1</div>
			<div class="marquee-item">項目2</div>
			<div class="marquee-item">項目3</div>
		</div>
	</div>
</div>
```

> 注意：
>
> 1. 使用自定義結構時，必須包含 `.marquee-wrapper` 和 `.marquee-content` 類名
> 2. 元件會自動檢測是否存在這些結構，如果存在則直接使用，不存在才會創建
> 3. 無論使用哪種結構，元件都會自動添加必要的樣式

> 注意：項目的顯示順序會根據移動方向有所不同：
>
> 向左移動（direction: 'left'）：
>
> ```
> [1] [2] [3] <-- 向左移動
> ```
>
> 向右移動（direction: 'right'）：
>
> ```
> 向右移動 --> [3] [2] [1]
> ```
>
> 向上移動（direction: 'up'）：
>
> ```
> [1]    ↑
> [2]  向上
> [3]  移動
> ```
>
> 向下移動（direction: 'down'）：
>
> ```
> [3]  向下
> [2]  移動
> [1]    ↓
> ```
>
> 所以在 HTML 結構中，項目的順序應該按照想要顯示的順序排列。
> 例如：向左移動時，如果想要 1->2->3 的順序顯示，HTML 結構應該寫成 3->2->1 的順序。

#### 方式二：JavaScript 動態添加

```html
<div id="marquee-container"></div>
```

### 3. 初始化

#### HTML 結構初始化

```javascript
// 使用已有的 HTML 結構
const marquee = new Marquee("#marquee-container");
```

#### JavaScript 動態添加初始化

```javascript
// 動態添加內容
// 向左移動時：items 陣列順序會反轉顯示
// 向右移動時：items 陣列順序就是顯示順序
// 向上移動時：items 陣列由上到下顯示
// 向下移動時：items 陣列順序會反轉，由上到下顯示
const marquee = new Marquee("#marquee-container", {
	items: ["項目1", "項目2", "項目3"],
	direction: "left" // 會顯示為：項目3 -> 項目2 -> 項目1
});

// 向右移動的例子
const marqueeRight = new Marquee("#marquee-container", {
	items: ["項目1", "項目2", "項目3"],
	direction: "right" // 會顯示為：項目1 -> 項目2 -> 項目3
});
```

## 配置選項

| 選項         | 類型    | 預設值         | 說明                                                        |
| ------------ | ------- | -------------- | ----------------------------------------------------------- |
| direction    | string  | 'left'         | 移動方向：'left'、'right'、'up'、'down'                     |
| speed        | number  | 50             | 移動速度（像素/秒）                                         |
| items        | array   | []             | 要顯示的項目陣列                                            |
| itemClass    | string  | 'marquee-item' | 項目的 CSS class 名稱                                       |
| pauseOnHover | boolean | false          | 滑鼠懸停時是否暫停                                          |
| mode         | string  | ''             | 跑馬燈模式：''（預設）、'single'（單項目）、'group'（群組） |
| restartDelay | number  | 0              | 重新啟動延遲時間（毫秒）                                    |

## 方法說明

### 控制方法

-   `pause()`: 暫停動畫
-   `resume()`: 恢復動畫
-   `togglePause()`: 切換暫停/播放狀態

### 設置方法

-   `setSpeed(speed)`: 設置移動速度
-   `setDirection(direction)`: 設置移動方向
-   `setPauseOnHover(enabled)`: 設置滑鼠懸停行為
-   `updateItems(items)`: 更新顯示項目
-   `reInit(options)`: 重新初始化元件
-   `destroy()`: 銷毀元件實例

## 使用範例

### HTML 結構使用範例

```html
<!-- HTML 結構 -->
<!-- 向左移動時，產品會以 產品2 -> 產品1 的順序顯示 -->
<div id="marquee-container">
	<div class="marquee-item">
		<img src="product1.jpg" alt="產品1" />
		<div class="description">
			<h3>產品名稱1</h3>
			<p>產品描述1</p>
		</div>
	</div>
	<div class="marquee-item">
		<img src="product2.jpg" alt="產品2" />
		<div class="description">
			<h3>產品名稱2</h3>
			<p>產品描述2</p>
		</div>
	</div>
</div>

<script>
	// JavaScript 初始化
	const marquee = new Marquee("#marquee-container", {
		direction: "left", // 產品2 -> 產品1 的順序移動
		speed: 50,
		pauseOnHover: true
	});
</script>
```

### 動態內容範例

```javascript
// 使用 HTML 字符串
const marquee = new Marquee("#marquee-container", {
	items: ['<div class="item">純文字項目</div>', '<div class="item"><img src="image.jpg" alt="圖片">文字說明</div>'],
	direction: "left", // 會以 文字說明 -> 純文字項目 的順序顯示
	speed: 60,
	pauseOnHover: true
});
```

### 單項目模式

```javascript
// 單項目模式，一次只顯示一個項目
const marquee = new Marquee("#marquee-container", {
	items: ["項目3", "項目2", "項目1"],
	mode: "single",
	direction: "left", // 會以 項目1 -> 項目2 -> 項目3 的順序顯示
	restartDelay: 1000 // 切換項目時的延遲時間
});
```

### 群組模式

```javascript
// 群組模式，不進行無限循環
const marquee = new Marquee("#marquee-container", {
	items: ["項目3", "項目2", "項目1"],
	mode: "group",
	direction: "left" // 會以 項目1 -> 項目2 -> 項目3 的順序顯示
});

// 向上移動的群組模式
const marqueeUp = new Marquee("#marquee-container", {
	items: ["項目1", "項目2", "項目3"],
	mode: "group",
	direction: "up" // 會以 項目1 -> 項目2 -> 項目3 的順序從上到下顯示
});
```

### 動態控制

```javascript
// 動態控制範例
const marquee = new Marquee("#marquee-container", {
	items: ["項目2", "項目1"],
	direction: "left" // 會以 項目1 -> 項目2 的順序顯示
});

// 暫停動畫
marquee.pause();

// 更改速度
marquee.setSpeed(100);

// 更改方向為向右
marquee.setDirection("right"); // 會以 項目2 -> 項目1 的順序顯示

// 設置滑鼠懸停行為
marquee.setPauseOnHover(true); // 啟用滑鼠懸停暫停
marquee.setPauseOnHover(false); // 禁用滑鼠懸停暫停

// 更新項目
marquee.updateItems(["新項目2", "新項目1"]); // 向左移動時會以 新項目1 -> 新項目2 的順序顯示

// 恢復動畫
marquee.resume();

// 銷毀實例
marquee.destroy();
```

### 銷毀實例範例

```javascript
// 在不需要跑馬燈時銷毀實例
const marquee = new Marquee("#marquee-container", {
	items: ["項目1", "項目2", "項目3"]
});

// 銷毀實例會：
// 1. 停止所有動畫
// 2. 移除所有事件監聽器
// 3. 清除計時器
// 4. 移除重複的項目
// 5. 重置所有樣式
marquee.destroy();

// Vue 組件中的使用範例
export default {
	data() {
		return {
			marqueeInstance: null
		};
	},
	mounted() {
		this.marqueeInstance = new Marquee("#marquee-container");
	},
	beforeDestroy() {
		// 組件銷毀前清理跑馬燈實例
		if (this.marqueeInstance) {
			this.marqueeInstance.destroy();
			this.marqueeInstance = null;
		}
	}
};
```

### 重新初始化範例

```javascript
// 初始化跑馬燈
const marquee = new Marquee("#marquee-container", {
	items: ["項目2", "項目1"],
	direction: "left", // 會以 項目1 -> 項目2 的順序顯示
	speed: 50
});

// 使用 reInit 重新初始化，可以一次性更改多個設定
marquee.reInit({
	direction: "right", // 改為向右移動，會以 項目2 -> 項目1 的順序顯示
	speed: 100, // 改變速度
	pauseOnHover: true // 添加滑鼠懸停暫停功能
});

// 當使用 reInit 更改 mode 為 'group' 或 'single' 時，會自動清除所有重複的項目
marquee.reInit({
	mode: "group", // 或 "single"，會自動清除所有 .marquee-duplicate 的項目
	direction: "left",
	speed: 80
});

// 也可以搭配其他方法使用
const button = document.querySelector("#changeSettings");
button.addEventListener("click", () => {
	// 點擊按鈕時重新初始化
	marquee.reInit({
		direction: "up",
		speed: 80,
		mode: "single",
		restartDelay: 2000
	});
});

// Vue 組件中的使用範例
export default {
	data() {
		return {
			marqueeInstance: null
		};
	},
	methods: {
		updateMarquee() {
			this.marqueeInstance.reInit({
				direction: "right",
				speed: 150,
				items: ["新項目1", "新項目2", "新項目3"]
			});
		}
	},
	mounted() {
		this.marqueeInstance = new Marquee("#marquee-container");
	}
};
```

### Vue 3 組件使用範例

```javascript
// 使用 Composition API
export default {
	setup() {
		const marqueeRef = ref(null);
		const data = ref([
			{
				text: "【橘子支付買點數】最高享12%回饋7-11零用金",
				style: "color: #ff6600; font-size: 120px;"
			},
			{
				text: "守護者結伴計畫熱烈開跑，邀請朋友結伴參戰，海量紅利等你拿，立即參加別錯過！",
				style: "color: #0066cc; font-size: 100px;"
			}
		]);

		// 更新跑馬燈內容
		const updateItems = () => {
			const newItem = {
				text: "新的跑馬燈內容",
				style: "color: #ff0000; font-size: 110px;"
			};
			if (marqueeRef.value) {
				// 將數據轉換為 HTML 字符串
				const items = `<div class="marquee-item__text" style="${newItem.style}">${newItem.style}</div>`;
				marqueeRef.value.updateItems(items);
			}
		};

		// 生命週期鉤子
		onMounted(() => {
			// 初始化時將數據轉換為 HTML 字符串
			const items = data.value.map((item) => `<div class="marquee-item__text" style="${item.style}">${item.text}</div>`);
			marqueeRef.value = new Marquee("#marquee-container", {
				items: items,
				speed: 200
			});
		});

		// 組件卸載時清理
		onUnmounted(() => {
			if (marqueeRef.value) {
				marqueeRef.value.destroy();
				marqueeRef.value = null;
			}
		});

		return {
			data,
			updateItems
		};
	}
};

// 模板部分
`
<template>
	<div>
		<button @click="updateItems">更新跑馬燈</button>
		<div id="marquee-container" class="marquee-container"></div>
	</div>
</template>

<style>
.marquee-container {
	width: 100%;
	background-color: #f0f0f0;
	margin: 20px 0;
	overflow: hidden;
}

.marquee-item__text {
	font-weight: 600;
	font-size: clamp(90px, 4.86vw + 31.6px, 125px);
	font-family: Oswald, sans-serif;
	line-height: 1;
}
</style>
`;
```
