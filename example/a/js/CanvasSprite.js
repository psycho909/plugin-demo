export function CanvasSprite(target, step, speed) {
	this.imgArr = [];
	this.index = 0;
	this.loop = false;
	this.target = target;
	this.el = null;
	this.step = step;
	this.width = 0;
	this.height = 0;
	this.speed = speed || step / 2;
	this.Init();
}
CanvasSprite.prototype.Init = function () {
	this.el = this.target[0].getContext("2d");
	$(this.el.canvas).addClass("loading");
};
CanvasSprite.prototype.PreLoad = function (path, name = "") {
	var count = 0;
	var _this = this;
	return new Promise((resolve, reject) => {
		for (var i = 0; i < this.step; i++) {
			let currentIndex = i;
			let newName;

			// 如果name是空的或不包含数字，直接在name后加上索引
			if (name === "" || !/\d/.test(name)) {
				newName = name + currentIndex;
			} else {
				// 如果name包含数字，找到数字部分并递增
				let paddedIndex = (parseInt(name.match(/\d+$/)[0], 10) + currentIndex).toString();
				// 用0填充数字保持相同长度
				paddedIndex = paddedIndex.padStart(name.match(/\d+$/)[0].length, "0");
				// 替换name中的数字部分
				newName = name.replace(/\d+$/, paddedIndex);
			}

			this.imgArr[i] = new Image();
			this.imgArr[i].src = path + newName + ".png";
			this.imgArr[i].onload = function () {
				_this.width = _this.imgArr[0].width; // 確保寬度取自第一張圖片
				_this.height = _this.imgArr[0].height; // 確保高度取自第一張圖片
				count++;
				if (count === _this.step) {
					$(_this.el.canvas).removeClass("loading");
					_this.Draw(0);
					resolve(true);
				}
			};
			this.imgArr[i].onerror = function () {
				count++;
				if (count === _this.step) {
					$(_this.el.canvas).removeClass("loading");
					reject(new Error("Image failed to load at index: " + currentIndex));
				}
			};
		}
	});
};

CanvasSprite.prototype.Run = function (durationInSeconds = 1, callback) {
	clearInterval(this.loop);
	const _this = this;
	let startTime = performance.now();
	let stepInterval = (durationInSeconds * 1000) / this.step;

	return new Promise((resolve, reject) => {
		function runAnimation(now) {
			const elapsed = now - startTime;
			if (typeof callback === "function") {
				callback(_this.index);
			}
			if (elapsed > stepInterval * _this.index) {
				_this.Draw(_this.index);
				_this.index++;
			}

			if (_this.index < _this.step) {
				requestAnimationFrame(runAnimation);
			} else {
				_this.index = 0;
				resolve(); // 當動畫完成時解決 Promise
			}
		}
		requestAnimationFrame(runAnimation);
	});
};

CanvasSprite.prototype.Loop = function (speedMultiplier = 1) {
	cancelAnimationFrame(this.animationFrame);
	const _this = this;
	let then = performance.now();
	// 根據速度乘數調整 fpsInterval
	// let fpsInterval = 1000 / this.speed / speedMultiplier;
	let fpsInterval = (speedMultiplier * 1000) / this.step;

	function animate(now) {
		_this.animationFrame = requestAnimationFrame(animate);

		const elapsed = now - then;

		if (elapsed > fpsInterval) {
			then = now - (elapsed % fpsInterval);

			_this.Draw(_this.index);
			_this.index = (_this.index + 1) % _this.step;
		}
	}

	animate(performance.now());
};
CanvasSprite.prototype.Stop = function () {
	this.index = 0;
	cancelAnimationFrame(this.animationFrame); // 取消動畫幀請求
	this.Draw(this.index); // 繪製第一幀（或任何應該顯示的幀）
};

CanvasSprite.prototype.Draw = function (index) {
	this.el.clearRect(0, 0, this.width, this.height);
	if (this.imgArr[index].complete) {
		this.el.drawImage(this.imgArr[index], 0, 0);
	}
};
