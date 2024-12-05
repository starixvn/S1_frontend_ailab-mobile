// 廣告商用的事件記錄器

// Meta Pixel:
// 事件 "register" || "registerSubmit" 綁在 註冊頁 按鈕
// 事件 "deposit" || "depositSubmit" 綁在 deposit 表單的 submit

export type MetaPixelTrackerName =
	| "registerSubmit"
	| "depositSubmit"
	| "Purchase"
	| "withdraw"
	// 存款成功
	| "CompleteRegistration"
	// 首存
	| "StartTrial"
	// 再存
	| "redeposit";

export const MetaPixelTracker = (
	eventName: MetaPixelTrackerName,
	amount?: number,
	firstDeposit?: boolean,
	isoCode?: string
): void => {
	if (!(window && "fbq" in window && typeof window.fbq === "function"))
		return;

	const trackWithParams = (
		action: string,
		extraParams?: Record<string, unknown>
	) => {
		const params = { currency: isoCode, value: amount, ...extraParams };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).fbq("track", action, params);
	};

	switch (eventName) {
		case "CompleteRegistration":
			window.fbq("track", eventName);
			break;
		case "Purchase":
			trackWithParams(firstDeposit ? "StartTrial" : "redeposit");
			trackWithParams(eventName);
			break;
		case "withdraw":
			trackWithParams(eventName);
			break;
		default:
			window.fbq("trackCustom", eventName);
			break;
	}
};
