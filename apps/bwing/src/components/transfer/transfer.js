import React, { useContext, useEffect, useState, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import {
	api_GetBalnace,
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance
} from "../../service/api/account";
import { api_Transfer, api_GetTransferRecent } from "../../service/api/tp";
import { isConvert } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import { defIptStatus } from "../common/inputbox.hint";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popbox";
import WalletPanel from "./walletPanel";
import AmountPanel from "./amountPanel";

export const tpWalletsListType = {
	allWallets: 0,
	afterTransWallets: 1
};

const initSelectedIdx = {
	transferFrom: null,
	transferTo: null
};

const initTransferOptions = {
	transferFrom: [],
	transferTo: []
};

const initWarning = { status: defIptStatus.default, msg: "" };

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const [mainWalletInfo, setMainWalletInfo] = useState({});
	const [tpWalletsList, setTpWalletsList] = useState([]);
	const [transferOptions, setTransferOptions] = useState(initTransferOptions);
	const [selectedIdx, setSelectedIdx] = useState(initSelectedIdx);

	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState(initWarning);
	const [recentDatas, setRecentDatas] = useState([]);
	const [loading, setLoading] = useState(true);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		api_account_GetTpWalletList({
			ListType: tpWalletsListType.allWallets
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						res.data.data?.forEach(i => {
							GetTpWalletBalance(i.tpId);
						});
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
					}
					setLoading(false);
				}
			},
			err => {
				if (isMountedRef.current) {
					setLoading(false);
				}
			}
		);
		GetBalnace();

		api_GetTransferRecent().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setRecentDatas(res.data.data);
			}
		});
	}, []);

	let allWalletsList = [mainWalletInfo, ...tpWalletsList];
	allWalletsList.sort((a, b) => {
		return a.id - b.id;
	});

	const GetBalnace = () => {
		api_GetBalnace().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						let mainWalletData = {
							id: 0,
							displayKey: "lbl_MainWallet",
							balance: res.data.data
						};
						setMainWalletInfo(mainWalletData);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
					}
				}
			},
			err => {
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

	const GetTpWalletBalance = tpId => {
		api_account_GetTpWalletBalance({ TpId: tpId }).then(
			res => {
				if (res.data.errorCode === 0) {
					let _datas = res.data.data;
					let tpWalletData = {
						id: _datas.tpId,
						displayKey: `lbl_TpWallet_${_datas.tpId}`,
						balance: _datas.balance
					};
					let tpWalletIdx = tpWalletsList.findIndex(wallet => {
						return wallet.id === tpId;
					});

					if (tpWalletIdx !== -1) {
						let _arr = [...tpWalletsList];
						_arr[tpWalletIdx] = tpWalletData;
						setTpWalletsList(_arr);
					} else {
						setTpWalletsList(prev => [...prev, tpWalletData]);
					}
				}
			},
			err => {
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

	const GetTransferRecent = () => {
		api_GetTransferRecent().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setRecentDatas(res.data.data);
			}
		});
	};

	const VaildAmount = _amount => {
		let checked = _amount > 0 && _amount !== "";
		if (!checked) {
			setWarning({
				status: true,
				msg: i18n.lbl_AmountTooltip
			});
		} else {
			setWarning({
				status: false,
				msg: ""
			});
		}
		return checked;
	};

	const EditAmount = e => {
		let value = e.target.value;
		VaildAmount(value);
		setAmount(value);
	};

	const selectItem = (col, i) => {
		let otherDirection =
			col === "transferFrom" ? "transferTo" : "transferFrom";
		let _arr = [...allWalletsList];
		let emptySelectedIdx = false;

		if (i !== 0) {
			_arr = [_arr[0]];
		} else if (i === 0 && selectedIdx[otherDirection] === 0) {
			emptySelectedIdx = true;
		}

		setSelectedIdx(prev => ({
			...prev,
			[col]: i,
			[otherDirection]: emptySelectedIdx
				? null
				: selectedIdx[otherDirection]
		}));

		setTransferOptions(prev => ({
			...prev,
			[otherDirection]: _arr
		}));
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
						GetTpWalletBalance(_tpId);
						GetBalnace();
						setAmount("");
						setWarning(initWarning);
						GetTransferRecent();
						setLoading(false);
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
		let checked =
			VaildAmount(amount) &&
			selectedIdx.transferFrom !== null &&
			selectedIdx.transferTo !== null;

		if (checked) {
			let real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);
			let _direction = selectedIdx.transferFrom === 0 ? 1 : 2;
			let _tpId =
				selectedIdx.transferFrom === 0
					? allWalletsList[selectedIdx.transferTo].id
					: allWalletsList[selectedIdx.transferFrom].id;

			Transfer(_tpId, real_amount, _direction);
			setWarning(initWarning);
			setAmount("");
		} else if (
			selectedIdx.transferFrom === null ||
			selectedIdx.transferTo === null
		) {
			let msg =
				selectedIdx.transferFrom === null
					? "lbl_please_select_from_wallet"
					: "lbl_please_select_to_wallet";
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n[msg]
			});
		}
	};

	return loading ? (
		<Loading />
	) : (
		<div className="depositBox">
			<WalletPanel
				i18n={i18n}
				walletInfo={allWalletsList}
				GetBalnace={GetBalnace}
				GetTpWalletBalance={GetTpWalletBalance}
			/>
			<AmountPanel
				i18n={i18n}
				amount={amount}
				EditAmount={EditAmount}
				warning={warning}
				clickSubmit={clickSubmit}
				selectedIdx={selectedIdx}
				transferOptions={transferOptions}
				selectItem={selectItem}
				allWalletsList={allWalletsList}
			/>
			<RecentDatas
				datas={recentDatas}
				GetRecentDatas={GetTransferRecent}
			/>
		</div>
	);
};

export default Panel;
