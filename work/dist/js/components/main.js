import useEventStore from "../store.js";
import { tabItems as configTabItems } from "../config/tabItems.js";
const { ref, computed, watch, onMounted, onUnmounted, nextTick } = Vue;

let main = {
	setup() {
		const store = useEventStore();
        const tabItems = Vue.ref(configTabItems);
		let currTab = ref("");
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
            if (currTab.value === item.tab) return;
			currTab.value = item.tab;
		};
        const formatDate = (startDateALL, startDate) => {
			const now = new Date();
			const startTime = new Date(startDateALL);
			const diffMinutes = Math.floor((now - startTime) / (1000 * 60));

			if (diffMinutes < 30) {
				return "剛剛";
			} else {
				// 取得月份 (0-11)，所以要 +1
				const month = String(startTime.getMonth() + 1).padStart(2, "0");
				// 取得日期 (1-31)
				const day = String(startTime.getDate()).padStart(2, "0");

				return `${month}/${day}`;
			}
		};
        const convertLabel = (label) => {
			if (!label) return "";
			// 當label在tabItems中的type，如果沒有就換查找tabItems中的tab，如果都沒有就回傳空字串
			const findItem = tabItems.value.find((item) => item.type == label);
			if (findItem) {
				return findItem.label;
			}
			const findItemTab = tabItems.value.find((item) => item.tab == label);
			return findItemTab ? findItemTab.label : "系統";
		};
		const convertClass = (label) => {
			if (!label) return "";
			// 當label在tabItems中的type，如果沒有就換查找tabItems中的tab，如果都沒有就回傳空字串
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
		onMounted(() => {
			nextTick(() => {
				var swiperAd = new Swiper(".main-ad__swiper", {
					navigation: {
						nextEl: ".main-ad__swiper-next",
						prevEl: ".main-ad__swiper-prev"
					}
				});

				var swiperMall = new Swiper(".main-mall__swiper", {
					navigation: {
						nextEl: ".main-mall__swiper-next",
						prevEl: ".main-mall__swiper-prev"
					}
				});
			});
		});
		return {
			currTab,
			handleTabClick,
			bulletinList,
			getTarget,
			convertClass,
			convertLabel,
			formatDate,
            tabItems
		};
	},
	template: `
    <div class="main-banner">
        <div class="main-banner__inner"><img src="./assets/css/images/main-banner.jpg" /></div>
    </div>
    <div class="main-content">
        <div class="main-section main-section--1">
            <div class="main-ad">
                <div class="main-ad__content main-ad__swiper swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <picture>
                                <source media="(max-width:768px )" srcset="./assets/css/images/m-ad01.jpg" />
                                <img src="./assets/css/images/ad01.jpg" alt="" />
                            </picture>
                        </div>
                        <div class="swiper-slide">
                            <picture>
                                <source media="(max-width:768px )" srcset="./assets/css/images/m-ad01.jpg" />
                                <img src="./assets/css/images/ad01.jpg" alt="" />
                            </picture>
                        </div>
                    </div>
                </div>
                <div class="main-ad__swiper-prev main-ad__swiper-btn"></div>
                <div class="main-ad__swiper-next main-ad__swiper-btn"></div>
            </div>
            <div class="main-annou">
                <div class="main-annou__head">
                    <div class="main-annou__tabs">
                        <a v-for="(item, index) in tabItems" :key="index"
                            href="javascript:;"
                            :class="[currTab == item.tab ? 'curr' : '','main-annou__tabs-item']"
                            :data-type="item.type"
                            @click="handleTabClick(item)">
                            {{ item.label }}
                        </a>
                    </div>
                    <a href="javascript:;" class="main-annou__tabs-more"></a>
                </div>
                <div class="main-annou__content">
                    <div class="main-annou__list">
                        <a :href="[bulletin.urlLink ? bulletin.urlLink : '/BulletinDetail?Bid='+bulletin.bullentinId]" v-bind="getTarget(bulletin)"  class="main-annou__item" v-for="bulletin in bulletinList.slice(0, 7)"  v-memo="[bulletin.bullentinId, bulletin.title, bulletin.startDate]">
                            <span class="main-annou__item-tag" :data-type="convertClass(bulletin.bullentinCatId)" :data-label="bulletin.bullentinCatId">{{convertLabel(bulletin.bullentinCatId)}}</span>
                            <span class="main-annou__item-title">{{bulletin.title}}</span>
                            <span class="main-annou__item-date">{{ formatDate(bulletin.startDateALL, bulletin.startDate) }}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-section main-section--2">
            <div class="main-dc">
                <div class="main-dc__title">
                    <div class="main-dc__title-text">官方Discord</div>
                    <a href="javascript:;" class="main-dc__title-link">加入官方DC</a>
                </div>
                <div class="main-dc__content"></div>
            </div>
            <div class="main-mall">
                <div class="main-mall__title">
                    <div class="main-mall__title-text">商城預覽</div>
                </div>
                <div class="main-mall__content main-mall__swiper swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <picture>
                                <source media="(max-width:768px )" srcset="./assets/css/images/m-mall01.jpg" />
                                <img src="./assets/css/images/mall01.jpg" alt="" />
                            </picture>
                        </div>
                        <div class="swiper-slide">
                            <picture>
                                <source media="(max-width:768px )" srcset="./assets/css/images/m-mall01.jpg" />
                                <img src="./assets/css/images/mall01.jpg" alt="" />
                            </picture>
                        </div>
                    </div>
                    <div class="main-mall__swiper-prev main-mall__swiper-btn"></div>
                    <div class="main-mall__swiper-next main-mall__swiper-btn"></div>
                </div>
            </div>
        </div>
        <div class="main-section main-official">
            <a href="javascript:;" class="main-official__item" data-type="video"><span>官方影片區</span></a>
            <a href="javascript:;" class="main-official__item" data-type="guide"><span>官方攻略區</span></a>
            <a href="javascript:;" class="main-official__item" data-type="art"><span>官方美術區</span></a>
            <a href="javascript:;" class="main-official__item" data-type="bgm"><span>官方BGM</span></a>
        </div>
    </div>
    `
};

export default main;
