import { useEffect, useState } from "react";
import api from "../../service/api";

export const useGetTpMaintainList = () => {
	const [maintainList, setMaintainList] = useState(null);
	useEffect(() => {
		let isMounted = true;
		api.tp.GetTpMaintainList().then(res => {
			if (res.data.errorCode === 0 && isMounted) {
				const arr = res.data?.data.map(el => el.tpId);
				setMaintainList(arr);
			}
		});

		return () => {
			isMounted = false;
		};
	}, []);

	return { maintainList };
};
