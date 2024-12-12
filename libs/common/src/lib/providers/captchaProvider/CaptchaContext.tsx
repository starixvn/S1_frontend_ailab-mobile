import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState
} from "react";
import {
	GoogleReCaptchaProvider,
	useGoogleReCaptcha
} from "react-google-recaptcha-v3";
import Turnstile from "react-turnstile";
import {
	useGetRecaptchaInfoQuery,
	useLazyGetNumberCaptchaQuery
} from "@ailab-mobile/service";
import { FallbackCaptcha } from "./FallbackCaptcha";
import {
	CaptchaActionTypeEnum,
	CaptchaTypeEnum,
	IRecaptchaInfoData
} from "../../service/siteApi/type";
import { isInApp } from "../../utils";

const reCaptchaEnum: { [key: string]: string } = {
	en: "en",
	vn: "vi"
} as const;

interface ICaptchaContext {
	getToken: () => string | Promise<string> | undefined;
	Captcha: React.FC;
	captchaType?: CaptchaTypeEnum;
	refreshCaptcha: () => void;
}

export const CaptchaContext = createContext<ICaptchaContext>({
	getToken: () => "",
	Captcha: () => null,
	refreshCaptcha: () => null
});

interface ICaptchaProviderProps {
	children: ReactNode;
	recaptchaInfoData?: IRecaptchaInfoData;
	action?: CaptchaActionTypeEnum;
}

const isGoogleRecaptcha = (data?: IRecaptchaInfoData) =>
	data?.type === CaptchaTypeEnum.Google &&
	data.siteKey &&
	data.country !== "CN" &&
	!isInApp();

const CaptchaProvider = ({
	children,
	recaptchaInfoData,
	action = CaptchaActionTypeEnum.Signup
}: ICaptchaProviderProps) => {
	const token = useRef("");
	const [captchaType, setCaptchaType] = useState<
		undefined | CaptchaTypeEnum
	>();
	const { siteKey, type } = recaptchaInfoData || {};

	const { executeRecaptcha } = useGoogleReCaptcha();

	const [refreshNumberCaptcha] = useLazyGetNumberCaptchaQuery();

	const getToken = () => {
		switch (captchaType) {
			case CaptchaTypeEnum.Google:
				if (isGoogleRecaptcha(recaptchaInfoData)) {
					return "";
				}
				return executeRecaptcha?.(action);
			case CaptchaTypeEnum.Cloudflare:
				return token.current;
			default:
				return "";
		}
	};

	const components: Record<CaptchaTypeEnum, React.FC> = {
		[CaptchaTypeEnum.Number]: FallbackCaptcha,
		[CaptchaTypeEnum.Google]: () => null,
		[CaptchaTypeEnum.Cloudflare]: () => (
			<Turnstile
				sitekey={siteKey || ""}
				onVerify={turnstileToken => {
					token.current = turnstileToken;
				}}
				onError={() => setCaptchaType(CaptchaTypeEnum.Number)}
			/>
		)
	};

	useEffect(() => {
		if (type !== undefined) {
			setCaptchaType(type);
		}
	}, [type]);

	const refreshCaptcha = () => {
		if (captchaType === CaptchaTypeEnum.Number) {
			refreshNumberCaptcha({ action });
		}
	};

	const value: ICaptchaContext = {
		getToken,
		Captcha:
			captchaType !== undefined ? components[captchaType] : () => null,
		captchaType,
		refreshCaptcha
	};
	return (
		<CaptchaContext.Provider value={value}>
			{children}
		</CaptchaContext.Provider>
	);
};

export const MultiCaptchaProvider = ({
	children,
	langId
}: {
	children: ReactNode;
	langId: string;
}) => {
	const { data: recaptchaInfoData } = useGetRecaptchaInfoQuery()?.data ?? {};
	const { siteKey } = recaptchaInfoData || {};

	return (
		<GoogleReCaptchaProvider
			language={reCaptchaEnum[langId]}
			container={{
				element: "g-reCaptcha",
				parameters: { badge: "bottomleft" }
			}}
			reCaptchaKey={siteKey ?? ""}>
			<CaptchaProvider recaptchaInfoData={recaptchaInfoData}>
				{children}
			</CaptchaProvider>
			<div
				id="g-reCaptcha"
				style={
					isGoogleRecaptcha(recaptchaInfoData)
						? {}
						: { display: "none" }
				}
			/>
		</GoogleReCaptchaProvider>
	);
};

export const useCaptchaContext = () => useContext(CaptchaContext);
