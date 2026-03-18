import { GetInitData } from "./api.js";
const { defineStore, storeToRefs } = Pinia;

const defaultPlaylist = [
	{ id: 1, title: "BGM 01", url: "https://tw.hicdn.beanfun.com/beanfun/WebImage/1597849156086.mp3" },
	{ id: 2, title: "BGM 02", url: "https://tw.hicdn.beanfun.com/beanfun/WebImage/1597849169164.mp3" }
];

const useEventStore = defineStore("Event", {
	state: () => {
		const savedPlaylist = JSON.parse(localStorage.getItem("my_bgm_playlist"));

		return {
			currentIndex: Number(localStorage.getItem("my_bgm_index")) || 0,
			isPlaying: localStorage.getItem("my_bgm_playing") === "true",
			playlist: savedPlaylist || defaultPlaylist 
		};
	},
	actions: {
		setToken(token) {
			this.token = token;
		},
		setLogin(login) {
			this.login = login;
		},
		async GetInitData() {
			try {
				const data = await GetInitData(this.token);
				console.log(data);
			} catch (err) {
				throw err;
			}
		},
		async loadGameConfig() {
			try {
				const module = await import("https://tw.hicdn.beanfun.com/beanfun/event/DragonNest/MileStone2025/js/data.js");
				const gameData = module.default;
				this.gameConfigData = gameData;
			} catch (error) {
				console.log(error);
			}
		},
		changeMusic(index) {
			if (this.currentIndex !== index) {
				this.currentIndex = index;
				localStorage.setItem("my_bgm_index", index);
				localStorage.setItem("my_bgm_time", 0);
			}
			this.isPlaying = true;
			localStorage.setItem("my_bgm_playing", "true");
		},
		playNewMusic(songObj) {
			// 檢查點擊的這首歌是否已經在 playlist 裡面了
			const existingIndex = this.playlist.findIndex((item) => item.id === songObj.id);

			if (existingIndex !== -1) {
				// 如果已經在歌單內，直接切換過去
				this.changeMusic(existingIndex);
			} else {
				// 如果是新歌，加到播放列表的最後面
				this.playlist.push(songObj);

				// 更新 localStorage 的歌單，這樣換到頁面 A 或 C 歌單才不會不見
				localStorage.setItem("my_bgm_playlist", JSON.stringify(this.playlist));

				// 切換到最新加入的這首歌 (即陣列的最後一筆)
				this.changeMusic(this.playlist.length - 1);
			}
		}
	}
});

export default useEventStore;
