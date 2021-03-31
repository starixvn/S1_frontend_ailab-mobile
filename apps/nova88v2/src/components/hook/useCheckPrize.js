import { useState, useEffect, useRef } from "react";
import api from "../../service/api";

export const useCheckPrize = ({ i18n, setPopBox, isLogin, eventId }) => {
	const [canDrawPrize, setCanDrawPrize] = useState(true);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isLogin === true) {
			api.events.CheckDrawPrize({ eventId }).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode } = res.data;
						if (errorCode === 0) {
							setCanDrawPrize(true);
						} else if (errorCode === 100) {
							setCanDrawPrize(false);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}]${res.data.message}`
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
		}
	}, [isLogin, i18n, setPopBox, eventId]);

	return { canDrawPrize, setCanDrawPrize };
};
