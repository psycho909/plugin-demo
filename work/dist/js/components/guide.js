import useEventStore from "../store.js";
const { ref, onMounted } = Vue;

let guide = {
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
				createCustomDropdown(document.getElementById("filter"));
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
			<div class="official-title" data-type="guide">改版專區</div>
			<div class="official-filters">
				<div class="official-filter">
					<select id="filter" class="official-filter__select">
						<option value="">攻略類別</option>
						<option value="1">官方主視覺</option>
						<option value="2">活動限定</option>
						<option value="3">創作聯名</option>
						<option value="4">週年慶祝</option>
					</select>
				</div>
			</div>
		</div>
		<div class="official-content">
			 <div class="official-item" v-for="item in list" 
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

export default guide;
