import useEventStore from "../store.js";
const { ref, onMounted } = Vue;

let bgm = {
	setup() {
		const store = useEventStore();

		const list = ref([
			{ id: 101, title: "官方攻略圖+文 (曲目1)", url: "/music/bgm01.mp3", img: "./assets/css/images/official01.jpg" },
			{ id: 102, title: "官方攻略圖+文 (曲目2)", url: "/music/bgm02.mp3", img: "./assets/css/images/official01.jpg" },
			{ id: 103, title: "官方攻略圖+文 (曲目3)", url: "/music/bgm03.mp3", img: "./assets/css/images/official01.jpg" },
			{ id: 104, title: "官方攻略圖+文 (曲目4)", url: "/music/bgm04.mp3", img: "./assets/css/images/official01.jpg" },
			{ id: 105, title: "官方攻略圖+文 (曲目5)", url: "/music/bgm05.mp3", img: "./assets/css/images/official01.jpg" },
			{ id: 106, title: "官方攻略圖+文 (曲目6)", url: "/music/bgm06.mp3", img: "./assets/css/images/official01.jpg" }
		]);

		const playSong = (songObj) => {
			store.playNewMusic(songObj);
		};
		const isCurrentPlaying = (songId) => {
			const currentTrack = store.playlist[store.currentIndex];
			return currentTrack?.id === songId && store.isPlaying;
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
		return {
			list,
			playSong,
			isCurrentPlaying
		};
	},
	template: `
    <div class="official-section">
        <div class="official-head">
            <div class="official-title" data-type="bgm">改版專區</div>
        </div>
        <div class="official-content">
            
            <div 
                class="official-item" 
                v-for="item in list" 
                :key="item.id"
            >
                <picture>
                    <source media="(max-width:768px )" :srcset="item.img" />
                    <img :src="item.img" :alt="item.title" />
                </picture>
                
                <div class="official-item__info">
                    {{ item.title }}
                </div>
                
                <a :href="item.url" download class="official-bgm-download"></a>
                
                <a 
                    href="javascript:;" 
                    class="official-bgm-player" 
                    :class="{ 'is-playing': isCurrentPlaying(item.id) }"
                    @click="playSong(item)"
                ></a>
            </div>

        </div>

        <div id="page-container" class="pagination-container"></div>
    </div>
    `
};

export default bgm;
