class VideoController {
	constructor(videoElement) {
		if (!(videoElement instanceof HTMLVideoElement)) {
			throw new Error("必須提供有效的視頻元素");
		}
		this.video = videoElement;
		this.callbacks = {
			play: [],
			pause: [],
			complete: [],
			end: []
		};
		this.initEventListeners();
	}

	initEventListeners() {
		this.video.addEventListener("play", () => {
			this.callbacks.play.forEach((callback) => callback());
		});

		this.video.addEventListener("pause", () => {
			this.callbacks.pause.forEach((callback) => callback());
		});

		this.video.addEventListener("ended", () => {
			this.callbacks.complete.forEach((callback) => callback());
			this.callbacks.end.forEach((callback) => callback());
		});
	}

	play() {
		if (this.video.readyState >= 2) {
			this.video.play();
		} else {
			this.video.addEventListener(
				"canplay",
				() => {
					this.video.play();
				},
				{ once: true }
			);
		}
	}

	pause() {
		this.video.pause();
	}

	onPlay(callback) {
		if (typeof callback === "function") {
			this.callbacks.play.push(callback);
		}
	}

	onPause(callback) {
		if (typeof callback === "function") {
			this.callbacks.pause.push(callback);
		}
	}

	onComplete(callback) {
		if (typeof callback === "function") {
			this.callbacks.complete.push(callback);
		}
	}

	onEnd(callback) {
		if (typeof callback === "function") {
			this.callbacks.end.push(callback);
		}
	}
}
