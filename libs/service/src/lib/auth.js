import {
	api_account_UserLogin,
	api_account_UserLogout,
	api_accountStrict_GetCustProfile,
	api_site_CheckSignIn
} from "@ailab-mobile/api";

export const IS_LOGGED_IN = async () => {
	return await api_site_CheckSignIn().then(res => res.data.errorCode === 0);
};

const isBrowser = typeof window !== `undefined`;

export const LOGIN = async ({ userName, password }, CallbackLogin) => {
	if (!isBrowser) return false;

	let url,
		platform,
		userAgent,
		screen,
		di = "";
	if (typeof window !== undefined) {
		url = window.location.origin;
		platform = navigator.platform;
		userAgent = navigator.userAgent;
		screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`;
		di = document.getElementById("__di").value;
	}

	await api_account_UserLogin({
		UserName: userName,
		Userpwd: password,
		isPersistent: true,
		url,
		platform,
		userAgent,
		screen,
		di
	}).then(
		res => {
			if (res.data.errorCode === 0) {
				let userlangId = res.data.message.replace("/", "");

				api_accountStrict_GetCustProfile().then(res_custInfo => {
					let _loginUser = {
						userName: userName,
						langId: userlangId,
						isLogin: true
					};

					if (res_custInfo.data.errorCode === 0) {
						let data = res_custInfo.data.data;
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
	api_account_UserLogout().then(
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
