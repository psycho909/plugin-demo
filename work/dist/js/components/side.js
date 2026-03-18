import useEventStore from "../store.js";
const { ref, computed, watch, onMounted, onUnmounted } = Vue;

let side = {
	setup() {
		const store = useEventStore();
		const audio = new Audio();
		const currentTrack = computed(() => store.playlist[store.currentIndex]);

		const loadAndPlay = (isNewTrack = false) => {
			if (!currentTrack.value) return;

			audio.src = currentTrack.value.url;

			if (isNewTrack) {
				audio.currentTime = 0;
				localStorage.setItem("my_bgm_time", 0);
			} else {
				const savedTime = Number(localStorage.getItem("my_bgm_time")) || 0;
				audio.currentTime = savedTime;
			}

			if (store.isPlaying) {
				audio.play().catch((err) => {
					console.warn("瀏覽器自動播放限制，需手動點擊播放:", err);
					store.isPlaying = false;
					localStorage.setItem("my_bgm_playing", "false");
				});
			}
		};

		watch(
			() => store.currentIndex,
			(newIndex, oldIndex) => {
				if (newIndex !== oldIndex) {
					loadAndPlay(true);
				}
			}
		);

		const togglePlay = () => {
			if (!currentTrack.value) return;
			if (!audio.src) audio.src = currentTrack.value.url;

			if (store.isPlaying) {
				audio.pause();
				store.isPlaying = false;
				localStorage.setItem("my_bgm_playing", "false");
			} else {
				audio.play().catch((e) => console.warn(e));
				store.isPlaying = true;
				localStorage.setItem("my_bgm_playing", "true");
			}
		};

		const nextTrack = () => {
			store.currentIndex = (store.currentIndex + 1) % store.playlist.length;
			localStorage.setItem("my_bgm_index", store.currentIndex);
			localStorage.setItem("my_bgm_time", 0);
		};

		const prevTrack = () => {
			store.currentIndex = (store.currentIndex - 1 + store.playlist.length) % store.playlist.length;
			localStorage.setItem("my_bgm_index", store.currentIndex);
			localStorage.setItem("my_bgm_time", 0);
		};

		audio.ontimeupdate = () => {
			localStorage.setItem("my_bgm_time", audio.currentTime);
		};
		audio.onended = () => {
			nextTrack();
			store.isPlaying = true;
			loadAndPlay(true);
		};

		onMounted(() => {
			if (currentTrack.value) {
				audio.src = currentTrack.value.url;
				audio.currentTime = Number(localStorage.getItem("my_bgm_time")) || 0;

				if (store.isPlaying) {
					audio.play().catch(() => {
						store.isPlaying = false;
						localStorage.setItem("my_bgm_playing", "false");
					});
				}
			}
		});

		return {
			playlist: computed(() => store.playlist),
			currentIndex: computed(() => store.currentIndex),
			isPlaying: computed(() => store.isPlaying),
			currentTrack,
			togglePlay,
			nextTrack,
			prevTrack
		};
	},
	template: `
    <div class="side-left">
        <a href="javascript:;" class="side-left__start"></a>
        <div class="side-left__box">
            <div class="side-left__list">
                <a href="javascript:;" class="side-left__list-item" data-type="account">帳號申請</a>
                <a href="javascript:;" class="side-left__list-item" data-type="download">遊戲下載</a>
                <a href="javascript:;" class="side-left__list-item" data-type="payment">儲值中心</a>
                <a href="javascript:;" class="side-left__list-item" data-type="protection">帳號防護</a>
                <a href="javascript:;" class="side-left__list-item" data-type="help">疑難排解</a>
                <div class="side-left__social">
                    <a href="javascript:;" class="side-left__social-item" data-type="f"></a>
                    <a href="javascript:;" class="side-left__social-item" data-type="dc"></a>
                    <a href="javascript:;" class="side-left__social-item" data-type="bh"></a>
                </div>
            </div>
            <div class="side-player">
                <div class="side-player__list"></div>

                <div class="side-player__title">
                {{ currentTrack?.title || '未在播放' }}
                </div>

                <div class="side-player__controls">
                    <a href="javascript:;" class="side-player__btn-prev" @click="prevTrack"></a>

                    <a 
                    href="javascript:;" 
                    class="side-player__btn-play" 
                    :class="isPlaying ? 'is-playing' : 'is-paused'"
                    @click="togglePlay"
                    ></a>

                    <a href="javascript:;" class="side-player__btn-next" @click="nextTrack"></a>
                </div>
            </div>
        </div>
    </div>
    <div class="side-right">
        <div class="side-right__top"></div>
        <a href="javascript:;" class="side-right__support">
            <span></span>
            <span>客服小幫手</span>
        </a>
    </div>
    `
};

export default side;
