import { useState, useEffect, useRef } from "react";
import api from "../../service/api";

const AutoTransferStatus = {
	noData: 0,
	opened: 1,
	closed: 2
};

const setStatus = {
	open: 1,
	close: 2
};

export default ({ i18n, setPopBox }) => {
	const [autoTransfer, setAutoTransfer] = useState(true);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		api.account.GetWalletTransferStatus().then(
			res => {
				if (isMountedRef.current) {
					const { errorCode, data, message } = res.data;
					if (errorCode === 0) {
						const _autoTransfer =
							data !== AutoTransferStatus.closed;
						setAutoTransfer(_autoTransfer);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}]${message}`
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
	}, [i18n, setPopBox]);

	const setWalletTransferStatus = () => {
		const AutoTransfer = autoTransfer ? setStatus.close : setStatus.open;
		api.account.SetWalletTransferStatus({ AutoTransfer }).then(
			res => {
				if (isMountedRef.current) {
					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						setAutoTransfer(!autoTransfer);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}]${message}`
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
	};

	return { autoTransfer, setWalletTransferStatus };
};
