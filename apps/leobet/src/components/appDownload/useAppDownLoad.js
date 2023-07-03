import { useState, useEffect, useRef, useContext } from "react";
import { popBoxContext, i18nContext } from "../common/context";
import api from "../../service/api";

export const useAppDownLoad = () => {
	const isMountedRef = useRef(null);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [appLinkDatas, setAppLinkData] = useState([]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const fetchData = async () => {
			await api.player
				.GetAppLink()
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
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				})
				.catch(() => {
					if (!isMountedRef.current) return;
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				});
		};

		fetchData();
	}, []);
	return { appLinkDatas };
};
