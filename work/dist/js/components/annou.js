import useEventStore from "../store.js";
const { ref, computed, watch, onMounted, onUnmounted } = Vue;
import { tabItems as configTabItems } from "../config/tabItems.js";
let annou = {
	setup() {
		const store = useEventStore();
		let currTab = ref("");
		let inputSearch = ref("");
		const tabItems = Vue.ref(configTabItems);
		let bulletinList = ref([
			{
				_StartDateALL: "2026/02/26 15:46:00",
				bullentinCatId: "569",
				bullentinId: "78841",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/26",
				startDateALL: "2026/02/26 15:46:00",
				title: "例行性維護開機公告",
				urlLink: null,
				mainPicture: null,
				thumbnail: null,
				examineDate: null
			},
			{
				_StartDateALL: "2026/02/26 15:35:00",
				bullentinCatId: "568",
				bullentinId: "78840",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/26",
				startDateALL: "2026/02/26 15:35:00",
				title: "【國際服】首位達到102級慶祝紀念活動第二階段",
				urlLink: null,
				mainPicture: null,
				thumbnail: null,
				examineDate: null
			},
			{
				_StartDateALL: "2026/02/26 15:33:00",
				bullentinCatId: "566",
				bullentinId: "78839",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/26",
				startDateALL: "2026/02/26 15:33:00",
				title: "【燃燒的炎魔要塞】入場時間問題暨限時補償公告",
				urlLink: null,
				mainPicture: null,
				thumbnail: null,
				examineDate: null
			},
			{
				_StartDateALL: "2026/02/26 15:32:00",
				bullentinCatId: "566",
				bullentinId: "78838",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/26",
				startDateALL: "2026/02/26 15:32:00",
				title: "【卡瑪的祝福寶箱】",
				urlLink: "https://lineagenew-event.beanfun.com/eventad/eventad?eventadid=16317",
				mainPicture: null,
				thumbnail: null,
				examineDate: null
			},
			{
				_StartDateALL: "2026/02/26 15:31:00",
				bullentinCatId: "566",
				bullentinId: "78837",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/26",
				startDateALL: "2026/02/26 15:31:00",
				title: "【鬥魂的保護卷軸促銷】",
				urlLink: "https://lineagenew-event.beanfun.com/eventad/eventad?eventadid=16316",
				mainPicture: null,
				thumbnail: null,
				examineDate: null
			},
			{
				_StartDateALL: "2026/02/26 15:30:00",
				bullentinCatId: "566",
				bullentinId: "78836",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/26",
				startDateALL: "2026/02/26 15:30:00",
				title: "【排行變身活動】",
				urlLink: "https://lineagenew-event.beanfun.com/eventad/eventad?eventadid=16318",
				mainPicture: null,
				thumbnail: null,
				examineDate: null
			},
			{
				_StartDateALL: "2026/02/23 19:01:00",
				bullentinCatId: "569",
				bullentinId: "74450",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/23",
				startDateALL: "2026/02/23 19:01:00",
				title: "【天堂REMASTERED】已知問題處理說明 (2026/02/23 19:05更新)",
				urlLink: null,
				mainPicture: null,
				thumbnail: null,
				examineDate: "2026/02/23 18:59:50"
			},
			{
				_StartDateALL: "2026/02/13 15:11:00",
				bullentinCatId: "566",
				bullentinId: "78774",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/13",
				startDateALL: "2026/02/13 15:11:00",
				title: "【迎春卡瑪福氣寶箱消費滿額贈活動】",
				urlLink: null,
				mainPicture: null,
				thumbnail: null,
				examineDate: "2026/02/13 15:26:32"
			},
			{
				_StartDateALL: "2026/02/12 15:30:00",
				bullentinCatId: "569",
				bullentinId: "78756",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/12",
				startDateALL: "2026/02/12 15:30:00",
				title: "【國際服】例行性維護開機公告",
				urlLink: null,
				mainPicture: null,
				thumbnail: null,
				examineDate: null
			},
			{
				_StartDateALL: "2026/02/12 15:00:00",
				bullentinCatId: "568",
				bullentinId: "78755",
				bullentinRootId: "565",
				endDate: "2199-01-01T23:59:59+08:00",
				startDate: "2026/02/12",
				startDateALL: "2026/02/12 15:00:00",
				title: "【國際服】首位達到102級慶祝紀念活動",
				urlLink: null,
				mainPicture: null,
				thumbnail: null,
				examineDate: null
			}
		]);
		let handleTabClick = (item) => {
			const isValidTab = tabItems.value.some((validItem) => validItem.tab === item.tab);
			if (currTab.value === item.tab) return;
			if (!isValidTab) {
				console.warn("偵測到無效的 Tab 切換請求，已攔截");
				return;
			}
			currTab.value = item.tab;
			const currentUrl = new URL(window.location.href);
			currentUrl.searchParams.set("kind", item.tab);
			window.history.replaceState({}, "", currentUrl);
			// fetchTabData(item.tab) 打API;
		};
		const handleSubmit = () => {
			const rawString = inputSearch.value;
			if (!rawString.trim()) return;
			const cleanSearchText = DOMPurify.sanitize(rawString);
			if (!cleanSearchText) {
				console.warn("輸入包含無效或惡意內容");
				inputSearch.value = "";
				return;
			}
			console.log("準備送出的乾淨字串:", cleanSearchText);
			// fetchAPI(cleanSearchText) ...
		};
		const convertLabel = (label) => {
			if (!label) return "";
			const findItem = tabItems.value.find((item) => item.type == label);
			if (findItem) {
				return findItem.label;
			}
			const findItemTab = tabItems.value.find((item) => item.tab == label);
			return findItemTab ? findItemTab.label : "系統";
		};
		const convertClass = (label) => {
			if (!label) return "";
			const findItem = tabItems.value.find((item) => item.type == label);
			if (findItem) {
				return findItem.class;
			}
			const findItemTab = tabItems.value.find((item) => item.tab == label);
			return findItemTab ? findItemTab.class : "system";
		};
		const getTarget = (item) => {
			if (item.urlLink) {
				return {
					target: "_blank",
					rel: "noopener noreferrer"
				};
			}
			return { target: "_self" };
		};
		const formatDate = (startDateALL, startDate) => {
			const now = new Date();
			const startTime = new Date(startDateALL);
			const diffMinutes = Math.floor((now - startTime) / (1000 * 60));

			if (diffMinutes < 30) {
				return "剛剛";
			} else {
				const month = String(startTime.getMonth() + 1).padStart(2, "0");
				const day = String(startTime.getDate()).padStart(2, "0");

				return `${month}/${day}`;
			}
		};
		onMounted(() => {
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
		const truncateText = (text, maxLength = 20) => {
  if (!text) return "";
  // 如果字數大於 20，就截取前 20 個字並加上 ...
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
		return {
			currTab,
			handleTabClick,
			handleSubmit,
			inputSearch,
			bulletinList,
			getTarget,
			convertClass,
			convertLabel,
			formatDate,
			tabItems,
			truncateText
		};
	},
	template: `
    <div class="annoc-section">
        <div class="annoc-head">
            <div class="annoc-tabs">
				<div v-for="(item, index) in tabItems" :key="index"
					:class="[currTab == item.tab ? 'curr' : '','annoc-tabs__item']"
					:data-type="item.type"
					@click="handleTabClick(item)">
					{{ item.blabel }}
				</div>
            </div>
            <div class="annoc-search">
                <input type="text" class="annoc-search__input" placeholder="搜尋公告" v-model="inputSearch" />
                <a href="javascript:;" class="annoc-search__btn" @click="handleSubmit"></a>
            </div>
        </div>
        <div class="annoc-list">
			<a :href="[bulletin.urlLink ? bulletin.urlLink : '/BulletinDetail?Bid='+bulletin.bullentinId]" v-bind="getTarget(bulletin)" class="annoc-item new" v-for="bulletin in bulletinList" v-memo="[bulletin.bullentinId, bulletin.title, bulletin.startDate]">
				<span class="annoc-item__tag" :data-label="bulletin.bullentinCatId" :data-type="convertClass(bulletin.bullentinCatId)">{{convertLabel(bulletin.bullentinCatId)}}</span>
				<span class="annoc-item__title-box"><span class="annoc-item__title">{{ truncateText(bulletin.title, 20) }}<span class="new">New!</span></span></span>
				<span class="annoc-item__date">{{ formatDate(bulletin.startDateALL, bulletin.startDate) }}</span>
			</a>
        </div>
        <div id="page-container" class="pagination-container"></div>
    </div>
    `
};

export default annou;
