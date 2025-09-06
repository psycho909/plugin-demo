(function () {
	"use strict";

	const sanitizeHTML = (str) => {
		if (typeof str !== "string") return "";
		const temp = document.createElement("div");
		temp.innerHTML = str;
		Array.from(temp.querySelectorAll("script, style")).forEach((el) => el.remove());
		Array.from(temp.getElementsByTagName("*")).forEach((el) => {
			Array.from(el.attributes).forEach((attr) => {
				if (attr.name.toLowerCase().startsWith("on")) el.removeAttribute(attr.name);
			});
		});
		return temp.innerHTML;
	};

	let gboxInstances = [];
	let gboxCounter = 0;

	class GBox {
		constructor(content, options) {
			this.id = ++gboxCounter;
			this.pristineContent = content;
			this._initSettings(options);
			this._validateSettings();
			this._buildDOM();
			this._attachEvents();
			this._registerAndShow();
		}

		_initSettings(options) {
			const defaults = {
				titleBar: null,
				addClass: null,
				fixedPos: true,
				hasCloseBtn: false,
				closeBtn: "\u00D7",
				clickBgClose: false,
				hasActionBtn: true,
				allowMultiple: false,
				unsafeHTML: false,
				actionBtns: [{ text: "確定", click: (instance) => instance.close() }],
				afterClose: null,
				afterOpen: null
			};
			this.settings = { ...defaults, ...options };
		}

		_validateSettings() {
			if (typeof this.pristineContent !== "string") throw new Error("gbox Error: Content must be a string.");
			if (this.settings.actionBtns && !Array.isArray(this.settings.actionBtns)) throw new Error("gbox Error: actionBtns must be an array.");
		}

		_buildDOM() {
			this.dom = {};
			const sanitize = (html) => (this.settings.unsafeHTML ? html : sanitizeHTML(html));
			this.dom.box = document.createElement("div");
			this.dom.box.className = "gbox";
			this.dom.box.id = `gbox-${this.id}`;
			this.dom.box.setAttribute("role", "dialog");
			this.dom.box.setAttribute("aria-modal", "true");
			this.dom.wrap = document.createElement("div");
			this.dom.wrap.className = "gbox-wrap";
			this.dom.box.innerHTML = `<div class="gbox-module"></div>`;
			this.dom.box.appendChild(this.dom.wrap);
			// ... (rest of the DOM building is the same)
			const safeContent = sanitize(this.pristineContent);
			const safeTitle = this.settings.titleBar ? sanitize(this.settings.titleBar) : null;
			this.dom.content = document.createElement("div");
			this.dom.content.className = "gbox-content";
			this.dom.content.innerHTML = safeContent;
			this.dom.wrap.appendChild(this.dom.content);
			if (this.settings.addClass) this.settings.addClass.split(" ").forEach((cls) => cls && this.dom.box.classList.add(cls));
			if (safeTitle) {
				const titleBar = document.createElement("div");
				titleBar.className = "gbox-title";
				titleBar.innerHTML = safeTitle;
				this.dom.wrap.insertBefore(titleBar, this.dom.content);
			}
			if (this.settings.hasCloseBtn) {
				this.dom.closeBtn = document.createElement("button");
				this.dom.closeBtn.className = "gbox-close";
				this.dom.closeBtn.innerHTML = sanitize(this.settings.closeBtn);
				this.dom.closeBtn.setAttribute("aria-label", "Close");
				this.dom.wrap.appendChild(this.dom.closeBtn);
			}
			if (this.settings.hasActionBtn && this.settings.actionBtns.length > 0) {
				const actionArea = document.createElement("div");
				actionArea.className = "gbox-action";
				this.settings.actionBtns.forEach((btnConfig) => {
					const btn = document.createElement("a");
					btn.className = "gbox-btn";
					btn.innerHTML = sanitize(btnConfig.text);
					if (btnConfig.id) btn.id = btnConfig.id;
					if (btnConfig.class) btnConfig.class.split(" ").forEach((cls) => cls && btn.classList.add(cls));
					const clickHandler = btnConfig.click || btnConfig.onClick;
					if (typeof clickHandler === "function") {
						btn.href = "javascript:;";
						btn.addEventListener("click", (e) => {
							e.preventDefault();
							clickHandler.call(btn, this, e);
						});
					} else if (typeof clickHandler === "string") {
						btn.href = clickHandler;
						if (btnConfig.target) btn.target = "_blank";
						if (btnConfig.targetClose !== false) btn.addEventListener("click", () => this.close());
					}
					actionArea.appendChild(btn);
				});
				this.dom.wrap.appendChild(actionArea);
			}
		}

		_attachEvents() {
			// 只處理實例自身的事件，不再處理 document 事件
			if (this.dom.closeBtn) {
				this.dom.closeBtn.addEventListener("click", () => this.close());
			}
		}

		_detachEvents() {
			// 實例自身的事件會隨 DOM 移除，此處無需額外處理
		}

		_registerAndShow() {
			document.body.appendChild(this.dom.box);
			gboxInstances.push(this);
			if (this.settings.fixedPos && !document.body.classList.contains("ov-hidden")) {
				document.body.classList.add("ov-hidden");
			}
			// 觸發全域監聽器
			gbox._addGlobalListeners();
			if (typeof this.settings.afterOpen === "function") {
				try {
					this.settings.afterOpen(this);
				} catch (e) {
					console.error("gbox Error in afterOpen callback:", e);
				}
			}
		}

		close(callback) {
			this.destroy();
			const finalCallback = callback || this.settings.afterClose;
			if (typeof finalCallback === "function") {
				try {
					finalCallback();
				} catch (e) {
					console.error("gbox Error in afterClose callback:", e);
				}
			} else if (typeof finalCallback === "string") {
				window.open(finalCallback, "_self");
			}
		}

		destroy() {
			this._detachEvents();
			if (this.dom.box.parentNode) this.dom.box.remove();
			const index = gboxInstances.findIndex((inst) => inst.id === this.id);
			if (index > -1) gboxInstances.splice(index, 1);
			if (gboxInstances.length === 0) document.body.classList.remove("ov-hidden");
			// 觸發全域監聽器移除檢查
			gbox._removeGlobalListeners();
		}
	}

	const gbox = {
		// ... (open, closeById, closeAll, getInstances methods remain the same)
		open: function (content, options) {
			const settings = { ...{ allowMultiple: false }, ...options };
			if (!settings.allowMultiple) {
				gbox.closeAll((instance) => !instance.settings.allowMultiple);
			}
			try {
				return new GBox(content, options);
			} catch (e) {
				console.error(e);
				return null;
			}
		},
		closeById: function (instanceId, callback) {
			const instance = gboxInstances.find((inst) => inst.id === instanceId);
			if (instance) instance.close(callback);
		},
		closeAll: function (filter) {
			const instancesToClose = typeof filter === "function" ? gboxInstances.filter(filter) : [...gboxInstances];
			instancesToClose.forEach((instance) => instance.destroy());
		},
		getInstances: () => gboxInstances,

		// ==================== 【新架構】全域事件管理器 ====================
		_isListening: false,

		_handleGlobalKeyDown: function (e) {
			if (e.key === "Escape" && gboxInstances.length > 0) {
				const lastInstance = gboxInstances[gboxInstances.length - 1];
				lastInstance.close();
			}
		},

		_handleGlobalMouseDown: function (e) {
			if (gboxInstances.length > 0) {
				const lastInstance = gboxInstances[gboxInstances.length - 1];
				if (lastInstance.settings.clickBgClose && lastInstance.dom.wrap && !lastInstance.dom.wrap.contains(e.target)) {
					lastInstance.close();
				}
			}
		},

		_addGlobalListeners: function () {
			if (!this._isListening) {
				document.addEventListener("keydown", this._handleGlobalKeyDown);
				document.addEventListener("mousedown", this._handleGlobalMouseDown);
				this._isListening = true;
			}
		},

		_removeGlobalListeners: function () {
			if (this._isListening && gboxInstances.length === 0) {
				document.removeEventListener("keydown", this._handleGlobalKeyDown);
				document.removeEventListener("mousedown", this._handleGlobalMouseDown);
				this._isListening = false;
			}
		},
		// =================================================================

		// 全域 gbox.close() 總是關閉最上層的彈窗
		close: function (callback) {
			if (gboxInstances.length > 0) {
				gboxInstances[gboxInstances.length - 1].close(callback);
			}
		}
	};

	// --- 動態載入 CSS & 向下相容 ---
	if (!document.querySelector('link[href*="gbox.css"]')) {
		const stylePath = "https://tw.hicdn.beanfun.com/beanfun/GamaWWW/allProducts/style/gbox/gbox.css";
		const newCssObj = document.createElement("link");
		newCssObj.type = "text/css";
		newCssObj.rel = "stylesheet";
		newCssObj.href = stylePath;
		document.head.appendChild(newCssObj);
	}
	if ("HTMLElement" in window) {
		HTMLElement.prototype.gbox = function (content, options) {
			console.warn("gbox warning: Using HTMLElement.prototype.gbox is deprecated. Please use gbox.open() instead.");
			this.addEventListener("click", (e) => {
				e.preventDefault();
				gbox.open(content, options);
			});
			return this;
		};
	}
	window.gbox = gbox;
})();
