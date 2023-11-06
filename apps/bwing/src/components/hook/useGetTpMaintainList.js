import { useState, useEffect, useContext } from "react";
import { api_site_GetTpMaintainList } from "../../service/api/site";
import { popBoxContext, i18nContext } from "../common/context";

export const defTpGameType = {
	All: 0
};

export const useGetTpMaintainList = () => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [maintainList, setMaintainList] = useState(null);

	useEffect(() => {
		let isMountedRef = true;

		api_site_GetTpMaintainList().then(
			res => {
				const { errorCode, data, message } = res.data;
				if (isMountedRef) {
					if (errorCode === 0) {
						const arr = data?.map(item => ({
							tpId: item.tpId,
							tpGameType: item.tpGameType
						}));

						const set = new Set(
							arr?.map(item => JSON.stringify(item))
						);
						const _arr = [...set]?.map(item => JSON.parse(item));

						setMaintainList(_arr || []);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				}
			},
			() => {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			}
		);

		return () => {
			isMountedRef = false;
		};
	}, []);

	return { maintainList };
};
