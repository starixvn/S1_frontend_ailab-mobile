import { useState, useEffect, useRef, useContext } from "react";
import { popBoxContext, i18nContext } from "../common/context";
import { api_site_GetSocialChannel } from "../../service/api/site";

export const defDisplayPage = {
	Home: 1,
	ContactUs: 2,
	App: 3,
	Footer: 4
};

export const defChannelName = {
	LiveChat: "Livechat",
	Telegram: "Telegram",
	Facebook: "Facebook",
	Skype: "Skype",
	Zalo: "Zalo"
};

export const channelIconName = {
	Livechat: "chat_1.png",
	Telegram: "te_1.png",
	Facebook: "fb_1.png",
	Skype: "sk_1.png",
	Zalo: "zalo_1.png",
	Twitter: "tw_1.png",
	Instagram: "ig_1.png",
	LINE: "line_1.png",
	Youtube: "yt_1.png",
	WhatsApp: "wa_1.png",
	"E-mail": "em_1.png"
};

const useGetSocialChannel = ({ langId, displayPage }) => {
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
		await api_site_GetSocialChannel({
			langId,
			displayPage
		}).then(
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
