import React, { useContext, useEffect, useState, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import {
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance,
	api_GetBalnace
} from "../../service/api/account";
import { api_Transfer, api_GetTransferRecent } from "../../service/api/tp";
import { isConvert, number_format } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import InputBox from "../common/inputbox";
import Dropdown from "../common/dropdown";
import ReloadSpin from "../common/reloadSpin";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popbox";
import {
	tpWalletsListType,
	initSelectedIdx,
	initTransferOptions
} from "./transfer.def";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const [mainWalletInfo, setMainWalletInfo] = useState({});
	const [tpWalletsList, setTpWalletsList] = useState([]);
	const [tpBalanceList, setTpBalanceList] = useState([]);
	const [selectedIdx, setSelectedIdx] = useState(initSelectedIdx);
	const [transferOptions, setTransferOptions] = useState(initTransferOptions);

	const [amount, setAmount] = useState("1");
	const [warning, setWarning] = useState({ status: false, msg: "" });
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
				if (res.data.errorCode === 0) {
					let _arr = [];
					res.data.data?.forEach(i => {
						GetTpWalletBalance(i.tpId);
						_arr.push({
							id: i.tpId,
							displayKey: `lbl_TpWallet_${i.tpId}`
						});
					});
					setTpWalletsList(_arr);
				} else {
					setPopBox({
						isOpen: true,
						title: i18n["lbl_ImportantNote"],
						content: res.data.message
					});
				}
				setLoading(false);
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

	let allWalletsList = [
		{ id: 0, displayKey: "lbl_MainWallet" },
		...tpWalletsList
	];
	let allBalanceList = [mainWalletInfo, ...tpBalanceList];

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
							title: i18n["lbl_ImportantNote"],
							content: res.data.message
						});
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setLoading(false);
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
					let tpWalletIdx = tpBalanceList.findIndex(wallet => {
						return wallet.id === tpId;
					});

					if (tpWalletIdx !== -1) {
						let _arr = [...tpBalanceList];
						_arr[tpWalletIdx] = tpWalletData;
						setTpBalanceList(_arr);
					} else {
						setTpBalanceList(prev => [...prev, tpWalletData]);
					}
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
		let checked = _amount > 0 && _amount !== "";
		if (!checked) {
			setWarning({
				status: true,
				msg: i18n["lbl_AmountTooltip"]
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

	const setMaxAmount = () => {
		const balance = allWalletsList[selectedIdx.transferFrom]?.balance;
		let _balance = _isConvert ? Number(balance) / 1000 : Number(balance);
		_balance > 0 ? setAmount(`${_balance}`) : setAmount("1");
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

	const clickSubmit = () => {
		let checked =
			VaildAmount(amount) &&
			selectedIdx.transferFrom !== null &&
			selectedIdx.transferTo !== null;

		if (checked) {
			let real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);
			let direction = selectedIdx.transferFrom === 0 ? 1 : 2;
			let _tpId =
				selectedIdx.transferFrom === 0
					? allWalletsList[selectedIdx.transferTo].id
					: allWalletsList[selectedIdx.transferFrom].id;
			setLoading(true);

			api_Transfer({
				TpId: _tpId,
				amount: real_amount,
				direction: direction
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 9) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.TurnoverAccumulated,
								currencyId: userInfo.currencyId,
								turnover: res.data.data.turnover,
								rollover: res.data.data.rollover
							});
						} else if (res.data.errorCode !== 0) {
							setPopBox({
								isOpen: true,
								title: i18n["lbl_ImportantNote"],
								content: res.data.message
							});
						} else {
							GetTpWalletBalance(_tpId);
							GetBalnace();
							setAmount("1");
							GetTransferRecent();
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
				title: i18n["lbl_ImportantNote"],
				content: i18n[msg]
			});
		}
	};

	let arr = allBalanceList.map(wallet => {
		return (
			<div className="account" key={`transfer-wallet-${wallet.id}`}>
				<div className="info">
					<span className="title">{i18n[wallet.displayKey]}</span>
					<div>{number_format(wallet.balance, _isConvert)}</div>
				</div>
				<ReloadSpin
					func={
						wallet.id !== 0
							? GetTpWalletBalance.bind(this, wallet.id)
							: GetBalnace
					}
				/>
			</div>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<>
			{arr}

			<div className="inputBox">
				<Dropdown
					mainKey="transfer-From"
					options={
						selectedIdx.transferTo === null
							? allWalletsList
							: transferOptions.transferFrom
					}
					placeholder={i18n["lbl_TransferFrom"]}
					selectedIdx={selectedIdx.transferFrom}
					i18n={i18n}
					onSelectItem={selectItem.bind(this, "transferFrom")}
					colName="transferFrom"
				/>
			</div>

			<div className="inputBox">
				<Dropdown
					mainKey="transfer-To"
					options={
						selectedIdx.transferFrom === null
							? allWalletsList
							: transferOptions.transferTo
					}
					placeholder={i18n["lbl_TransferTo"]}
					selectedIdx={selectedIdx.transferTo}
					onSelectItem={selectItem.bind(this, "transferTo")}
					i18n={i18n}
					colName="transferTo"
				/>
			</div>

			<div className="inputBox">
				<InputBox
					icon="icon-pencil"
					value={amount}
					inputType="tel"
					onChange={EditAmount}
					Warning={warning}
				/>
			</div>

			<div className="btn-group">
				<button className="blue" onClick={setMaxAmount}>
					{i18n["lbl_MaxAmount"]}
				</button>
				<button className="orange" onClick={clickSubmit}>
					{i18n["lbl_Transfer"]}
				</button>
			</div>

			<RecentDatas
				datas={recentDatas}
				GetRecentDatas={GetTransferRecent}
			/>
		</>
	);
};

export default Panel;
