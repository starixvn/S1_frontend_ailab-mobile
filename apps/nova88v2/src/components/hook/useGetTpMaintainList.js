import { useEffect, useState, useContext } from "react";
import api from "../../service/api";
import { popBoxContext } from "../common/context";

export const defTpGameType = {
	All: 0
};

export const useGetTpMaintainList = () => {
	const { setPopBox } = useContext(popBoxContext);
	const [maintainList, setMaintainList] = useState(null);
	useEffect(() => {
		let isMounted = true;
		api.tp.GetTpMaintainList().then(
			res => {
				if (res.data.errorCode === 0 && isMounted) {
					const arr = res.data?.data.map(el => ({
						tpId: el.tpId,
						tpGameType: el.tpGameType
					}));
					const set = new Set(arr?.map(item => JSON.stringify(item)));
					const _arr = [...set]?.map(item => JSON.parse(item));

					setMaintainList(_arr);
				} else if (res.data.errorCode !== 0) {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
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
			isMounted = false;
		};
	}, []);

	return { maintainList };
};
