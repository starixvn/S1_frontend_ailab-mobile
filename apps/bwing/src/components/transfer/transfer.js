import React, { useContext, useEffect, useState, useRef } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "../common/context";
import { api_Transfer, api_GetTransferRecent } from "../../service/api/tp";
import { isConvert } from "../common/common";
import RecentDatas from "./transfer.recentDatas";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popbox";
import WalletPanel from "./walletPanel";
import AmountPanel from "./amountPanel";
import useGetBalance from "../hook/useGetMainBalance";
import useGetTpBalance from "../hook/useGetTpBalance";

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

const initStatus = { checked: null, msg: "" };

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const [transferOptions, setTransferOptions] = useState(initTransferOptions);
	const [selectedIdx, setSelectedIdx] = useState(initSelectedIdx);

	const [amount, setAmount] = useState("");
	const [inputStatus, setInputStatus] = useState({ checked: null, msg: "" });
	const [recentDatas, setRecentDatas] = useState([]);
	const [loading, setLoading] = useState(false);

	const { mainWalletInfo, GetBalance } = useGetBalance();
	const { tpWalletsList, GetTpWalletBalance } = useGetTpBalance({
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
		api_GetTransferRecent().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setRecentDatas(res.data.data);
			}
		});
	}, []);

	const allWalletsList = [mainWalletInfo, ...tpWalletsList];

	const GetTransferRecent = () => {
		api_GetTransferRecent().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setRecentDatas(res.data.data);
			}
		});
	};

	const VaildAmount = _amount => {
		const checked = _amount > 0 && _amount !== "";
		if (!checked) {
			setInputStatus({
				checked: false,
				msg: i18n.lbl_AmountTooltip.replace("{{0}}", 1)
			});
		} else {
			setInputStatus({ checked: true, msg: "" });
		}
		return checked;
	};

	const clickInfo = () => {
		const _msg = i18n.lbl_AmountTooltip.replace(
			"{{0}}",
			number_format(1, _isConvert)
		);
		setInputStatus({
			checked: null,
			msg: inputStatus.msg === "" ? _msg : ""
		});
	};

	const EditAmount = e => {
		const { value } = e.target;
		const _amount = String(value).replace(/^(0+)|[^\d]+/g, "");
		VaildAmount(_amount);
		setAmount(_amount);
	};

	const selectItem = (col, i) => {
		const otherDirection =
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
							title: i18n.lbl_ImportantNote,
							content: res.data.message
						});
					} else {
						GetTpWalletBalance(_tpId);
						GetBalance();
						setAmount("");
						setInputStatus(initStatus);
						GetTransferRecent();
						setLoading(false);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setLoading(false);
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	const clickSubmit = () => {
		const checked =
			VaildAmount(amount) &&
			selectedIdx.transferFrom !== null &&
			selectedIdx.transferTo !== null;

		if (checked) {
			const real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);
			const _direction = selectedIdx.transferFrom === 0 ? 1 : 2;
			const _tpId =
				selectedIdx.transferFrom === 0
					? allWalletsList[selectedIdx.transferTo].id
					: allWalletsList[selectedIdx.transferFrom].id;

			Transfer(_tpId, real_amount, _direction);
			setInputStatus(initStatus);
			setAmount("");
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

	return loading ? (
		<Loading />
	) : (
		<div className="depositBox">
			<WalletPanel
				i18n={i18n}
				walletInfo={allWalletsList}
				GetBalance={GetBalance}
				GetTpWalletBalance={GetTpWalletBalance}
			/>
			<AmountPanel
				i18n={i18n}
				amount={amount}
				EditAmount={EditAmount}
				inputStatus={inputStatus}
				clickSubmit={clickSubmit}
				selectedIdx={selectedIdx}
				transferOptions={transferOptions}
				selectItem={selectItem}
				allWalletsList={allWalletsList}
				clickInfo={clickInfo}
				_isConvert={_isConvert}
				VaildAmount={VaildAmount.bind(this, amount)}
			/>
			<RecentDatas
				datas={recentDatas}
				GetRecentDatas={GetTransferRecent}
			/>
		</div>
	);
};

export default Panel;
