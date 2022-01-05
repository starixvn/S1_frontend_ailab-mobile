import { useRef, useState, useEffect } from "react";
import api from "../../service/api";

export const useGetPrizeList = ({
	i18n,
	userInfo,
	setPopBox,
	setLoading,
	eventId,
	canDrawPrize
}) => {
	const [history, setHistory] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin === true) {
			setLoading(true);
			api.events.GetCustDrawPrizeList({ eventId }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setHistory(res.data.data);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
						setLoading(false);
					}
				}
			);
		}
	}, [i18n, setPopBox, userInfo, setLoading, eventId, canDrawPrize]);

	return { history };
};
