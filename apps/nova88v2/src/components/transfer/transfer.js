import React, { useContext, useEffect, useState, useRef } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext
} from "../common/context";
import { isConvert, number_format } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import InputBox from "../common/inputbox.hint";
import { defIptStatus } from "../common/inputStatus";
import Dropdown from "../common/dropdown";
import ReloadSpin from "../common/reloadSpin";
import { defPopBoxType } from "../common/popbox";
import api from "../../service/api";
import useTip from "../hook/useTip";
import {
	tpWalletsListType,
	initSelectedIdx,
	initTransferOptions,
	initWarning,
	defDirection,
	transDirection
} from "./transfer.def";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setLoading } = useContext(loadingContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const [transferOptions, setTransferOptions] = useState(initTransferOptions);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState(initWarning);
	const { showTips, showTipHandler } = useTip();
	const [selectedIdx, setSelectedIdx] = useState(initSelectedIdx);
	const [recentDatas, setRecentDatas] = useState([]);

	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});
	const { tpWalletsList, GetTpWalletBalance } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.allWallets
	});

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		GetTransferRecent();
	}, []);

	const GetTransferRecent = () => {
		api.tp.GetTransferRecent().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setRecentDatas(res.data.data);
			}
		});
	};

	const ValidAmount = _amount => {
		const _checked = _amount > 0 && _amount !== "";
		if (!_checked) {
			setWarning({
				status: defIptStatus.warning,
				msg: i18n.lbl_AmountTooltip
			});
		} else {
			setWarning({ status: defIptStatus.verified, msg: "" });
		}
		return _checked;
	};

	const EditAmount = e => {
		const { value } = e.target;
		ValidAmount(value);
		setAmount(value);
	};

	const setMaxAmount = () => {
		const balance = allWalletsList[selectedIdx.transferFrom]?.balance;
		const _balance = _isConvert ? Number(balance) / 1000 : Number(balance);
		_balance > 0 ? setAmount(`${_balance}`) : setAmount("");
	};

	const selectItem = (col, i) => {
		const otherDirection =
			col === transDirection.from
				? transDirection.to
				: transDirection.from;
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

	const Transfer = ({ tpId, real_amount, direction }) => {
		setLoading(true);

		api.tp
			.Transfer({
				TpId: tpId,
				amount: real_amount,
				direction
			})
			.then(
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
								title: i18n.lbl_ImportantNote,
								content: `[${res.data.errorCode}]${res.data.message}`
							});
						} else {
							GetTpWalletBalance(tpId);
							GetBalance();
							setAmount("");
							setWarning(initWarning);
							GetTransferRecent();
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
	};

	const clickSubmit = () => {
		const _checked =
			ValidAmount(amount) &&
			selectedIdx.transferFrom !== null &&
			selectedIdx.transferTo !== null;

		if (_checked) {
			const real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);
			const direction =
				selectedIdx.transferFrom === 0
					? defDirection.mainToTp
					: defDirection.tpToMain;
			const _tpId =
				selectedIdx.transferFrom === 0
					? allWalletsList[selectedIdx.transferTo].id
					: allWalletsList[selectedIdx.transferFrom].id;
			setLoading(true);

			Transfer({ tpId: _tpId, real_amount, direction });
		} else if (
			selectedIdx.transferFrom === null ||
			selectedIdx.transferTo === null
		) {
			const msg =
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

	const restoreAll = ({ tpId }) => {
		if (tpId === 0) {
			tpWalletsList
				.filter(wallet => wallet.balance > 0)
				.forEach(wallet => {
					Transfer({
						tpId: wallet.id,
						real_amount: wallet.balance,
						direction: defDirection.tpToMain
					});
				});
		} else {
			Transfer({
				tpId,
				real_amount: mainWalletInfo.balance,
				direction: defDirection.mainToTp
			});
		}
	};

	const allWalletsList = [mainWalletInfo, ...tpWalletsList];
	const arr = allWalletsList
		.filter(wallet => {
			return wallet.balance !== null;
		})
		.map(wallet => {
			return (
				<div className="account" key={`transfer-wallet-${wallet.id}`}>
					<div className="info">
						<span className="title">{i18n[wallet.displayKey]}</span>
						<div>{number_format(wallet.balance, _isConvert)}</div>
					</div>
					<div className="btn-group transferAll">
						<ReloadSpin
							func={
								wallet.id === 0
									? GetBalance
									: GetTpWalletBalance.bind(this, wallet.id)
							}
						/>
						<button
							className="blue"
							onClick={restoreAll.bind(this, {
								tpId: wallet.id
							})}>
							<div>{i18n.lbl_RestoreAll}</div>
						</button>
					</div>
				</div>
			);
		});

	return (
		<>
			{arr}
			<div className="text-org title">{i18n.lbl_From}</div>
			<Dropdown
				mainKey="transfer-From"
				options={
					selectedIdx.transferTo === null
						? allWalletsList
						: transferOptions.transferFrom
				}
				selectedIdx={selectedIdx.transferFrom}
				i18n={i18n}
				onSelectItem={selectItem.bind(this, transDirection.from)}
				colName="transferFrom"
				hideInfo={true}
			/>

			<div className="text-org title">{i18n.lbl_To}</div>
			<Dropdown
				mainKey="transfer-To"
				options={
					selectedIdx.transferFrom === null
						? allWalletsList
						: transferOptions.transferTo
				}
				selectedIdx={selectedIdx.transferTo}
				onSelectItem={selectItem.bind(this, transDirection.to)}
				i18n={i18n}
				colName="transferTo"
				hideInfo={true}
			/>

			<InputBox
				icon="icon-pencil"
				placeholder={i18n.lbl_Amount}
				onChange={EditAmount}
				value={amount}
				btnStatus={warning.status}
				warningMsg={warning.msg}
				inputType="tel"
				infoText={i18n.lbl_AmountTooltip}
				showTips={showTips.includes("amount")}
				clickInfo={() => showTipHandler("amount")}
			/>

			<div className="btn-group">
				<button
					className={
						selectedIdx.transferFrom === null ? "white" : "blue"
					}
					onClick={setMaxAmount}>
					{i18n.lbl_MaxAmount}
				</button>
				<button
					className={
						selectedIdx.transferFrom !== null &&
						selectedIdx.transferTo !== null &&
						warning.status === defIptStatus.verified
							? "orange"
							: "gray"
					}
					onClick={clickSubmit}>
					{i18n.lbl_Transfer}
				</button>
			</div>
			<RecentDatas datas={recentDatas} ReloadFunc={GetTransferRecent} />
		</>
	);
};

export default Panel;
