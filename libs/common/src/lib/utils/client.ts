type ReactNativeWebViewMessage =
	| { type: "SyncCurrency"; payload: number }
	| { type: "SyncLanguage"; payload: string }
	| { type: "SyncAuth"; payload: "login" | "logout" };

type ReactNativeWebView = {
	postMessage: (message: string) => void;
};

type ReactNativeWebViewWindow = typeof window & {
	ReactNativeWebView: ReactNativeWebView;
};

// 依需求以此判斷是否在 app 內: window.ReactNativeWebView != null
const isReactNativeWebView = () =>
	typeof window !== "undefined" &&
	"ReactNativeWebView" in window &&
	window.ReactNativeWebView != null;

const postMsgToApp = (message: ReactNativeWebViewMessage) => {
	if (
		isReactNativeWebView() &&
		typeof (window as ReactNativeWebViewWindow)?.ReactNativeWebView
			?.postMessage === "function"
	) {
		(window as ReactNativeWebViewWindow).ReactNativeWebView.postMessage(
			JSON.stringify(message)
		);
	}
};

export const isInApp = isReactNativeWebView;

export const setAppLanguage = (langCode: string) =>
	postMsgToApp({ type: "SyncLanguage", payload: langCode });

export const setAppAuth = (payload: "login" | "logout") =>
	postMsgToApp({ type: "SyncAuth", payload });
