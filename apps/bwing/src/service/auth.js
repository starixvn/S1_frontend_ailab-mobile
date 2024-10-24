import { api_UserLogin, api_UserLogout } from "./api/account";
import { api_GetCustProfile } from "./api/accountStrict";
import { api_CheckSignIn } from "./api/site";

export const IS_LOGGED_IN = async () => {
	try {
		const res = await api_CheckSignIn();
		return res.data.errorCode === 0;
	} catch (error) {
		return null;
	}
};

const isBrowser = typeof window !== `undefined`;

export const LOGIN = async ({ userName, password, langId }, CallbackLogin) => {
	if (!isBrowser) return false;

	let url;
	let platform;
	let userAgent;
	let screen;

	if (typeof window !== "undefined") {
		url = window.location.origin;
		platform = navigator.platform;
		userAgent = navigator.userAgent;
		screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`;
	}

	await api_UserLogin(langId, {
		UserName: userName,
		Userpwd: password,
		isPersistent: true,
		url,
		platform,
		userAgent,
		screen
	}).then(
		res => {
			if (res.data.errorCode === 0) {
				const userlangId = res.data.message.replace("/", "");

				api_GetCustProfile().then(res_custInfo => {
					let _loginUser = {
						userName,
						langId: userlangId,
						isLogin: true
					};

					if (res_custInfo.data.errorCode === 0) {
						const { data } = res_custInfo.data;
						_loginUser = {
							..._loginUser,
							...data
						};
					}

					CallbackLogin(res.data.errorCode, "", true, _loginUser);
				});
			} else {
				CallbackLogin(res.data.errorCode, res.data.message, false, {});
			}
		},
		err => {
			CallbackLogin(999, "", false, {});
		}
	);

	return false;
};

export const LOGOUT = callback => {
	if (!isBrowser) return;
	api_UserLogout().then(
		res => {
			if (res.data.errorCode === 0) {
				callback();
			}
		},
		err => {
			if (err.response.status === 401) {
				callback();
			}
		}
	);
};
