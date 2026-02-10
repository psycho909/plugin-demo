# g-share 社群分享功能 v1.0
## 使用方式
```html
<script src="https://frontend.beanfun.com/plugins/g-share/g-share.js"></script>
```

> 頁面上有.g-share 時會觸發，可以依需求設置不同的社群按鈕 
- .g-share-fb : fb
- .g-share-line : line
- .g-share-twitter : twitter 
- .g-share-native : 原生分享 
- .g-share-copy : 複製連結

使用插入.g-share 不會自動觸發，需再使用`initSocialShare()`

### 使用方式 1 (預設分享訊息)
> 預設訊息從 `title` & `og:description` & `localhost.href` 抓取

```html
<div class="g-share">
    <a href="javascript:;" target="_blank" class="g-share-fb"></a>
    <a href="javascript:;" target="_blank" class="g-share-line"></a>
    <a href="javascript:;" target="_blank" class="g-share-twitter"></a>
    <a href="javascript:;" target="_blank" class="g-share-native"></a>
    <a href="javascript:;" target="_blank" class="g-share-copy"></a>
</div>
```

### 使用方式 2 (自訂分享訊息)

> 自訂分享網址、網站標題、網站描述、hashtag

```html
<div class="g-share" data-url="https://tw-event.beanfun.com/mapleStory/Event/E20231206/Index.aspx" data-title="我是標題" data-desc="我是描述" data-hashtag="Maple,MD">
    <a href="javascript:;" target="_blank" class="g-share-fb"></a>
    <a href="javascript:;" target="_blank" class="g-share-line"></a>
    <a href="javascript:;" target="_blank" class="g-share-twitter"></a>
    <a href="javascript:;" target="_blank" class="g-share-native"></a>
    <a href="javascript:;" target="_blank" class="g-share-copy"></a>
</div>
```

### 使用方式 3 (個別自訂分享訊息)

> 個別自訂分享網址、網站標題、網站描述、hashtag

```html
<div class="g-share" data-url="https://tw-event.beanfun.com/mapleStory/Event/E20231206/Index.aspx" data-title="我是標題" data-desc="我是描述" data-hashtag="Maple,MD">
    <a href="javascript:;" target="_blank" data-hashtag="BBBBB" class="g-share-fb"></a>
    <a href="javascript:;" target="_blank" class="g-share-line"></a>
    <a href="javascript:;" data-url="https://tinyjpg.com/" target="_blank" data-hashtag="Maple,MD" class="g-share-twitter"></a>
    <a href="javascript:;" target="_blank" class="g-share-native"></a>
    <a href="javascript:;" target="_blank" class="g-share-copy"></a>
</div>
```

## 額外功能

### 重新初始化
```js
initSocialShare()
```

###  自訂按鈕用參數
`generateSocialShareUrls({ url = "", title = "", description = "", hashtags = [] } = {})`
```js
/**
 * @param {*} url 分享網址
 * @param {*} title  分享標題
 * @param {*} description  分享描述
 * @param {*} hashtags 分享標籤
 * @returns {Object} 回傳分享連結
 */
// 會回傳 fb、line、twitter、native 可分享用的連結 object
let shareData={
    url:"https://tw-event.beanfun.com/mapleStory/Event/E20231206/Index.aspx",
    title:"我是標題",
    description:"我是描述",
    hashtags:["Maple","MD"]
}
generateSocialShareUrls(shareData)
// 回傳內容
/*
{
    "line": "https://social-plugins.line.me/lineit/share?url=%5Bobject%20Object%5D&text=",
    "facebook": "https://www.facebook.com/sharer/sharer.php?u=%5Bobject%20Object%5D",
    "twitter": "https://twitter.com/intent/tweet?text=&url=%5Bobject%20Object%5D",
    "native": {
        "title": "",
        "text": "",
        "url": {
            "url": "https://tw-event.beanfun.com/mapleStory/Event/E20231206/Index.aspx",
            "title": "我是標題",
            "description": "我是描述",
            "hashtags": [
                "Maple",
                "MD"
            ]
        }
    },
    "copy": {
        "url": "https://tw-event.beanfun.com/mapleStory/Event/E20231206/Index.aspx",
        "title": "我是標題",
        "description": "我是描述",
        "hashtags": [
            "Maple",
            "MD"
        ]
    }
}
*/
```

## 注意事項
FB分享問題:
-   網域為`localhost`FB會阻擋localhost，分享貼文時網站不會顯示

原生分享問題:
-   native.share:PC 不能分享應用程式，只能複製連結
-   native.share:webview 不能使用

**使用`.g-share-native`加上`target="_blank"`IOS safari會挑出報錯誤訊息**

## v1.1 新增功能
### Line分享功能調整
> 在手機使用Line分享時網址會會變成`https://line.me/R/share`手機板使用，直接開啟Line APP進行分享