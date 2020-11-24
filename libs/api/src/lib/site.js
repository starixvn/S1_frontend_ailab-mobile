import BaseAPI from "./base";

export class siteAPI extends BaseAPI {
	ExistsUserName = ({ UserName }) =>
		this.siteRequest.post(`/ExistsUserName`, { UserName: UserName });

	ExistsEmail = ({ Email }) =>
		this.siteRequest.post(`/ExistsEmail`, { Email: Email });

	// Register = data => this.siteRequest.post(`/Register/`, data);
	Signup = (data, langId) => this.siteRequest.post(`/Signup/${langId}`, data);

	GetSiteCurrencyList = () => this.siteRequest.post(`/GetSiteCurrencyList/`);

	GetSiteLangList = () => this.siteRequest.post(`/GetSiteLangList/`);

	CheckSignIn = () => this.siteRequest.post(`/CheckSignIn/`);

	GetGamelist = () => this.siteRequest.post(`/GetGamelist`);

	ForgetPwd = ({ langId, Email }) =>
		this.siteRequest.post(`/ForgetPwdV2/${langId}`, {
			Email: Email,
			flag: 2
		});

	GetTpIds = () => this.siteRequest.post(`/GetTpIds`);

	GetBanner = (FolderName, refId, lang, filterHideInHome = false) =>
		this.siteRequest.post(
			`/GetBanner/${lang}`,
			`FolderName=${FolderName}&refId=${refId}&filterHideInHome=${filterHideInHome}`
		);

	CheckResetPwdToken = key =>
		this.siteRequest.post(`/CheckResetPwdToken`, `key=${key}`);

	WhoAMI = key => this.siteRequest.post(`/WhoAMI`);

	ExistsPhoneNo = ({ AreaCode, Phone }) =>
		this.siteRequest.post(`/ExistsPhoneNo`, { AreaCode, PhoneNo: Phone });
}
