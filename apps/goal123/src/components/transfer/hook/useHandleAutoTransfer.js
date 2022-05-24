import { useState, useEffect, useRef } from "react";
import {
	api_account_GetWalletTransferStatus,
	api_account_SetWalletTransferStatus
} from "../../../service/api/account";

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
		api_account_GetWalletTransferStatus().then(
			res => {
				if (isMountedRef.current) {
					const { errorCode, data, message } = res.data;
					if (errorCode === 0) {
						const _autoTransfer =
							data === AutoTransferStatus.opened;
						setAutoTransfer(_autoTransfer);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
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
		api_account_SetWalletTransferStatus({ AutoTransfer }).then(
			res => {
				if (isMountedRef.current) {
					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						setAutoTransfer(!autoTransfer);
						setPopBox({ isOpen: false });
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
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
