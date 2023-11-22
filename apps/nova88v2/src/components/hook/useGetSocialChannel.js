import { useState, useEffect, useRef, useContext } from "react";
import { popBoxContext, i18nContext } from "Context";
import api from "../../service/api";
import { defCurrenyId } from "../common/common";

export const defDisplayPage = {
	Home: 1,
	ContactUs: 2,
	App: 3,
	Footer: 4
};

export const defLinkType = {
	url: 1,
	qrCode: 2
};

export const channelIcon = {
	Youtube: "youtube",
	Telegram: "tga",
	Facebook: "fb",
	Twitter: "twitter",
	Instagram: "ig",
	LINE: "line",
	Livechat: "livechat",
	WhatsApp: "whatsapp",
	"E-mail": "email"
};

const useGetSocialChannel = ({ langId, currencyId, displayPage }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [socialChannel, setSocialChannel] = useState([]);
	const isMountedRef = useRef(null);

	// 避免送 null
	const defaultLang = langId ?? "en";
	const defaultCurrencyId = currencyId ?? defCurrenyId.MYR;
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const getChannel = async () => {
		await api.site
			.GetSocialChannel({
				langId: defaultLang,
				currencyId: defaultCurrencyId,
				displayPage
			})
			.then(
				res => {
					if (!isMountedRef.current) return;
					const { errorCode, data, message } = res.data;
					if (errorCode === 0) {
						setSocialChannel(data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				},
				() => {
					if (!isMountedRef.current) return;

					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
	};

	useEffect(() => {
		getChannel();
	}, []);

	return { socialChannel };
};

export default useGetSocialChannel;
