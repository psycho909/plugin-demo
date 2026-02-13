let apiUrl=`/api/E20250101`;

// 取得點數
export const GetInitData = (token) => {
	return fech.fetchSdData({
		url: `${apiUrl}/GetInitData`,
		body: { token: token },
	});
};
