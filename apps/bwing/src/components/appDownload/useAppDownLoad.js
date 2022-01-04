import { useState, useEffect, useRef, useContext } from "react";
import { popBoxContext, i18nContext } from "../common/context";
import { api_player_GetAppLink } from "../../service/api/player";

export const useAppDownLoad = () => {
	const isMountedRef = useRef(null);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);

	const [appLinkDatas, setAppLinkData] = useState([]);

	const errorPopBox = message => {
		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: message
		});
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const fetchData = async () => {
			await api_player_GetAppLink()
				.then(res => {
					if (!isMountedRef.current) return;

					const { data, message, errorCode } = res.data;

					const success = errorCode === 0;

					if (success) {
						const newData = data.reduce((acc, cur) => {
							return { ...acc, [cur.appTypeName]: cur };
						}, {});

						setAppLinkData(newData);
					} else {
						errorPopBox(`[${errorCode}] ${message}`);
					}
				})
				.catch(() => {
					if (!isMountedRef.current) return;

					errorPopBox(i18n.msg_ApiServerError);
				});
		};

		fetchData();
	}, []);
	return { appLinkDatas };
};
