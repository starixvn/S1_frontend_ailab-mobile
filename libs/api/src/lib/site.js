import BaseAPI, { defDeviceType } from "./base";

export class SiteAPI extends BaseAPI {
	defBannerType = {
		Promotions: 1,
		HotEvent: 2,
		Slots: 3
	};

	defBannerActionMode = {
		NoAction: 1,
		GoToGame: 2,
		GoToBonus: 3,
		OpenWindow: 4,
		RedirectPage: 5,
		RedirectPageOfThisSite: 6
	};

	ExistsUserName = ({ UserName, LangId }) =>
		this.siteRequest.post(`/ExistsUserName/${LangId}`, { UserName });

	ExistsEmail = ({ Email }) =>
		this.siteRequest.post(`/ExistsEmail`, { Email });

	Signup = (data, langId) => this.siteRequest.post(`/Signup/${langId}`, data);

	GetSiteCurrencyList = () => this.siteRequest.post(`/GetSiteCurrencyList/`);

	GetSiteLangList = () => this.siteRequest.post(`/GetSiteLangList/`);

	CheckSignIn = () => this.siteRequest.post(`/CheckSignIn/`);

	GetGameListByDevice = () =>
		this.siteRequest.post(`/GetGameListByDevice`, {
			DeviceType: defDeviceType.Mobile
		});

	ForgetPwd = ({ langId, Email, flag = 2 }) =>
		this.siteRequest.post(`/ForgetPwdV2/${langId}`, {
			Email,
			flag
		});

	GetTpIds = () => this.siteRequest.post(`/GetTpIds`);

	GetBanner = (FolderName, refId, lang, filterHideInHome = false) =>
		this.siteRequest.post(
			`/GetBanner/${lang}`,
			`FolderName=${FolderName}&refId=${refId}&filterHideInHome=${filterHideInHome}`
		);

	GetBannerV3 = ({ lang, BannerType }) =>
		this.siteRequest.post(`/GetBannerV3/${lang}`, { BannerType });

	CheckResetPwdToken = key =>
		this.siteRequest.post(`/CheckResetPwdToken`, `key=${key}`);

	WhoAMI = () => this.siteRequest.post(`/WhoAMI`);

	ExistsPhoneNo = ({ AreaCode, Phone }) =>
		this.siteRequest.post(`/ExistsPhoneNo`, { AreaCode, PhoneNo: Phone });

	GetAffiliateAgent = ({ AffId }) =>
		this.siteRequest.post(`/GetAffiliateAgent`, {
			AffId
		});

	GetSupportDomainList = ({ langId }) =>
		this.siteRequest.post(`/GetSupportDomainList/${langId ?? ""}`);
}
