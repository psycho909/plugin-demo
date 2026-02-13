import { GetInitData } from "./api.js";
const { defineStore, storeToRefs } = Pinia;

const useEventStore = defineStore("Event", {
	state: () => ({
		token: "",
		login: false,
		gameConfigData: {},
	}),
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
	},
});

export default useEventStore;
