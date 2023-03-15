import { accountStrictRequest } from "./base";
import path from "../../path";

export const api_GetCustProfile = () =>
	accountStrictRequest.post("/GetCustProfile");

export const api_SetProfile = ({
	AccountName,
	Birth_d,
	Birth_m,
	Birth_y,
	CountryCode,
	AreaCode,
	PhoneNo,
	Email
}) =>
	accountStrictRequest.post("/SetProfileV2", {
		AccountName,
		Birth_d,
		Birth_m,
		Birth_y,
		CountryCode,
		AreaCode,
		PhoneNo,
		Email
	});

export const api_SetCustBankInfo = ({ AccountName, AccountNo, SysId }) =>
	accountStrictRequest.post("/SetCustBankInfo", {
		AccountName,
		AccountNo,
		SysId
	});

export const api_DelCustBankInfo = ({ AccountName, AccountNo, SysId }) =>
	accountStrictRequest.post("/DelCustBankInfo", {
		AccountName,
		AccountNo,
		SysId
	});

export const api_ResetPassword = ({ NewPassword }) =>
	accountStrictRequest.post("/ResetPassword", {
		NewPassword
	});

export const api_UploadCustPhotoId = formData =>
	accountStrictRequest.post("/UploadCustPhotoId", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});

export const api_SendOTPSMS = () => accountStrictRequest.post("/SendOTPSMS");

export const api_VerifyOTP = ({ inputOTPcode }) =>
	accountStrictRequest.post("/VerifyOTP", {
		inputOTPcode
	});

export const api_SetAccountName = ({ name }) =>
	accountStrictRequest.post("/SetAccountName", { name });

export const api_SendOTPEmail = () =>
	accountStrictRequest.post("/SendOTPEmail", { route: path.member.root });

export const api_VerifyEmail = ({ langId, key, code }) =>
	accountStrictRequest.post(`/VerifyEmail/${langId}`, { key, code });

export const api_SetCustUSDTInfo = form =>
	accountStrictRequest.post("/SetCustUSDTInfo", form);

export const api_SetCustCryptoWallet = ({
	currencyId,
	network,
	nickName,
	address
}) =>
	accountStrictRequest.post("/SetCustCryptoWallet", {
		currencyId,
		network,
		nickName,
		address
	});

export const api_GetOTPVerifyInfo = () =>
	accountStrictRequest.post("/GetOTPVerifyInfo");

export const api_DelCustCryptoWallet = ({
	currencyId,
	network,
	address,
	nickName
}) =>
	accountStrictRequest.post("/DelCustCryptoWallet", {
		currencyId,
		network,
		address,
		nickName
	});
