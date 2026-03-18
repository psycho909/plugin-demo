import useEventStore from "../store.js";
const { ref, onMounted } = Vue;

let update = {
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

		onMounted(() => {
			if (typeof createCustomDropdown == "function") {
				createCustomDropdown(document.getElementById("year"));
				createCustomDropdown(document.getElementById("month"));
			}
			if (isMobile.any) {
				let pg = new PaginationCore({
					container: document.querySelector("#page-container"),
					totalPage: 20,
					initialPage: 1,
					pageNumberLimit: 10,
					mode: "select",
					labels: {
						first: "第一頁",
						last: "最後一頁",
						prev: "上一頁",
						next: "下一頁"
					}
				});
			} else {
				let pg = new PaginationCore({
					container: document.querySelector("#page-container"),
					totalPage: 20,
					initialPage: 1,
					pageNumberLimit: 10,
					labels: {
						first: "第一頁",
						last: "最後一頁",
						prev: "上一頁",
						next: "下一頁"
					}
				});
			}
		});
		return {
			list
		};
	},
	template: `
    <div class="official-section">
        <div class="official-head">
            <div class="official-title" data-type="update">改版專區</div>
            <div class="official-filters">
                <div class="official-filter">
                    <select id="year" class="official-filter__select">
                        <option value="">年份</option>
                        <option value="1">2024</option>
                        <option value="2">2025</option>
                    </select>
                </div>
                <div class="official-filter">
                    <select id="month" class="official-filter__select">
                        <option value="">月份</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="official-content">
            <div class="official-item" v-for="item in list" 
                :key="item.id">
                <picture>
                    <source media="(max-width:768px )" :srcset="item.img" />
                    <img :src="item.img" alt="" />
                </picture>
                <div class="official-item__info">
                    {{ item.title }}
                </div>
            </div>
        </div>

        <div id="page-container" class="pagination-container"></div>
    </div>
    `
};

export default update;
