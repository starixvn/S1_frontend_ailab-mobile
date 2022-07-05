import BaseAPI from "./base";

export class AccountStrictAPI extends BaseAPI {
	GetCustProfile = () => this.accountStrictRequest.post("/GetCustProfile");

	SetProfile = ({
		AccountName,
		Birth_d,
		Birth_m,
		Birth_y,
		CountryCode,
		AreaCode,
		PhoneNo
	}) =>
		this.accountStrictRequest.post("/SetProfile", {
			AccountName,
			Birth_d,
			Birth_m,
			Birth_y,
			CountryCode,
			AreaCode,
			PhoneNo
		});

	SetProfileAddress = ({
		AddressCountry,
		AddressState,
		AddressPostCode,
		AddressCity,
		AddressLineFirst,
		AddressLineSecond
	}) =>
		this.accountStrictRequest.post("/SetProfileAddress", {
			AddressCountry,
			AddressState,
			AddressPostCode,
			AddressCity,
			AddressLineFirst,
			AddressLineSecond
		});

	SetCustBankInfo = ({ AccountName, AccountNo, SysId, IFSCCode }) =>
		this.accountStrictRequest.post("/SetCustBankInfo", {
			AccountName,
			AccountNo,
			SysId,
			IFSCCode
		});

	DelCustBankInfo = ({ AccountName, AccountNo, SysId }) =>
		this.accountStrictRequest.post("/DelCustBankInfo", {
			AccountName,
			AccountNo,
			SysId
		});

	ResetPassword = ({ NewPassword }) =>
		this.accountStrictRequest.post("/ResetPassword", {
			NewPassword
		});

	UploadCustPhotoId = formData =>
		this.accountStrictRequest.post("/UploadCustPhotoId", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});

	SendOTPSMS = () => this.accountStrictRequest.post("/SendOTPSMS");

	VerifyOTP = ({ inputOTPcode }) =>
		this.accountStrictRequest.post("/VerifyOTP", {
			inputOTPcode
		});

	SetCustUSDTInfo = form =>
		this.accountStrictRequest.post("/SetCustUSDTInfo", form);

	SetCustUSDTInfoBatch = form =>
		this.accountStrictRequest.post("/SetCustUSDTInfoBatch", form);

	GetOTPVerifyInfo = () =>
		this.accountStrictRequest.post("/GetOTPVerifyInfo");

	DelCustUSDTInfo = ({ USDTAddress, NickName, AccountName, CurrencyId }) =>
		this.accountStrictRequest.post("/DelCustUSDTInfo", {
			USDTAddress,
			NickName,
			AccountName,
			CurrencyId
		});

	SendOTPEmail = () =>
		this.accountStrictRequest.post("/SendOTPEmail", { route: "profile" });

	VerifyEmail = ({ langId, key, code }) =>
		this.accountStrictRequest.post(`/VerifyEmail/${langId}`, { key, code });
}
