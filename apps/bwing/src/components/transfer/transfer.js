import React, { useContext, useEffect, useState, useRef } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	walletInfoContext
} from "../common/context";
import { api_GetWalletInfo } from "../../service/api/account";
import { api_Transfer, api_GetTransferRecent } from "../../service/api/tp";
import { isConvert, checkAmount } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import { defIptStatus } from "../common/inputbox.hint";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popbox";
import WalletPanel from "./walletPanel";
import AmountPanel from "./amountPanel";

const defDirection = {
	MainToTp: 1,
	TpToMain: 2
};

const initDirection = {
	transferFrom: "lbl_MainWallet",
	transferTo: "lbl_TpWallet_1"
};

const initWarning = { status: defIptStatus.default, msg: "" };

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setWalletInfo } = useContext(walletInfoContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [getWalletInfo, setGetWalletInfo] = useState([]);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState(initWarning);
	const [direction, setDirection] = useState(initDirection);
	const [recentDatas, setRecentDatas] = useState([]);
	const [loading, setLoading] = useState(true);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		api_GetWalletInfo().then(
			res => {
				if (res.data.errorCode === 0) {
					let data = res.data.data;
					if (data !== null) {
						let mainWallet = {
							id: 0,
							displayKey: "lbl_MainWallet",
							balance: data.balance
						};
						let tpWalletsArr = data.tpWallets.map(i => {
							return {
								id: i.tpId,
								displayKey: `lbl_TpWallet_${i.tpId}`,
								balance: i.balance
							};
						});

						if (isMountedRef.current) {
							setGetWalletInfo([mainWallet, ...tpWalletsArr]);
						}
					}
				}

				if (isMountedRef.current) {
					setLoading(false);
				}
			},
			err => {
				if (isMountedRef.current) {
					setLoading(false);
				}
			}
		);

		api_GetTransferRecent().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setRecentDatas(res.data.data);
			}
		});
	}, [setWalletInfo]);

	const GetWalletInfo = () => {
		api_GetWalletInfo().then(
			res => {
				if (res.data.errorCode === 0) {
					let data = res.data.data;
					if (data !== null) {
						let mainWallet = {
							id: 0,
							displayKey: "lbl_MainWallet",
							balance: data.balance
						};
						let tpWalletsArr = data.tpWallets.map(i => {
							return {
								id: i.tpId,
								displayKey: `lbl_TpWallet_${i.tpId}`,
								balance: i.balance
							};
						});

						if (isMountedRef.current) {
							setGetWalletInfo([mainWallet, ...tpWalletsArr]);
							setWalletInfo(prevState => ({
								...prevState,
								main: data.balance
							}));
						}
					}
				}

				if (isMountedRef.current) {
					setLoading(false);
				}
			},
			err => {
				if (isMountedRef.current) {
					setLoading(false);
				}
			}
		);
	};

	const GetTransferRecent = () => {
		api_GetTransferRecent().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setRecentDatas(res.data.data);
			}
		});
	};

	const VaildAmount = _amount => {
		const minAmount = 1;
		const _transferFrom = getWalletInfo.find(item => {
			return item.displayKey === direction.transferFrom;
		});
		const maxAmount = _transferFrom.balance;

		if (maxAmount === null || maxAmount === undefined) {
			return false;
		} else {
			let result = checkAmount(
				_amount,
				minAmount,
				maxAmount,
				_isConvert,
				i18n
			);
			if (result.status !== 0) {
				setWarning({
					status: defIptStatus.warning,
					msg: result.msg
				});
			} else {
				setWarning({
					status: defIptStatus.verified,
					msg: ""
				});
			}
			return result.status === 0;
		}
	};

	const EditAmount = e => {
		let value = e.target.value;
		VaildAmount(value);
		setAmount(value);
	};

	const restoreAll = idx => {
		let _direction =
			getWalletInfo[idx].id === 0
				? defDirection.TpToMain
				: defDirection.MainToTp;

		let startId = idx === 0 ? 1 : 0;
		let startWallet = getWalletInfo[startId];

		if (startWallet.balance === 0) {
			setPopBox({
				isOpen: true,
				title: i18n["lbl_ImportantNote"],
				content: i18n["msg_InsufficientFund"]
			});
		} else {
			Transfer(startWallet.id, startWallet.balance, _direction);
		}
	};

	const changeDirection = () => {
		direction.transferFrom === "lbl_MainWallet"
			? setDirection({
					transferFrom: "lbl_TpWallet_1",
					transferTo: "lbl_MainWallet"
			  })
			: setDirection({
					transferFrom: "lbl_MainWallet",
					transferTo: "lbl_TpWallet_1"
			  });
	};

	const Transfer = (_tpId, _amount, _direction) => {
		setLoading(true);

		api_Transfer({
			TpId: _tpId === 0 ? 1 : _tpId,
			amount: _amount,
			direction: _direction
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 9) {
						setLoading(false);
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.TurnoverAccumulated,
							currencyId: userInfo.currencyId,
							turnover: res.data.data.turnover,
							rollover: res.data.data.rollover
						});
					} else if (res.data.errorCode !== 0) {
						setLoading(false);
						setPopBox({
							isOpen: true,
							title: i18n["lbl_ImportantNote"],
							content: res.data.message
						});
					} else {
						GetWalletInfo();
						setAmount("");
						GetTransferRecent();
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setLoading(false);
					setPopBox({
						isOpen: true,
						title: i18n["lbl_ImportantNote"],
						content: i18n["msg_ApiServerError"]
					});
				}
			}
		);
	};

	const clickSubmit = () => {
		let result = VaildAmount(amount);
		let _direction =
			direction.transferFrom === "lbl_MainWallet"
				? defDirection.MainToTp
				: defDirection.TpToMain;

		if (result) {
			let real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);

			let _wallet = getWalletInfo.find(item => {
				return item.displayKey === direction.transferFrom;
			});

			if (_wallet.balance < real_amount) {
				setPopBox({
					isOpen: true,
					title: i18n["lbl_ImportantNote"],
					content: i18n["msg_InsufficientFund"]
				});
			} else {
				Transfer(_wallet.id, real_amount, _direction);
			}
			setWarning(initWarning);
			setAmount("");
			setDirection(initDirection);
		}
	};

	return loading ? (
		<Loading />
	) : (
		<div className="depositBox">
			<WalletPanel
				i18n={i18n}
				walletInfo={getWalletInfo}
				restoreAll={restoreAll}
				GetWalletInfo={GetWalletInfo}
			/>
			<AmountPanel
				i18n={i18n}
				amount={amount}
				changeDirection={changeDirection}
				transferFrom={direction.transferFrom}
				transferTo={direction.transferTo}
				EditAmount={EditAmount}
				warning={warning}
				clickSubmit={clickSubmit}
			/>
			<RecentDatas
				datas={recentDatas}
				GetRecentDatas={GetTransferRecent}
			/>
		</div>
	);
};

export default Panel;
