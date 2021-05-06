import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import api from "../../service/api";
import useGetTpBalance from "../hook/useGetTpBalance";
import { defDirection, tpWalletsListType } from "../transfer/transfer.def";

const RestoreAll = ({ i18n, setLoading, GetBalance, setPopBox, isLogin }) => {
	const isMountedRef = useRef(null);
	const { tpWalletsList } = useGetTpBalance({
		isLogin,
		listType: tpWalletsListType.allWallets
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const Transfer = ({ tpId, real_amount }) => {
		setLoading(true);

		api.tp
			.Transfer({
				TpId: tpId,
				amount: real_amount,
				direction: defDirection.tpToMain
			})
			.then(
				res => {
					if (isMountedRef.current) {
						const { errorCode, message } = res.data;
						if (errorCode === 0) {
							GetBalance();
						} else {
							setPopBox({
								isOpen: true,
								content: `[${errorCode}]${message}`
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
	};

	const restoreAll = () => {
		tpWalletsList
			.filter(wallet => wallet.balance > 0)
			.forEach(wallet => {
				Transfer({
					tpId: wallet.id,
					real_amount: wallet.balance
				});
			});
	};

	return (
		<button className="icon icon-history clickBtn" onClick={restoreAll}>
			{i18n.lbl_RestoreAll}
		</button>
	);
};

RestoreAll.defaultProps = {
	isLogin: null
};

RestoreAll.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setLoading: PropTypes.func.isRequired,
	GetBalance: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired,
	isLogin: PropTypes.bool
};

export default RestoreAll;
