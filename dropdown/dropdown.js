/* --- 全域變數與輔助函式 --- */
let isDropdownGlobalEventSet = false;

function closeAllCustomDropdowns(exceptElement) {
    const items = document.querySelectorAll(".dropdown-items");
    const selectedDivs = document.querySelectorAll(".dropdown-selected");
    
    items.forEach((item, index) => {
        if (exceptElement === selectedDivs[index]) return;
        
        item.classList.remove("dropdown-show");
        item.classList.remove("open-up");
        item.style.maxHeight = ''; 
        selectedDivs[index].classList.remove("active");
    });
}

/* --- 主函式 --- */
function createCustomDropdown(selectElement) {
    if (!selectElement) return;

    // 1. 初始化全域監聽
    if (!isDropdownGlobalEventSet) {
        document.addEventListener("click", function(e) {
            closeAllCustomDropdowns(e.target);
        });
        isDropdownGlobalEventSet = true;
    }

    // 2. 建立基本結構
    const wrapper = document.createElement("div");
    wrapper.className = "custom-dropdown";

    const selectedDiv = document.createElement("div");
    selectedDiv.className = "dropdown-selected";
    
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "dropdown-items";

    wrapper.appendChild(selectedDiv);
    wrapper.appendChild(optionsDiv);

    if (selectElement.parentNode) {
        selectElement.parentNode.insertBefore(wrapper, selectElement.nextSibling);
        selectElement.style.display = 'none';
    }

    // 3. 渲染邏輯 (Render Function)
    function renderOptions() {
        optionsDiv.innerHTML = '';
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        selectedDiv.innerHTML = selectedOption ? selectedOption.innerHTML : "&nbsp;";

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
    }
    renderOptions();

    // 4. 監聽變動
    const observer = new MutationObserver(renderOptions);
    observer.observe(selectElement, { childList: true, attributes: true, subtree: true });
    
    selectElement.addEventListener('change', function() {
         const selectedOption = selectElement.options[selectElement.selectedIndex];
         if(selectedOption) {
             selectedDiv.innerHTML = selectedOption.innerHTML;
             const items = optionsDiv.querySelectorAll(".dropdown-item");
             items.forEach((el, idx) => {
                 if(idx === selectElement.selectedIndex) el.classList.add("same-as-selected");
                 else el.classList.remove("same-as-selected");
             });
         }
    });

    // --- 5. 按鈕點擊事件 (更新高度計算邏輯) ---
    selectedDiv.addEventListener("click", function(e) {
        e.stopPropagation();

        closeAllCustomDropdowns(this);
        
        optionsDiv.classList.toggle("dropdown-show");
        this.classList.toggle("active");

        if (optionsDiv.classList.contains("dropdown-show")) {
            optionsDiv.style.maxHeight = ''; 

            const prevDisplay = optionsDiv.style.display;
            optionsDiv.style.display = "block";
            
            // 取得完整列表高度
            const dropdownHeight = optionsDiv.offsetHeight;
            const rect = selectedDiv.getBoundingClientRect();
            
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            
            // --- 新增：取得單個 Item 的高度 ---
            // 嘗試抓第一個選項，如果列表是空的則給預設值 40
            const firstItem = optionsDiv.querySelector('.dropdown-item');
            const itemHeight = firstItem ? firstItem.offsetHeight : 40; 
            
            optionsDiv.style.display = prevDisplay; 

            let isUp = false;

            // --- 判斷邏輯更新 ---
            // 情況 1: 下方空間連一個選項都放不下 -> 強制往上
            if (spaceBelow < itemHeight) {
                isUp = true;
            } 
            // 情況 2: 下方空間不夠放全部，且上方空間比下方大 -> 往上
            else if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                isUp = true;
            }

            // 執行定位與高度設定
            if (isUp) {
                optionsDiv.classList.add("open-up");
                // 設定高度 (確保不會貼死視窗邊緣，扣掉 10px)
                optionsDiv.style.maxHeight = (spaceAbove - 60) + "px";
            } else {
                optionsDiv.classList.remove("open-up");
                // 如果是正常往下，且空間不足以顯示全部，才限制高度
                if (spaceBelow < dropdownHeight) {
                     optionsDiv.style.maxHeight = (spaceBelow - 60) + "px";
                }
            }
            
            const activeItem = optionsDiv.querySelector(".same-as-selected");
            if (activeItem) {
                optionsDiv.scrollTop = activeItem.offsetTop;
            }
        }
    });
}