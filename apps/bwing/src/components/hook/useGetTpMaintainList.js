import { useState, useEffect } from "react";
import { api_site_GetTpMaintainList } from "../../service/api/site";

export const useGetTpMaintainList = () => {
	const [maintainList, setMaintainList] = useState(null);

	useEffect(() => {
		let isMountedRef = true;

		api_site_GetTpMaintainList().then(res => {
			const { errorCode, data } = res.data;
			if (errorCode === 0 && isMountedRef) {
				const arr = data?.map(item => item.tpId);
				setMaintainList(arr);
			}
		});

		return () => {
			isMountedRef = false;
		};
	}, []);

	return { maintainList };
};
