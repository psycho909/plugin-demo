import useEventStore from "../store.js";
const { ref, onMounted } = Vue;

let art = {
    setup() {
        const store = useEventStore();
        const list = ref([
            { id: 101, title: "官方攻略圖+文", url: "/music/bgm01.mp3", img: "./assets/css/images/official01.jpg" },
            { id: 102, title: "官方攻略圖+文", url: "/music/bgm02.mp3", img: "./assets/css/images/official01.jpg" },
            { id: 103, title: "官方攻略圖+文", url: "/music/bgm03.mp3", img: "./assets/css/images/official01.jpg" },
            { id: 104, title: "官方攻略圖+文", url: "/music/bgm04.mp3", img: "./assets/css/images/official01.jpg" },
            { id: 105, title: "官方攻略圖+文", url: "/music/bgm05.mp3", img: "./assets/css/images/official01.jpg" },
            { id: 106, title: "官方攻略圖+文", url: "/music/bgm06.mp3", img: "./assets/css/images/official01.jpg" }
        ]);

        const hoveredId = ref(null);
        // 新增：用來記錄大圖要顯示在上方還是下方
        const previewPosition = ref('bottom'); 
        let hideTimer = null;

        // 修改：加入 event 參數來取得元素位置
        const handleMouseEnter = (id, event) => {
			if (isMobile.any) return;
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }
            hoveredId.value = id;

            // 如果有傳入 event (代表是從外層圖片觸發，而不是從大圖觸發)
            if (event) {
                // 取得目前滑鼠停留的圖片，距離螢幕上下左右的座標
                const rect = event.currentTarget.getBoundingClientRect();
                
                // 計算下方剩餘空間：瀏覽器總高度 - 元素底部的 Y 座標
                const spaceBelow = window.innerHeight - rect.bottom;
                
                // 假設大圖展開後的高度大約是 250px (你可以根據實際圖片高度調整這個數字)
                const PREVIEW_HEIGHT = 250; 

                // 如果下方空間不夠，就把狀態改為 'top'
                if (spaceBelow < PREVIEW_HEIGHT) {
                    previewPosition.value = 'top';
                } else {
                    previewPosition.value = 'bottom';
                }
            }
        };

        const handleMouseLeave = () => {
			if (isMobile.any) return;
            hideTimer = setTimeout(() => {
                hoveredId.value = null;
            }, 150); 
        };
		const handleClick=()=>{
			if (!isMobile.any) return; // 電腦版直接擋掉不執行

            // 如果點擊的是已經打開的圖片，就關閉它
            if (hoveredId.value === id) {
                hoveredId.value = null;
            } else {
                // 打開新的圖片，並計算上下位置
                hoveredId.value = id;
            }
		}
        onMounted(() => {
            // ... (保持你原本的 Pagination 初始化邏輯不變) ...
            if (typeof createCustomDropdown == "function") {
                createCustomDropdown(document.getElementById("filter"));
                createCustomDropdown(document.getElementById("background"));
                createCustomDropdown(document.getElementById("character"));
            }
            if (isMobile.any) {
                let pg = new PaginationCore({
                    container: document.querySelector("#page-container"),
                    totalPage: 20, initialPage: 1, pageNumberLimit: 10, mode: "select",
                    labels: { first: "第一頁", last: "最後一頁", prev: "上一頁", next: "下一頁" }
                });
            } else {
                let pg = new PaginationCore({
                    container: document.querySelector("#page-container"),
                    totalPage: 20, initialPage: 1, pageNumberLimit: 10,
                    labels: { first: "第一頁", last: "最後一頁", prev: "上一頁", next: "下一頁" }
                });
            }
        });

        return {
            list,
            hoveredId,
            previewPosition,
            handleMouseEnter,
            handleMouseLeave,
			handleClick
        };
    },
    template: `
    <div class="official-section">
    <div class="official-head">
            <div class="official-title" data-type="art">官方美術區</div>
            <div class="official-filters">
                <div class="official-filter">
                    <select id="filter" class="official-filter__select">
                        <option value="" disabled selected>主視覺</option>
                        <option value="1">官方主視覺</option>
                        <option value="2">活動限定</option>
                        <option value="3">創作聯名</option>
                        <option value="4">週年慶祝</option>
                    </select>
                </div>
                <div class="official-filter">
                    <select id="background" class="official-filter__select">
                        <option value="" disabled selected>場景</option>
                        <option value="1">官方主視覺</option>
                        <option value="2">活動限定</option>
                        <option value="3">創作聯名</option>
                        <option value="4">週年慶祝</option>
                    </select>
                </div>
                <div class="official-filter">
                    <select id="character" class="official-filter__select">
                        <option value="" disabled selected>人物</option>
                        <option value="1">官方主視覺</option>
                        <option value="2">活動限定</option>
                        <option value="3">創作聯名</option>
                        <option value="4">週年慶祝</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="official-content">
            <div class="official-item official-item__art" 
                 v-for="item in list" 
                 :key="item.id"
                 @mouseenter="handleMouseEnter(item.id, $event)"
                 @mouseleave="handleMouseLeave"
                 @click="handleClick(item.id, $event)"
            >
                <div class="official-item__img">
                    <picture>
                        <source media="(max-width:768px )" :srcset="item.img" />
                        <img :src="item.img" alt="" />
                    </picture>
                </div>

                <div class="official-item__preview" 
                     :class="{ 'is-top': previewPosition === 'top' }"
                     v-show="hoveredId === item.id"
                     @mouseenter="handleMouseEnter(item.id)" 
                     @mouseleave="handleMouseLeave"
                     @click.stop="handleClick(item.id, $event)"
                >
					<a href="javascript:;" class="official-bgm-download"></a>
                    <img :src="item.img" :alt="item.title" />
                </div>
            </div>
        </div>

        <div id="page-container" class="pagination-container"></div>
    </div>
    `
};

export default art;