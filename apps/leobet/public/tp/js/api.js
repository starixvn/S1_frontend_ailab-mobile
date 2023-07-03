const checkTpMaintain = async () => {
	const urlParams = new URLSearchParams(decodeURI(window.location.search));
	const tpId = urlParams.get("i");
	const tpGameType = urlParams.get("g");
	const requestId = urlParams.get("r");

	await fetch("/api/tp/TpMaintainCheck", {
		method: "POST",
		body: JSON.stringify({
			tpId,
			tpGameType,
			requestId
		}),
		headers: new Headers({
			"Content-Type": "application/json"
		})
	})
		.then(res => res.json())
		.catch(() => {
			// * 如果沒有權限導回首頁
			window.location.href = "/";
		})
		.then(response => {
			const { data: { isMaintain, maintainEndTime, returnUrl } = {} } =
				response ?? {};

			if (isMaintain) {
				// * 有權限且為維護時間，渲染維護時間及維護產品名稱
				const tpGameName = urlParams.get("t");
				const time = maintainEndTime ?? moment.utc().add(+1, "hours");
				const localTime = moment
					.utc(time)
					.local()
					.format("YYYY-MM-DD HH:mm");
				document.getElementById("from").textContent = tpGameName;
				document.getElementById(
					"endTime"
				).textContent = `${localTime} (${moment().format("Z")})`;
			} else {
				// * 有權限且非維護時間，導至該遊戲路徑
				window.location.href = returnUrl;
			}
		});
};
