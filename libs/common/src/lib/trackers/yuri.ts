// 廣告商用的事件記錄器
// 事件 "AddToCart" 綁在 footer 的 deposit 鈕
// 事件 "Purchase" 綁在 deposit 表單的 submit

type yuriEventName = "AddToCart" | "Purchase";

export const yuriTrack = (eventName: yuriEventName) => {
	if (
		window &&
		"_yuri_track" in window &&
		typeof window._yuri_track === "function"
	) {
		window._yuri_track(eventName);
	}
};
