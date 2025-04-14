// gbox - A lightweight vanilla JavaScript modal plugin
// 轉換自jQuery插件版本

(function () {
	// 動態引入CSS
	const stylePath = "https://tw.hicdn.beanfun.com/beanfun/GamaWWW/allProducts/style/gbox/";
	const newCssObj = document.createElement("link");
	newCssObj.type = "text/css";
	newCssObj.rel = "stylesheet";
	newCssObj.href = stylePath + "gbox.css";
	// newCssObj.href = './gbox.css';
	document.head.appendChild(newCssObj);

	let open = false;
	let $pubBox = null;
	let $pubModule, $pubWrap, $pubContent, $pubTitleBar, $pubCloseBtn, $pubAction, $pubActionBtn;

	// 輔助函數：擴展/合併物件 (相當於jQuery的$.extend)
	const extend = (defaults, options) => {
		const extended = {};
		for (let prop in defaults) {
			if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
				extended[prop] = defaults[prop];
			}
		}
		for (let prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
				extended[prop] = options[prop];
			}
		}
		return extended;
	};

	// 輔助函數：檢查是否為函數
	const isFunction = (fn) => {
		return typeof fn === "function";
	};

	const PopupPlugin = function (content, options) {
		open = true;
		// 預設參數
		const defaults = {
			titleBar: null,
			addClass: null,
			fixedPos: true,
			hasCloseBtn: false,
			closeBtn: "\u00D7", // 可插入HTML
			clickBgClose: false,
			hasActionBtn: true,
			actionBtns: [
				{
					text: "確定",
					id: "",
					class: "",
					target: false,
					targetClose: true,
					click: function () {
						gbox.close(settings.afterClose); // 網址 or Function
					}
				}
			],
			afterClose: null, // 網址 or Function
			afterOpen: null // function
		};
		// 合併 defaults 和 options，修改並返回 defaults
		const settings = extend(defaults, options);

		// 建立popupBox
		// 轉換：jQuery $('<div>').appendTo('body') → document.createElement + appendChild

		// 外容器
		$pubBox = document.createElement("div");
		$pubBox.className = "gbox";
		$pubBox.id = "gbox";
		document.body.appendChild($pubBox);

		$pubModule = document.createElement("div");
		$pubModule.className = "gbox-module";
		$pubBox.appendChild($pubModule);

		$pubWrap = document.createElement("div");
		$pubWrap.className = "gbox-wrap";
		$pubBox.appendChild($pubWrap);

		// 內容區塊
		$pubContent = document.createElement("div");
		$pubContent.className = "gbox-content";
		$pubWrap.appendChild($pubContent);

		// 帶入內容 - 轉換：jQuery的html()方法改為innerHTML
		$pubContent.innerHTML = content;

		// 新增外層Class - 轉換：jQuery的addClass()改為classList.add()
		if (settings.addClass) {
			$pubBox.classList.add(settings.addClass);
		}

		// 標題列 - 轉換：jQuery的prependTo改為insertBefore
		if (settings.titleBar) {
			$pubTitleBar = document.createElement("div");
			$pubTitleBar.className = "gbox-title";
			$pubTitleBar.innerHTML = settings.titleBar;
			$pubWrap.insertBefore($pubTitleBar, $pubWrap.firstChild);
		}

		// 右上關閉按鈕 - 轉換：jQuery的on('click')改為addEventListener
		if (settings.hasCloseBtn) {
			$pubCloseBtn = document.createElement("button");
			$pubCloseBtn.className = "gbox-close";
			$pubCloseBtn.innerHTML = settings.closeBtn;
			$pubWrap.appendChild($pubCloseBtn);

			$pubCloseBtn.addEventListener("click", function () {
				// close popup
				gbox.close(settings.afterClose);
			});
		}

		// 鎖定畫面 - 轉換：jQuery的addClass改為classList.add
		if (settings.fixedPos) {
			document.body.classList.add("ov-hidden");
		}

		// 點擊背景關閉 - 轉換：jQuery的on事件綁定轉為addEventListener
		if (settings.clickBgClose) {
			const clickOutsideHandler = function (e) {
				if (!$pubWrap.contains(e.target) && e.target !== $pubWrap) {
					// close popup
					gbox.close(settings.afterClose);
					// 關閉後移除事件監聽器
					document.removeEventListener("mouseup", clickOutsideHandler);
				}
			};
			document.addEventListener("mouseup", clickOutsideHandler);
		}

		// 按鈕區塊 - 轉換：jQuery的forEach與DOM操作
		if (settings.hasActionBtn) {
			$pubAction = document.createElement("div");
			$pubAction.className = "gbox-action";
			$pubWrap.appendChild($pubAction);

			if (settings.actionBtns.length > 1) {
				settings.actionBtns.forEach(function (actionBtn) {
					const btn = document.createElement("a");
					btn.className = "gbox-btn";
					btn.innerHTML = actionBtn.text;

					if (actionBtn.id) {
						btn.id = actionBtn.id;
					}

					if (actionBtn.class) {
						actionBtn.class.split(" ").forEach((cls) => {
							if (cls) btn.classList.add(cls);
						});
					}

					if (actionBtn.target && typeof actionBtn.click === "string") {
						btn.target = "_blank";
						if (actionBtn.targetClose) {
							btn.addEventListener("click", function () {
								gbox.close();
							});
						}
					}

					if (typeof actionBtn.click === "function") {
						btn.href = "javascript:;";
						btn.addEventListener("click", actionBtn.click);
					} else if (typeof actionBtn.click === "string") {
						btn.href = actionBtn.click;
					}

					$pubAction.appendChild(btn);
				});
			} else {
				const btn = document.createElement("a");
				btn.className = "gbox-btn";
				btn.innerHTML = settings.actionBtns[0].text;

				if (settings.actionBtns[0].id) {
					btn.id = settings.actionBtns[0].id;
				}

				if (settings.actionBtns[0].class) {
					settings.actionBtns[0].class.split(" ").forEach((cls) => {
						if (cls) btn.classList.add(cls);
					});
				}

				if (settings.actionBtns[0].target && typeof settings.actionBtns[0].click === "string") {
					btn.target = "_blank";
					btn.addEventListener("click", function () {
						gbox.close();
					});
				}

				if (typeof settings.actionBtns[0].click === "function") {
					btn.href = "javascript:;";
					btn.addEventListener("click", settings.actionBtns[0].click);
				} else if (typeof settings.actionBtns[0].click === "string") {
					btn.href = settings.actionBtns[0].click;
				}

				$pubAction.appendChild(btn);
			}
		}

		// 一版到底 - 轉換：使用ES6語法重寫meta查詢
		const metas = document.getElementsByTagName("meta");
		for (let m = 0; m < metas.length; m++) {
			const meta = metas[m];
			if (meta.content.match(/750/)) {
				$pubWrap.classList.add("vp750");
				break;
			}
		}

		// 開啟後Callback - 轉換：保持相同邏輯，使用isFunction輔助函數
		if (isFunction(settings.afterOpen)) {
			settings.afterOpen();
		}
	};

	// 建立gbox物件作為window全局對象，取代jQuery的$.gbox
	const gbox = {
		close: function (callback) {
			open = false;
			if ($pubBox !== null) {
				$pubBox.remove(); // 轉換：原生JS沒有remove方法，在下方定義Element.prototype.remove
				$pubBox = null;
				document.body.classList.remove("ov-hidden");
			}

			if (isFunction(callback)) {
				callback();
			} else if (typeof callback === "string") {
				window.open(callback, "_self");
			}
		},

		open: function (content, options) {
			if (open === false) {
				new PopupPlugin(content, options);
			} else {
				if ($pubBox !== null) {
					$pubBox.remove();
					$pubBox = null;
					document.body.classList.remove("ov-hidden");
				}
				new PopupPlugin(content, options);
			}
		}
	};

	// 增強DOM元素，添加jQuery中使用的方法
	// 為Element添加remove方法，模擬jQuery的remove()
	if (!("remove" in Element.prototype)) {
		Element.prototype.remove = function () {
			if (this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};
	}

	// 為HTMLElement添加gbox方法，替代jQuery的$.fn.gbox
	HTMLElement.prototype.gbox = function (content, options) {
		this.addEventListener("click", function (e) {
			e.preventDefault();
			if (open === false) {
				new PopupPlugin(content, options);
			}
		});
		return this; // 支持鏈式調用
	};

	// 將gbox暴露為全局對象
	window.gbox = gbox;
})();
