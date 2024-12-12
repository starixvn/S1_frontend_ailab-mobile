export enum CaptchaTypeEnum {
	Number,
	Google,
	Cloudflare
}

export enum CaptchaActionTypeEnum {
	Signup = "signup",
	Login = "login",
	PasswordReset = "password_reset"
}

export interface ISignUpArgs {
	affCode?: string;
	affId?: string;
	areaCode?: string;
	currencyId: number;
	email?: string;
	Birth_d?: string | number;
	Birth_m?: string | number;
	Birth_y?: string | number;
	nationality?: string;
	phoneNo?: string;
	realName?: string;
	reCaptchaToken?: string | undefined;
	referralUrl?: string;
	userLang: string;
	userName: string;
	userpwd: string;
	blackbox?: string;
	langId: string;
	lineUserId?: string;
	captchaType?: CaptchaTypeEnum;
}

export interface IGetVipBannerArgs {
	currencyId: number;
}

export interface IRecaptchaInfoData {
	type: CaptchaTypeEnum;
	siteKey: string;
	country: string;
}

export interface IGetNumberCaptchaData {
	picture: string;
	seconds: number;
}

export interface IGetNumberCaptchaArgs {
	action: CaptchaActionTypeEnum;
}
