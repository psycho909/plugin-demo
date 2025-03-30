// Social Share Buttons Script

(function (exports) {
	// Function to update sharing links
	function updateShareLinks(container = document) {
		const defaultUrl = window.location.href;
		const defaultTitle = document.title;
		const defaultDesc = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
		const defaultCopyText = "連結已複製!";
		// Update each share link
		container.querySelectorAll(".g-share *").forEach((el) => {
			// 找到當前元素的最近的 .g-share 父元素
			const parentShare = el.closest(".g-share");
			const customUrl = el.getAttribute("data-url") || (parentShare ? parentShare.getAttribute("data-url") : null) || defaultUrl;
			const customTitle = el.getAttribute("data-title") || (parentShare ? parentShare.getAttribute("data-title") : null) || defaultTitle;
			const customDesc = el.getAttribute("data-desc") || (parentShare ? parentShare.getAttribute("data-desc") : null) || defaultDesc;
			const customHashtag = el.getAttribute("data-hashtag") || (parentShare ? parentShare.getAttribute("data-hashtag") : null);
			const customCopyText = el.getAttribute("data-copy-text") || (parentShare ? parentShare.getAttribute("data-copy-text") : null) || defaultCopyText;
			// Process hashtags
			let twitterHashtags = "";
			let facebookHashtags = "";
			if (customHashtag) {
				const tagsArray = customHashtag.split(",").map((tag) => (tag.trim().startsWith("#") ? tag.trim().substring(1) : tag.trim()));

				twitterHashtags = tagsArray.join(",");
				facebookHashtags = tagsArray.map((tag) => `%23${tag}`).join(",");
			}
			switch (true) {
				case el.classList.contains("g-share-line"):
					el.href = `https://social-plugins.line.me/lineit/share?url=${customUrl}&text=${encodeURIComponent(customTitle)}`;
					break;
				case el.classList.contains("g-share-fb"):
					el.href = `https://www.facebook.com/sharer/sharer.php?u=${customUrl}` + (facebookHashtags ? `&hashtag=${facebookHashtags}` : "");
					break;
				case el.classList.contains("g-share-meta"):
					el.href = `https://www.facebook.com/sharer/sharer.php?u=${customUrl}` + (facebookHashtags ? `&hashtag=${facebookHashtags}` : "");
					break;
				case el.classList.contains("g-share-twitter"):
					el.href = `https://x.com/intent/tweet?text=${encodeURIComponent(customTitle)}&url=${customUrl}` + (twitterHashtags ? `&hashtags=${twitterHashtags}` : "");
					break;
				case el.classList.contains("g-share-x"):
					el.href = `https://x.com/intent/tweet?text=${encodeURIComponent(customTitle)}&url=${customUrl}` + (twitterHashtags ? `&hashtags=${twitterHashtags}` : "");
					break;
				case el.classList.contains("g-share-native"):
					el.onclick = () => {
						navigator.share({ title: customTitle, text: customDesc, url: customUrl });
					};
					break;
				case el.classList.contains("g-share-copy"):
					el.onclick = () => {
						navigator.clipboard
							.writeText(customUrl)
							.then(() => alert(customCopyText))
							.catch((err) => console.error("Error in copying text: ", err));
					};
					break;
			}
		});
	}
	/**
	 * @param {*} url 分享網址
	 * @param {*} title  分享標題
	 * @param {*} description  分享描述
	 * @param {*} hashtags 分享標籤
	 * @returns {Object} 回傳分享連結
	 */
	exports.generateSocialShareUrls = function ({ url = "", title = "", description = "", hashtags = [] } = {}) {
		// Encode the common parameters
		const defaultUrl = window.location.origin + window.location.pathname;
		const finalUrl = url || defaultUrl;
		const encodedUrl = encodeURIComponent(finalUrl);
		const encodedTitle = encodeURIComponent(title);
		const encodedDescription = encodeURIComponent(description);

		// Process hashtags for Twitter and Facebook
		let twitterHashtags = "";
		let facebookHashtags = "";
		if (hashtags && hashtags.length > 0) {
			twitterHashtags = hashtags.join(",");
			facebookHashtags = hashtags.map((tag) => `%23${encodeURIComponent(tag)}`).join(",");
		}

		// Generate share URLs
		const shareUrls = {
			line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` + (facebookHashtags ? `&hashtag=${facebookHashtags}` : ""),
			x: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` + (twitterHashtags ? `&hashtags=${twitterHashtags}` : ""),
			native: {
				title: title,
				text: description,
				url: finalUrl
			},
			copy: finalUrl
		};

		return shareUrls;
	};
	// 可用來初始化分享按鈕
	exports.initSocialShare = function () {
		updateShareLinks();
	};
	var target = document.documentElement || document.body;
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					if (node.matches(".g-share")) {
						updateShareLinks(node);
					} else {
						updateShareLinks(node);
					}
				}
			});
		});
	});
	observer.observe(target, {
		childList: true,
		subtree: true,
		characterDataOldValue: false
	});
	document.addEventListener("DOMContentLoaded", function () {
		initSocialShare();
	});
})(this);
