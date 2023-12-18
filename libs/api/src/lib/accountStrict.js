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
		PhoneNo,
		Occupation,
		SourceOfIncome
	}) =>
		this.accountStrictRequest.post("/SetProfile", {
			AccountName,
			Birth_d,
			Birth_m,
			Birth_y,
			CountryCode,
			AreaCode,
			PhoneNo,
			Occupation,
			SourceOfIncome
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

	SetCustEWalletInfo = ({ AccountNo, SysId }) =>
		this.accountStrictRequest.post("/SetCustEWalletInfo", {
			AccountNo,
			SysId
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

	DelCustEWalletInfo = ({ AccountNo, SysId }) =>
		this.accountStrictRequest.post("/DelCustEWalletInfo", {
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

	SetCustCryptoWallet = ({ currencyId, network, nickName, address }) =>
		this.accountStrictRequest.post("/SetCustCryptoWallet", {
			currencyId,
			network,
			nickName,
			address
		});

	GetOTPVerifyInfo = () =>
		this.accountStrictRequest.post("/GetOTPVerifyInfo");

	DelCustCryptoWallet = ({ currencyId, network, address, nickName }) =>
		this.accountStrictRequest.post("/DelCustCryptoWallet", {
			currencyId,
			network,
			address,
			nickName
		});

	SendOTPEmail = () =>
		this.accountStrictRequest.post("/SendOTPEmail", { route: "profile" });

	VerifyEmail = ({ langId, key, code }) =>
		this.accountStrictRequest.post(`/VerifyEmail/${langId}`, { key, code });
}
