import { useState, useEffect, useRef, useContext } from "react";
import { popBoxContext, i18nContext } from "Context";
import api from "../../service/api";

export const defDisplayPage = {
	Home: 1,
	ContactUs: 2
};

export const defChannelName = {
	LivaChat: "LivaChat",
	WhatsApp: "WhatsApp",
	Telegram: "Telegram",
	Email: "E-mail",
	Facebook: "Facebook",
	Twitter: "Twitter",
	Instagram: "Instagram",
	LINE: "LINE"
};

const useGetSocialChannel = ({ langId, currencyId, displayPage }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [socialChannel, setSocialChannel] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const getChannel = async () => {
		await api.site
			.GetSocialChannel({
				langId,
				currencyId,
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
