import { useContext, useEffect, useState, useRef } from "react";
import { loadingContext } from "../../common/context";
import { defIptStatus } from "../../common/inputStatus";
import { defPopBoxType } from "../../common/popbox";
import api from "../../../service/api";
import {
	initSelectedIdx,
	initWarning,
	transDirection,
	defTransferAction
} from "../transfer.def";

export const useTransfer = ({
	GetBalance,
	GetTpWalletBalance,
	setPopBox,
	tpWalletsList,
	userInfo,
	mainWalletInfo,
	i18n,
	_isConvert
}) => {
	const { setLoading } = useContext(loadingContext);
	const [selectedIdx, setSelectedIdx] = useState(initSelectedIdx);
	const [amount, setAmount] = useState("");
	const [warning, setWarning] = useState(initWarning);
	const [recentDatas, setRecentDatas] = useState([]);
	const allWalletsList = [mainWalletInfo, ...tpWalletsList];

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

	const selectItem = (col, i) => {
		const otherDirection =
			col === transDirection.from
				? transDirection.to
				: transDirection.from;

		const emptySelectedIdx = selectedIdx[otherDirection] === i;

		setSelectedIdx(prev => ({
			...prev,
			[col]: i,
			[otherDirection]: emptySelectedIdx
				? null
				: selectedIdx[otherDirection]
		}));
	};

	const GetTransferRecent = () => {
		api.tp.GetTransferRecent().then(
			res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setRecentDatas(res.data.data);
				} else if (res.data.errorCode !== 0) {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
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

	const Transfer = async ({
		FromTpId,
		ToTpId,
		real_amount,
		isMultiple = false,
		TransferAction
	}) => {
		setLoading(true);

		try {
			const res = await api.tp.TransferEX({
				FromTpId,
				ToTpId,
				Amount: real_amount,
				TransferAction,
				LangId: userInfo.langId
			});

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
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
					if (FromTpId !== 0 && ToTpId !== 0) {
						GetBalance();
						GetTpWalletBalance(FromTpId);
						GetTransferRecent();
					}
				} else if (!isMultiple) {
					if (FromTpId === 0 || ToTpId === 0) {
						GetBalance();
					}

					if (FromTpId !== 0) {
						GetTpWalletBalance(FromTpId);
					}
					if (ToTpId !== 0) {
						GetTpWalletBalance(ToTpId);
					}

					setAmount("");
					setWarning(initWarning);
					GetTransferRecent();
				}

				if (!isMultiple) {
					setLoading(false);
				}
			}
		} catch (error) {
			if (isMountedRef.current) {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});

				if (!isMultiple) {
					setLoading(false);
				}
			}
		}
	};

	const restoreAll = async ({ tpId }) => {
		const tpPromiseArr = tpWalletsList
			.filter(wallet => wallet.balance > 0 && wallet.id !== tpId)
			.map(wallet =>
				Transfer({
					FromTpId: wallet.id,
					ToTpId: tpId,
					real_amount: wallet.balance,
					isMultiple: true,
					TransferAction: defTransferAction.restoreAll
				})
			);

		Promise.allSettled(
			tpId !== 0 && mainWalletInfo.balance
				? [
						Transfer({
							FromTpId: 0,
							ToTpId: tpId,
							real_amount: mainWalletInfo.balance,
							isMultiple: true,
							TransferAction: defTransferAction.restoreAll
						}),
						...tpPromiseArr
				  ]
				: tpPromiseArr
		).then(async () => {
			await GetBalance();
			await tpWalletsList
				.filter(wallet => wallet.balance > 0 && wallet.id !== tpId)
				.map(wallet => GetTpWalletBalance(wallet.id));

			setLoading(false);
		});
	};

	const clickSubmit = async () => {
		const _checked =
			ValidAmount(amount) &&
			selectedIdx.transferFrom !== null &&
			selectedIdx.transferTo !== null;

		if (_checked) {
			const real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);

			setLoading(true);
			Transfer({
				FromTpId: allWalletsList[selectedIdx.transferFrom].id,
				ToTpId: allWalletsList[selectedIdx.transferTo].id,
				real_amount,
				TransferAction: defTransferAction.transfer
			});
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

	const ValidAmount = _amount => {
		const _checked = _amount > 0 && _amount !== "";
		if (!_checked) {
			setWarning({
				status: defIptStatus.warning,
				msg: i18n.lbl_AmountTooltip?.replace("{{0}}", 1)
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

	return {
		amount,
		warning,
		recentDatas,
		restoreAll,
		clickSubmit,
		EditAmount,
		setMaxAmount,
		allWalletsList,
		selectItem,
		selectedIdx
	};
};
