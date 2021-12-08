import { useState, useEffect, useRef } from "react";
import api from "../../service/api";

export const useCheckPrize = ({ i18n, setPopBox, isLogin, eventId, count }) => {
	const [canDrawPrize, setCanDrawPrize] = useState({
		status: null,
		msg: ""
	});
	const isMountedRef = useRef(null);

	const check = () => {
		api.events.CheckDrawPrize({ eventId }).then(
			res => {
				if (isMountedRef.current) {
					const { errorCode } = res.data;
					if (errorCode === 0) {
						setCanDrawPrize({
							status: true,
							msg: ""
						});
					} else if (errorCode === 100) {
						setCanDrawPrize({
							status: false,
							msg: i18n.lbl_MysteryBox_AlreadyDrawn
						});
					} else if (errorCode === 102) {
						setCanDrawPrize({
							status: false,
							msg: res.data.message
						});
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
						setCanDrawPrize({
							status: false,
							msg: res.data.message
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (count === "00:00:00") {
			check();
		}
	}, [i18n, setPopBox, eventId, count]);

	useEffect(() => {
		if (isLogin === true) {
			check();
		}
	}, [i18n, setPopBox, eventId, isLogin]);

	return { canDrawPrize, setCanDrawPrize };
};
