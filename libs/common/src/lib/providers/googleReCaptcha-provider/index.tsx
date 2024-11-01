import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React, { ReactNode } from "react";
import { useGetRecaptchaInfoQuery } from "@ailab-mobile/service";
import { isInApp } from "../../utils";

const reCaptchaEnum: { [key: string]: string } = {
	en: "en",
	vn: "vi"
} as const;

interface IGoogleReCaptchaProvidersProps {
	children: ReactNode;
	langId: string;
}

function GReCaptchaProviders({
	children,
	langId
}: IGoogleReCaptchaProvidersProps): JSX.Element {
	const {
		data: { data: recaptchaInfoData = {} } = {}
	} = useGetRecaptchaInfoQuery();

	// 不直接 return 是確保 api 失效不會整個元件都被 block
	// 中國地區不需驗證
	if (
		!recaptchaInfoData?.siteKey ||
		recaptchaInfoData?.country === "CN" ||
		isInApp()
	) {
		return children as JSX.Element;
	}

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={recaptchaInfoData?.siteKey}
			language={reCaptchaEnum[langId]}
			useEnterprise
			container={{
				// optional to render inside custom element
				element: "g-reCaptcha",
				parameters: {
					badge: "bottomleft" // optional, default undefined
				}
			}}>
			{children}
		</GoogleReCaptchaProvider>
	);
}

export { GReCaptchaProviders };
