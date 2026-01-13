# gbox
## 引入方式
> 需再引入`jquery`
```html
<script src="https://tw.hicdn.beanfun.com/jquery/jquery.min.js"></script>
<script src="https://tw.hicdn.beanfun.com/jquery/jquery-migrate.min.js"></script>
<script src="https://frontend.beanfun.com/plugins/gbox/gbox.js"></script>
```
## 使用方式
### Element被點擊後開啟
```js
$('element').gbox('<div>輸入資訊</div>');
```
### 直接開啟
```js
$.gbox.open('單純輸入資訊'); 
```
### 直接關閉
```js
$.gbox.close(); 
```

### 參數
| 屬性 | 預設值 | 參數 | 說明 |
| - | - | - | - |
| fixedPos  | true | Boolean | 跳出Lightbox是否鎖定畫面捲動。 |
| hasCloseBtn  | false | Boolean | 右上方是否顯示關閉按鈕。 |
| closeBtn  | ‘x’ | String | 右上方關閉按鈕樣式，可輸入文字x或插html`<img>`標籤。 |
| clickBgClose  | false | Boolean | 點擊背景關閉lightbox |
| addClass  | null | String | 額外加入ClassName |
| titleBar  | null | String | 顯示標題列及文字內容 |
| afterClose  | null | String<br>Function | Lightbox關閉後要做的事。輸入網址為轉導亦可輸入function |
| afterOpen  | null | Function | Lightbox開啟時做的事。 |
| hasActionBtn  | true | Boolean | 下方是否出現按鈕列 |
| actionBtns  |  | Array<br>Object | 按鈕列預設一顆「確定」按鈕，功能為關閉Lightbox<br>陣列內可加入多組含有text、id、click屬性物件。<br>text:(String)-按鈕文字。<br>id:(String)-按鈕ID<br>class:(String)-按鈕 Class<br>target: (Boolean)- 是否另開頁面(另開後會關閉gbox)<br>必須與click輸入網址同時使用<br>click:(String、Function)-按下按鈕後功能。<br>輸入網址為轉導亦可輸入function |

### afterClose 關閉後觸發
> `$.gbox.close()`執行後觸發
```js
let msg = "gbox內容";
let config = {
    afterClose: function () {
        // 關閉後觸發
        console.log("關閉gbox");
    }
};
$.gbox.open(msg, config);
```

### afterOpen 開啟後觸發
> `$.gbox.open()`執行後觸發
```js
let msg = "gbox內容";
let config = {
    afterOpen: function () {
        // 關閉後觸發
        console.log("開啟gbox");
    }
};
$.gbox.open(msg, config);
```

### actionBtns
> 按鈕預設class="gbox-btn"
- text:(String)-按鈕文字。
- id:(String)-按鈕ID
- class:(String)-按鈕 Class
- target: (Boolean)- 是否另開頁面(另開後會關閉gbox)必須與click輸入網址同時使用
- click:(String、Function)-按下按鈕後功能。輸入網址為轉導亦可輸入function

### actionBtns 用法1(String連結)
```js
let msg = "gbox內容";
let config = {
    hasActionBtn: true,
    actionBtns: [
        {
            text: "按鈕文字",
            id:"按鈕id",
            class: "按鈕class",
            target:true,
            click: "https://tw.beanfun.com/"
        }
    ]
};
$.gbox.open(msg, config);
```
### actionBtns 用法2(Function)
```js
let msg = "gbox內容";
let config = {
    hasActionBtn: true,
    actionBtns: [
        {
            text: "按鈕文字",
            id:"按鈕id",
            class: "按鈕class",
            click: function(){

            }
        }
    ]
};
$.gbox.open(msg, config);
```

### example
```js
let msg = "gbox內容";
let config = {
    addClass: "default",
    titleBar:"我標題可用可不用",
    hasCloseBtn: true,
    hasActionBtn: true,
    afterClose:function(){
        console.log("按下關閉按鈕後觸發")
    },
    actionBtns: [
        {
            text: "確認",
            id:"success",
            class: "success",
            click: function(){
                console.log("確認後關閉")
                $.gbox.close()
            }
        },
        {
            text: "關閉",
            id:"close",
            class: "close",
            click: function(){
                // 關閉觸發afterClose
                $.gbox.close()
            }
        },
    ]
};
$.gbox.open(msg, config);
```