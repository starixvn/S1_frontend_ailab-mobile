// 依需求以此判斷是否在 app 內: window.ReactNativeWebView != null
export const isInApp = () =>
	typeof window !== "undefined" &&
	"ReactNativeWebView" in window &&
	window.ReactNativeWebView != null;
