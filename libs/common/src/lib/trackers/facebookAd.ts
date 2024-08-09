// 臉書廣告商用的事件記錄器

// Meta Pixel:
// 事件 "register" || "registerSubmit" 綁在 註冊頁 按鈕
// 事件 "deposit" || "depositSubmit" 綁在 deposit 表單的 submit

type MetaPixelTrackerName =
	| "registerSubmit"
	| "depositSubmit"
	| "deposit_successful"
	| "withdraw_successful";

export const MetaPixelTracker = (eventName: MetaPixelTrackerName) => {
	if (window && "fbq" in window && typeof window.fbq === "function") {
		window.fbq("trackCustom", eventName);
	}
};
