import React, { useContext, useEffect, useState, useRef } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	walletInfoContext
} from "Context";
import { isConvert, number_format } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import InputBox from "../common/inputbox";
import Dropdown from "../common/dropdown";
import ReloadSpin from "../common/reloadSpin";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popbox";
import api from "../../service/api";

const initSelectedIdx = {
	transferFrom: null,
	transferTo: null
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setWalletInfo } = useContext(walletInfoContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const [getWalletInfo, setGetWalletInfo] = useState([]);
	const [amount, setAmount] = useState("1");
	const [warning, setWarning] = useState({ status: false, msg: "" });
	const [selectedIdx, setSelectedIdx] = useState(initSelectedIdx);
	const [transferOptions, setTransferOptions] = useState([]);
	const [recentDatas, setRecentDatas] = useState([]);
	const [loading, setLoading] = useState(true);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		api.account.GetTpWalletList({ ListType: 0 }).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						let data = res.data.data;
						if (data !== null) {
							data.tpWalletList.map(i => {
								GetTpWalletBalance(i.tpId);
							});
						}
					} else {
						setPopBox({
							isOpen: true,
							title: i18n["lbl_ImportantNote"],
							content: res.data.message
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

		api.tp.GetTransferRecent().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setRecentDatas(res.data.data);
			}
		});
	}, [setWalletInfo]);

	console.log(selectedIdx, getWalletInfo);

	const GetBalnace = () => {
		api.account.GetBalnace().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						let mainWalletData = {
							id: 0,
							displayKey: "lbl_MainWallet",
							balance: res.data.data
						};

						let mainWalletIdx = getWalletInfo.findIndex(wallet => {
							return wallet.id === 0;
						});
						if (mainWalletIdx !== -1) {
							let _arr = [...getWalletInfo];
							_arr.splice(mainWalletIdx, 1, mainWalletData);
							setGetWalletInfo(_arr);
						} else {
							setGetWalletInfo(prev => [...prev, mainWalletData]);
						}
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
		api.account.GetTpWalletBalance({ TpId: tpId }).then(
			res => {
				if (res.data.errorCode === 0) {
					let _datas = res.data.data;
					let tpWalletData = {
						id: _datas.tpId,
						displayKey: `lbl_TpWallet_${_datas.tpId}`,
						balance: _datas.balance
					};

					let tpWalletIdx = getWalletInfo.findIndex(wallet => {
						return wallet.id === tpId;
					});
					if (tpWalletIdx !== -1) {
						let _arr = [...getWalletInfo];
						_arr.splice(tpWalletIdx, 1, tpWalletData);
						setGetWalletInfo(_arr);
					} else {
						setGetWalletInfo(prev => [...prev, tpWalletData]);
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
		api.tp.GetTransferRecent().then(res => {
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
		const balance = getWalletInfo[fromSelectedIdx]?.balance;
		let _balance = _isConvert ? Number(balance) / 1000 : Number(balance);
		_balance > 0 ? setAmount(`${_balance}`) : setAmount("1");
	};

	const selectItem = (col, i) => {
		if (col === "transferFrom") {
			let _arr = [...getWalletInfo];

			if (i === 0) {
				_arr.splice(i, 1);
			} else {
				_arr.splice(1, getWalletInfo.length - 1);
			}

			setTransferOptions(_arr);
		}

		setSelectedIdx(prev => ({
			...prev,
			[col]: i
		}));
	};

	const clickSubmit = () => {
		let checked = VaildAmount(amount);
		let direction = selectedIdx.transferFrom === 0 ? 1 : 2;
		let _tpId =
			selectedIdx.transferFrom === 0
				? transferOptions[selectedIdx.transferTo].id
				: getWalletInfo[selectedIdx.transferFrom].id;

		if (checked && _tpId) {
			let real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);
			setLoading(true);
			api.tp
				.Transfer({
					TpId: _tpId,
					amount: real_amount,
					direction: direction
				})
				.then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 9) {
								setLoading(false);
								setPopBox({
									isOpen: true,
									popBoxType:
										defPopBoxType.TurnoverAccumulated,
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
								GetBalnace();
								GetTpWalletBalance(_tpId);
								setAmount("1");
								GetTransferRecent();
								setLoading(false);
							}
						}
					},
					err => {
						if (isMountedRef.current) {
							setLoading(false);
						}
					}
				);
		}
	};

	let arr = getWalletInfo
		.sort((a, b) => {
			return a.id - b.id;
		})
		.map(wallet => {
			return (
				<div className="account" key={wallet.id}>
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
			<>{arr}</>

			<div className="inputBox">
				<Dropdown
					mainKey="transfer-From"
					options={getWalletInfo}
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
					options={transferOptions}
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

			<RecentDatas datas={recentDatas} ReloadFunc={GetTransferRecent} />
		</>
	);
};

export default Panel;
