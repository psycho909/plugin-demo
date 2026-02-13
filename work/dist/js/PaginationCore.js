class PaginationCore {
	constructor({
		container,
		totalPage,
		pageNumberLimit,
		pageChange,
		showFirst = true,
		showLast = true,
		displayFormat = "number", // 'number' 或 'fraction',
		pageFormatter = null, // 新增：自訂格式化函式
		mode,
		init,
		styles = {
			active: {},
			normal: {},
			hover: {},
			disabled: {}
		}
	}) {
		this.totalPage = totalPage; // 總頁數
		this.pageNumberLimit = pageNumberLimit; // 每次顯示的頁碼數量
		this.currentPage = 1; // 當前頁碼
		this.displayFormat = displayFormat;
		this.container = container || null; // 分頁容器的 DOM 節點
		this._onPageChange = pageChange || (() => {}); // 頁面變化回調函數
		this.showFirst = showFirst;
		this.showLast = showLast;
		// 確保 mode 為 "normal" 或 "center"，預設為 "normal"
		this.mode = mode && mode === "center" ? "center" : "normal";
		this.styles = styles;
		this.pageFormatter = pageFormatter; // 儲存自訂格式化函式
		// 初始化事件監聽器容器
		this._eventListeners = {
			pageChange: [],
			init: []
		};

		// 如果提供了 onPageChange，添加到事件監聽器中
		if (typeof pageChange === "function") {
			this._eventListeners.pageChange.push(pageChange);
		}

		// 如果提供了 init 回調，添加到事件監聽器中
		if (typeof init === "function") {
			this._eventListeners.init.push(init);
		}

		// 延遲初始化，讓事件監聽器有機會先註冊
		setTimeout(() => {
			if (this.container) {
				this.initializeContainer();
				this.updatePaginationUI();
				this.initializeStyles();
				// 觸發初始化事件
				this._triggerEvent("init", this.currentPage);
			} else {
				this.initializeStyles();
			}
		}, 0);
	}

	// 事件監聽方法
	on(eventName, callback) {
		if ((eventName === "pageChange" || eventName === "init") && typeof callback === "function") {
			this._eventListeners[eventName].push(callback);
		}
		return this;
	}

	// 移除事件監聽
	off(eventName, callback) {
		if ((eventName === "pageChange" || eventName === "init") && typeof callback === "function") {
			this._eventListeners[eventName] = this._eventListeners[eventName].filter((listener) => listener !== callback);
		}
		return this;
	}

	// 觸發事件
	_triggerEvent(eventName, ...args) {
		if (eventName === "pageChange" || eventName === "init") {
			this._eventListeners[eventName].forEach((listener) => {
				listener(...args);
			});
		}
	}

	// 設置當前頁碼
	setPage(page) {
		if (page < 1 || page > this.totalPage) return;
		this.currentPage = page;
		this.updatePaginationUI();
		this._triggerEvent("pageChange", this.currentPage); // 使用新的事件觸發機制
	}

	// 獲取當前可見的頁碼列表
	getVisiblePages() {
		const startPage = Math.floor((this.currentPage - 1) / this.pageNumberLimit) * this.pageNumberLimit + 1;
		const endPage = Math.min(startPage + this.pageNumberLimit - 1, this.totalPage);
		return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}

	// 跳轉到第一頁
	goToFirstPage() {
		this.setPage(1);
	}

	// 跳轉到最後一頁
	goToLastPage() {
		this.setPage(this.totalPage);
	}

	// 跳轉到上一頁
	prevPage() {
		this.setPage(this.currentPage - 1);
	}

	// 跳轉到下一頁
	nextPage() {
		this.setPage(this.currentPage + 1);
	}

	// 初始化容器
	initializeContainer() {
		if (!this.container) {
			throw new Error("未提供容器元素");
		}
		const firstButton = this.showFirst ? `<li class="pagination-numbers__symbol pagination-first">First</li>` : "";
		const lastButton = this.showLast ? `<li class="pagination-numbers__symbol pagination-last">Last</li>` : "";
		// 初始化靜態模板
		this.container.innerHTML = `
            <ul class="pagination-numbers" style="display: flex; list-style: none; color: #fff;">
                ${firstButton}
                <li class="pagination-numbers__symbol pagination-prev">Prev</li>
                <li class="pagination-numbers__symbol pagination-next">Next</li>
                ${lastButton}
            </ul>
        `;

		// 添加事件委派
		this.container.addEventListener("click", (event) => {
			const target = event.target;

			// 如果是省略號或被禁用的元素，直接返回
			if (target.dataset.disabled === "true" || target.classList.contains("ellipsis")) {
				return;
			}

			if (this.showFirst) {
				if (target.classList.contains("pagination-first")) {
					this.goToFirstPage();
				}
			}
			if (this.showLast) {
				if (target.classList.contains("pagination-last")) {
					this.goToLastPage();
				}
			}

			if (target.classList.contains("pagination-prev")) {
				this.prevPage();
			} else if (target.classList.contains("pagination-next")) {
				this.nextPage();
			} else if (target.classList.contains("pagination-numbers__item")) {
				this.setPage(Number(target.dataset.page));
			}
		});
	}

	// 更新分頁 UI
	updatePaginationUI() {
		if (!this.container) return;

		const paginationNumbers = this.container.querySelector(".pagination-numbers");
		const items = paginationNumbers.querySelectorAll(".pagination-numbers__item");
		items.forEach((item) => item.remove());

		const nextButton = paginationNumbers.querySelector(".pagination-next");

		if (typeof this.pageFormatter === "function" || this.displayFormat === "fraction") {
			this.insertPageNumber(this.currentPage, paginationNumbers, nextButton);
		} else {
			if (this.mode === "center") {
				const { pages, showLeftEllipsis, showRightEllipsis } = this.getCenterVisiblePages();

				if (showLeftEllipsis) {
					this.insertPageNumber(1, paginationNumbers, nextButton);
					this.insertEllipsis(paginationNumbers, nextButton);
				}

				pages.forEach((page) => {
					this.insertPageNumber(page, paginationNumbers, nextButton);
				});

				if (showRightEllipsis) {
					this.insertEllipsis(paginationNumbers, nextButton);
					this.insertPageNumber(this.totalPage, paginationNumbers, nextButton);
				}
			} else {
				// 一般分頁邏輯
				this.getVisiblePages().forEach((page) => {
					this.insertPageNumber(page, paginationNumbers, nextButton);
				});
			}
		}

		// 更新按鈕狀態
		this.updateButtonStates(paginationNumbers);
	}

	// 置中分頁的頁碼計算邏輯
	getCenterVisiblePages() {
		const halfLimit = Math.floor(this.pageNumberLimit / 2);
		let startPage = this.currentPage - halfLimit;
		let endPage = this.currentPage + halfLimit;

		// 處理邊界情況
		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(this.pageNumberLimit, this.totalPage);
		}
		if (endPage > this.totalPage) {
			endPage = this.totalPage;
			startPage = Math.max(1, this.totalPage - this.pageNumberLimit + 1);
		}

		return {
			pages: Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
			showLeftEllipsis: startPage > 1,
			showRightEllipsis: endPage < this.totalPage
		};
	}

	// 上N頁、下N頁
	goForward(n) {
		this.setPage(this.currentPage + n);
	}

	goBackward(n) {
		this.setPage(this.currentPage - n);
	}

	// 重置功能
	reset() {
		this.currentPage = 1;
		this.updatePaginationUI();
	}

	// 更新總頁數
	updateTotalPage(newTotalPage) {
		return new Promise((resolve, reject) => {
			try {
				if (newTotalPage <= 0) {
					throw new Error("總頁數必須大於 0");
				}
				this.totalPage = newTotalPage;
				if (this.currentPage > this.totalPage) {
					this.currentPage = this.totalPage;
				}
				this.updatePaginationUI();
				resolve({
					totalPage: this.totalPage,
					currentPage: this.currentPage
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	// 資源釋放
	destroy() {
		if (this.container) {
			this.container.innerHTML = "";
			// 移除所有事件監聽器
			this.container.replaceWith(this.container.cloneNode(true));
			// 清空事件監聽器
			this._eventListeners.pageChange = [];
		}
	}

	initializeStyles() {
		const styleElement = document.createElement("style");
		styleElement.textContent = `
			.pagination-numbers__item {
				${Object.entries(this.styles.normal)
					.map(([key, value]) => `${key}: ${value}`)
					.join(";")}
			}
			.pagination-numbers__item.active {
				${Object.entries(this.styles.active)
					.map(([key, value]) => `${key}: ${value}`)
					.join(";")}
			}
			.pagination-numbers__item:hover:not(.active):not(.disabled) {
				${Object.entries(this.styles.hover)
					.map(([key, value]) => `${key}: ${value}`)
					.join(";")}
			}
			.pagination-numbers__symbol.disabled {
				${Object.entries(this.styles.disabled)
					.map(([key, value]) => `${key}: ${value}`)
					.join(";")}
			}
		`;
		document.head.appendChild(styleElement);
	}

	insertPageNumber(page, container, beforeElement) {
		const pageItem = document.createElement("li");
		pageItem.className = `pagination-numbers__item ${this.currentPage === page ? "active" : ""}`;
		// 決定頁碼顯示文字
		if (typeof this.pageFormatter === "function") {
			// 使用自訂格式化函式
			pageItem.innerHTML = this.pageFormatter(page, this.totalPage, this.currentPage);
		} else if (this.displayFormat === "fraction") {
			// 使用分數格式
			pageItem.textContent = `${page}/${this.totalPage}`;
		} else {
			// 使用一般數字格式
			pageItem.textContent = page;
		}
		pageItem.dataset.page = page;
		container.insertBefore(pageItem, beforeElement);
	}

	insertEllipsis(container, beforeElement) {
		const ellipsis = document.createElement("li");
		ellipsis.className = "pagination-numbers__item ellipsis";
		ellipsis.textContent = "...";
		ellipsis.dataset.disabled = "true"; // 添加禁用標記
		container.insertBefore(ellipsis, beforeElement);
	}

	updateButtonStates(paginationNumbers) {
		if (this.showFirst) {
			paginationNumbers.querySelector(".pagination-first").classList.toggle("disabled", this.currentPage === 1);
		}
		if (this.showLast) {
			paginationNumbers.querySelector(".pagination-last").classList.toggle("disabled", this.currentPage === this.totalPage);
		}
		paginationNumbers.querySelector(".pagination-prev").classList.toggle("disabled", this.currentPage === 1);
		paginationNumbers.querySelector(".pagination-next").classList.toggle("disabled", this.currentPage === this.totalPage);
	}
}
