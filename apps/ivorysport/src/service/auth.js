import api from "./api";

export const IS_LOGGED_IN = async () => {
	let result;
	try {
		const res = await api.site.CheckSignIn();
		result = res.data.errorCode === 0;
	} catch (error) {}
	return result;
};

const isBrowser = typeof window !== "undefined";

export const LOGIN = async ({ userName, password }, CallbackLogin) => {
	if (!isBrowser) return false;

	let url;
	let platform;
	let userAgent;
	let screen;
	let di = "";
	if (typeof window !== "undefined") {
		url = window.location.origin;
		platform = navigator.platform;
		userAgent = navigator.userAgent;
		screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`;
		di = document.getElementById("__di")?.value;
	}

	await api.account
		.UserLogin({
			UserName: userName,
			Userpwd: password,
			isPersistent: true,
			url,
			platform,
			userAgent,
			screen,
			di
		})
		.then(
			res => {
				if (res.data.errorCode === 0) {
					const userlangId = res.data.message.replace("/", "");

					api.accountStrict.GetCustProfile().then(res_custInfo => {
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
					CallbackLogin(
						res.data.errorCode,
						res.data.message,
						false,
						{}
					);
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
	api.account.UserLogout().then(
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
