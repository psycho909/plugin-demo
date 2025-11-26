/* --- 全域變數與輔助函式 --- */
let isDropdownGlobalEventSet = false;

function closeAllCustomDropdowns(exceptElement) {
	const items = document.querySelectorAll(".dropdown-items");
	const selectedDivs = document.querySelectorAll(".dropdown-selected");

	items.forEach((item, index) => {
		// 如果當前點擊的是這個選單的按鈕，則跳過 (交給 toggle 處理)
		if (exceptElement === selectedDivs[index]) return;

		item.classList.remove("dropdown-show");
		item.classList.remove("open-up");

		// --- 新增：關閉時移除 active 樣式 ---
		selectedDivs[index].classList.remove("active");
	});
}

/* --- 主函式 --- */
function createCustomDropdown(selectElement) {
	if (!selectElement) return;

	// 1. 初始化全域監聽
	if (!isDropdownGlobalEventSet) {
		document.addEventListener("click", function (e) {
			closeAllCustomDropdowns(e.target);
		});
		isDropdownGlobalEventSet = true;
	}

	// 2. 建立 DOM
	const wrapper = document.createElement("div");
	wrapper.className = "custom-dropdown";
	// 如果想要繼承原本 select 的 class，可以加這行：
	// wrapper.className = "custom-dropdown " + selectElement.className;

	const selectedDiv = document.createElement("div");
	selectedDiv.className = "dropdown-selected";

	const selectedOption = selectElement.options[selectElement.selectedIndex];
	selectedDiv.innerHTML = selectedOption ? selectedOption.innerHTML : "&nbsp;";

	const optionsDiv = document.createElement("div");
	optionsDiv.className = "dropdown-items";

	// 3. 複製選項
	Array.from(selectElement.options).forEach((option, index) => {
		const itemDiv = document.createElement("div");
		itemDiv.className = "dropdown-item";
		itemDiv.innerHTML = option.innerHTML;

		if (option.disabled) itemDiv.classList.add("disabled");
		if (index === selectElement.selectedIndex) itemDiv.classList.add("same-as-selected");

		itemDiv.addEventListener("click", function (e) {
			if (option.disabled) return;

			selectedDiv.innerHTML = this.innerHTML;
			selectElement.selectedIndex = index;
			selectElement.dispatchEvent(new Event("change"));

			const siblings = optionsDiv.querySelectorAll(".dropdown-item");
			siblings.forEach((el) => el.classList.remove("same-as-selected"));
			this.classList.add("same-as-selected");

			closeAllCustomDropdowns(); // 這會自動移除 active
		});

		optionsDiv.appendChild(itemDiv);
	});

	wrapper.appendChild(selectedDiv);
	wrapper.appendChild(optionsDiv);

	if (selectElement.parentNode) {
		selectElement.parentNode.insertBefore(wrapper, selectElement.nextSibling);
		selectElement.style.display = "none";
	}

	// 4. 按鈕點擊事件
	selectedDiv.addEventListener("click", function (e) {
		e.stopPropagation();

		closeAllCustomDropdowns(this);

		// --- 修改處：同步切換 active class ---
		optionsDiv.classList.toggle("dropdown-show");
		this.classList.toggle("active");

		if (optionsDiv.classList.contains("dropdown-show")) {
			// 計算位置與空間
			const prevDisplay = optionsDiv.style.display;
			optionsDiv.style.display = "block";

			const dropdownHeight = optionsDiv.offsetHeight;
			const rect = selectedDiv.getBoundingClientRect();
			const spaceBelow = window.innerHeight - rect.bottom;

			optionsDiv.style.display = prevDisplay;

			if (spaceBelow < dropdownHeight && spaceBelow < 300) {
				optionsDiv.classList.add("open-up");
			} else {
				optionsDiv.classList.remove("open-up");
			}

			// 滾動定位
			const activeItem = optionsDiv.querySelector(".same-as-selected");
			if (activeItem) {
				optionsDiv.scrollTop = activeItem.offsetTop;
			}
		}
	});
}
