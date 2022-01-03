import { useRef, useEffect, useState, useContext } from "react";
import { loadingContext } from "../common/context";
import { api_events_DrawPrize } from "../../service/api/events";

export const useDrawPrize = ({
	i18n,
	setDrawPopOpen,
	setCanDrawPrize,
	setPopBox,
	eventId,
	alreadyDrwanKey
}) => {
	const { setLoading } = useContext(loadingContext);
	const [prize, setPrize] = useState("");

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		setLoading(true);
		api_events_DrawPrize({ eventId }).then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;
					if (errorCode === 0) {
						setPrize(data.prizeName);
						setCanDrawPrize(false);
					} else if (errorCode === 100) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n[alreadyDrwanKey]
						});
						setCanDrawPrize(false);
						setDrawPopOpen(false);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
						setDrawPopOpen(false);
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
	}, [
		i18n,
		setPopBox,
		setDrawPopOpen,
		setCanDrawPrize,
		setLoading,
		eventId,
		alreadyDrwanKey
	]);

	return { prize };
};
