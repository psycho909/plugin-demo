/* --- 全域變數與輔助函式 --- */
let isDropdownGlobalEventSet = false;

function closeAllCustomDropdowns(exceptElement) {
    const items = document.querySelectorAll(".dropdown-items");
    const selectedDivs = document.querySelectorAll(".dropdown-selected");
    
    items.forEach((item, index) => {
        if (exceptElement === selectedDivs[index]) return;
        
        item.classList.remove("dropdown-show");
        item.classList.remove("open-up");
        // 關閉時重置 max-height，避免下次計算錯誤
        item.style.maxHeight = ''; 
        selectedDivs[index].classList.remove("active");
    });
}

/* --- 主函式 --- */
function createCustomDropdown(selectElement) {
    if (!selectElement) return;

    if (!isDropdownGlobalEventSet) {
        document.addEventListener("click", function(e) {
            closeAllCustomDropdowns(e.target);
        });
        isDropdownGlobalEventSet = true;
    }

    // 建立 DOM
    const wrapper = document.createElement("div");
    wrapper.className = "custom-dropdown";

    const selectedDiv = document.createElement("div");
    selectedDiv.className = "dropdown-selected";
    
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    selectedDiv.innerHTML = selectedOption ? selectedOption.innerHTML : "&nbsp;";
    
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "dropdown-items";

    // 複製選項
    Array.from(selectElement.options).forEach((option, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "dropdown-item";
        itemDiv.innerHTML = option.innerHTML;
        
        if (option.disabled) itemDiv.classList.add("disabled");
        if (index === selectElement.selectedIndex) itemDiv.classList.add("same-as-selected");

        itemDiv.addEventListener("click", function(e) {
            if (option.disabled) return;
            
            selectedDiv.innerHTML = this.innerHTML;
            selectElement.selectedIndex = index;
            selectElement.dispatchEvent(new Event('change'));
            
            const siblings = optionsDiv.querySelectorAll(".dropdown-item");
            siblings.forEach(el => el.classList.remove("same-as-selected"));
            this.classList.add("same-as-selected");
            
            closeAllCustomDropdowns(); 
        });

        optionsDiv.appendChild(itemDiv);
    });

    wrapper.appendChild(selectedDiv);
    wrapper.appendChild(optionsDiv);
    
    if (selectElement.parentNode) {
        selectElement.parentNode.insertBefore(wrapper, selectElement.nextSibling);
        selectElement.style.display = 'none';
    }

    // --- 核心邏輯：點擊時計算高度 ---
    selectedDiv.addEventListener("click", function(e) {
        e.stopPropagation();

        // 1. 先關閉其他選單
        closeAllCustomDropdowns(this);
        
        // 2. 切換當前選單狀態
        optionsDiv.classList.toggle("dropdown-show");
        this.classList.toggle("active");

        if (optionsDiv.classList.contains("dropdown-show")) {
            // 先重置 max-height，讓它自然撐開以取得原始高度
            optionsDiv.style.maxHeight = ''; 

            // 偷看高度 (visibility hidden)
            const prevDisplay = optionsDiv.style.display;
            optionsDiv.style.display = "block";
            
            const dropdownHeight = optionsDiv.offsetHeight;
            const rect = selectedDiv.getBoundingClientRect();
            
            // 計算上下剩餘空間
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            
            optionsDiv.style.display = prevDisplay; // 還原 display

            // 判斷方向
            // 如果下方空間不足以顯示完整列表，且上方空間比下方大 -> 往上
            // 這裡我設了一個條件：下方空間 < 高度 且 下方空間真的很小 (例如 < 200px) 才考慮往上
            // 或者你可以簡單地寫： if (spaceBelow < dropdownHeight) -> 視情況往上
            
            let isUp = false;
            // 策略：優先往下，除非下方空間小於完整高度，且上方空間比較大
            if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                isUp = true;
            }

            if (isUp) {
                optionsDiv.classList.add("open-up");
                // 設定最大高度 = 上方剩餘空間 - 10px (保留一點邊距)
                optionsDiv.style.maxHeight = (spaceAbove - 10) + "px";
            } else {
                optionsDiv.classList.remove("open-up");
                // 設定最大高度 = 下方剩餘空間 - 10px
                optionsDiv.style.maxHeight = (spaceBelow - 10) + "px";
            }
            
            // 自動滾動到選中項目 (因為現在有 max-height 了，這個功能加回來體驗會比較好)
            const activeItem = optionsDiv.querySelector(".same-as-selected");
            if (activeItem) {
                optionsDiv.scrollTop = activeItem.offsetTop;
            }
        }
    });
}