import { useRef, useEffect, useState, useContext } from "react";
import { loadingContext } from "../common/context";
import api from "../../service/api";

export const useDrawPrize = ({
	i18n,
	setDrawPopOpen,
	setCanDrawPrize,
	setPopBox,
	eventId
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
		api.events.DrawPrize({ eventId }).then(
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
							content: i18n.lbl_MysteryBox_AlreadyDrawn
						});
						setCanDrawPrize(false);
						setDrawPopOpen(false);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}]${message}`
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
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
					setLoading(false);
				}
			}
		);
	}, [i18n, setPopBox, setDrawPopOpen, setCanDrawPrize, setLoading, eventId]);

	return { prize };
};
