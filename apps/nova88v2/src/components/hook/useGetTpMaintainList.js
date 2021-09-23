import { useEffect, useState } from "react";
import api from "../../service/api";

export const defTpGameType = {
	All: 0
};

export const useGetTpMaintainList = () => {
	const [maintainList, setMaintainList] = useState(null);
	useEffect(() => {
		let isMounted = true;
		api.tp.GetTpMaintainList().then(res => {
			if (res.data.errorCode === 0 && isMounted) {
				const arr = res.data?.data.map(el => ({
					tpId: el.tpId,
					tpGameType: el.tpGameType
				}));
				const set = new Set(arr?.map(item => JSON.stringify(item)));
				const _arr = [...set]?.map(item => JSON.parse(item));

				setMaintainList(_arr);
			}
		});

		return () => {
			isMounted = false;
		};
	}, []);

	return { maintainList };
};
