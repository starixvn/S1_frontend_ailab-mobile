import { useState, useEffect, useRef, useContext } from "react";
import { popBoxContext, i18nContext } from "../common/context";
import { api_site_GetSocialChannel } from "../../service/api/site";

export const defDisplayPage = {
	Home: 1,
	ContactUs: 2,
	App: 3,
	Footer: 4
};

export const channelIcon = {
	Youtube: "icon icon-youtube",
	Telegram: "icon icon-Telegram",
	Facebook: "icon icon-contactUS1",
	Twitter: "icon icon-contactUS2",
	Skype: "icon icon-contactUS6",
	Zalo: "icon icon-zalo",
	Tiktok: "icon icon-tiktok",
	Livechat: "icon icon-chat"
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
