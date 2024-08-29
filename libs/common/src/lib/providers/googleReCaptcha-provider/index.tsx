import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Fragment, ReactNode } from "react";
import { useGetRecaptchaInfoQuery } from "@ailab-mobile/service";

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
		data: { data: recaptchaInfo = {} } = {}
	} = useGetRecaptchaInfoQuery();

	// 不直接 return 是確保 api 失效不會整個元件都被 block
	// 中國地區不需驗證
	if (!recaptchaInfo?.siteKey && recaptchaInfo?.country !== "CN")
		return <Fragment>{children}</Fragment>;

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={recaptchaInfo?.siteKey}
			language={reCaptchaEnum[langId]}
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
