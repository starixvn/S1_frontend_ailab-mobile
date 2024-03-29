import { siteRequest, defDeviceType } from "./base";

export const defBannerType = {
	Promotions: 1,
	HotEvent: 2,
	Slots: 3
};

export const defBannerActionMode = {
	NoAction: 1,
	GoToGame: 2,
	GoToBonus: 3,
	OpenWindow: 4,
	RedirectPage: 5,
	RedirectPageOfThisSite: 6
};

export const api_ExistsUserName = ({ UserName, langId }) =>
	siteRequest.post(`/ExistsUserName/${langId}`, { UserName });

export const api_ExistsEmail = ({ Email }) =>
	siteRequest.post(`/ExistsEmail`, { Email });

export const api_GetSiteCurrencyList = () =>
	siteRequest.post(`/GetSiteCurrencyList/`);

export const api_GetSiteLangList = () => siteRequest.post(`/GetSiteLangList/`);

export const api_CheckSignIn = () => siteRequest.post(`/CheckSignIn/`);

export const api_GetGamelist = () => siteRequest.post(`/GetGamelist`);

export const api_Site_GetGameListByDevice = () =>
	siteRequest.post(`/GetGameListByDevice`, {
		DeviceType: defDeviceType.Mobile
	});

export const api_ForgetPwd = ({ Email, langId }) =>
	siteRequest.post(`/ForgetPwdV2/${langId}`, { Email, flag: 2 });

export const api_GetTpIds = () => siteRequest.post(`/GetTpIds`);

export const api_site_GetBannerV3 = ({ lang, BannerType }) =>
	siteRequest.post(`/GetBannerV3/${lang}`, { BannerType, CurrencyId: 51 });

export const api_CheckResetPwdToken = key =>
	siteRequest.post(`/CheckResetPwdToken`, `key=${key}`);

export const api_WhoAMI = key => siteRequest.post(`/WhoAMI`);

export const api_site_GetAffiliateAgent = ({ AffId }) =>
	siteRequest.post(`/GetAffiliateAgent`, {
		AffId
	});

export const api_site_AffiliateCheck = ({ AffCode, langId }) =>
	siteRequest.post(`/AffiliateCheck/${langId}`, { AffCode });

export const api_site_Signup = (data, langId) =>
	siteRequest.post(`/Signup/${langId}`, data);

export const GetSupportDomainList = () =>
	siteRequest.post(`/GetSupportDomainList`);

export const api_site_GetTpMaintainList = () =>
	siteRequest.post(`/GetTpMaintainList`);

export const api_site_GetSocialChannel = ({ langId, displayPage }) =>
	siteRequest.post("GetSocialChannel", {
		CurrencyId: 51,
		LangId: langId,
		DisplayPage: displayPage
	});

export const api_site_GetVipBanner = () =>
	siteRequest.post("GetVipBanner", {
		CurrencyId: 51
	});

export const api_site_GetRecaptchaInfo = () =>
	siteRequest.post("/GetRecaptchaInfo", null, {
		headers: {
			common: {
				"origin-host":
					typeof window !== "undefined"
						? window?.location?.origin
						: undefined
			}
		}
	});
