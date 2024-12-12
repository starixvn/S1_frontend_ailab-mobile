import { useLazyGetNumberCaptchaQuery } from "@ailab-mobile/service";
import React, { useEffect } from "react";
import { CaptchaActionTypeEnum } from "../../service/siteApi/type";

export const FallbackCaptcha = () => {
	const [trigger, response] = useLazyGetNumberCaptchaQuery();
	const { data: numberCaptcha } = response?.data || {};

	const refreshCaptcha = () =>
		trigger({ action: CaptchaActionTypeEnum.Signup });

	useEffect(() => {
		refreshCaptcha();
	}, []);

	useEffect(() => {
		const { seconds } = numberCaptcha || {};
		if (!seconds) return;

		const timer = setTimeout(refreshCaptcha, seconds * 1000);

		// eslint-disable-next-line
		return () => clearTimeout(timer);
	}, [numberCaptcha]);

	if (!numberCaptcha) return null;

	return (
		<button
			style={{ background: "none", width: "auto" }}
			onClick={refreshCaptcha}
			type="button">
			<img
				src={`data:image/png;base64,${numberCaptcha.picture}`}
				alt="captcha"
			/>
		</button>
	);
};
