import React, { useEffect, useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import { popBoxContext } from "../common/context";
import { paymentNoSiteImgURL } from "../../config";
import { defStep } from "./eWallet.step";
import Inputbox from "../common/inputbox.info";
import { api_SetCustEWalletInfo } from "../../service/api/accountStrict";

const initStatus = {
	accountName: {
		checked: null,
		msg: ""
	},
	accountNo: {
		checked: null,
		msg: ""
	}
};

const EWalletAddCard = ({
	i18n,
	step,
	setStep,
	accountName,
	siteEWalletList,
	eWalletSelectedIdx,
	setEWalletSelectedIdx,
	GetCustEWalletInfo,
	GetEWalletInfoSysList,
	custEWalletInfo
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const [userValue, setUserValue] = useState({});
	const [inputStatus, setInputStatus] = useState(initStatus);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickAddBtn = () => {
		setStep(defStep.eWalletPanel);
		GetEWalletInfoSysList();
	};

	const toPrevStep = () => {
		if (step === defStep.eWalletAccountPanel) {
			setUserValue({});
			setInputStatus(initStatus);
		}
		setStep(step - 1);
	};

	const selectEWallet = bankIdx => {
		setEWalletSelectedIdx(bankIdx);
		setStep(step + 1);
	};

	const editField = ({ col }, e) => {
		let setValue = true;
		const val = e.target.value;
		if (col === "accountNo") {
			const regex = /^[0-9]*$/;
			setValue = regex.test(val);
		}

		if (setValue) {
			setUserValue(prev => ({
				...prev,
				[col]: val
			}));
		}
	};

	const checkInput = ({ val, col }) => {
		let _msg = "";
		let checked;
		const isDuplicateBank = custEWalletInfo?.find(
			_selectBank =>
				_selectBank.SysId ===
					siteEWalletList[eWalletSelectedIdx].sysId &&
				_selectBank.accountNo === val
		);
		if (!val) {
			checked = false;
			_msg =
				col === "accountName"
					? i18n.msg_EnterRealName
					: i18n.msg_NeedAccountNo;
		} else if (col === "accountNo" && isDuplicateBank) {
			checked = false;
			_msg = i18n.lbl_Prohibited_Duplicate_Bank_Account;
		} else {
			checked = true;
		}

		setInputStatus(prev => ({
			...prev,
			[col]: { checked, msg: _msg }
		}));
	};

	const clickInfo = ({ col }) => {
		let _msg = "";
		if (inputStatus[col].msg === "") {
			if (col === "accountName") {
				_msg = i18n.lbl_Please_input_your_real_name_as_in_your_ID;
			} else {
				_msg = i18n.lbl_EnterAccountNumber;
			}
		}
		setInputStatus(prev => ({
			...prev,
			[col]: { checked: null, msg: _msg }
		}));
	};

	const clickSubmit = () => {
		const checked =
			(accountName || userValue.accountName) &&
			userValue.accountNo &&
			inputStatus.accountNo.checked;

		if (checked) {
			const eWalletInfoData = {
				AccountNo: userValue.accountNo,
				SysId: siteEWalletList[eWalletSelectedIdx].sysId
			};

			api_SetCustEWalletInfo(eWalletInfoData).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode !== 0) {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						} else {
							setUserValue({});
							setStep(defStep.initPanel);
							GetCustEWalletInfo();
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerErrors
						});
					}
				}
			);
		} else {
			checkInput({ val: userValue.accountNo, col: "accountNo" });
			if (!accountName) {
				checkInput({ val: userValue.accountName, col: "accountName" });
			}
		}
	};

	const arr = siteEWalletList?.map((item, i) => {
		return (
			<div className="img3Box" key={`addEWalletAccount-${item.sysId}`}>
				<img
					onClick={selectEWallet.bind(this, i)}
					src={`${paymentNoSiteImgURL}/${item.eWalletLogo?.toLowerCase()}`}
					alt={item.bankName}
				/>
			</div>
		);
	});
	let content = null;
	if (step === defStep.initPanel) {
		content = (
			<div className="btn-group" data-testid="addAccountBtn">
				<button className="blue" onClick={clickAddBtn}>
					{i18n.lbl_AddEWallet}
				</button>
			</div>
		);
	} else if (step === defStep.eWalletPanel) {
		content = (
			<>
				<div className="depositInBox" data-testid="bankPanel">
					<div className="depositTitle textLeft">
						<h1>{i18n.lbl_Step_SelectEWallet.toUpperCase()}</h1>
					</div>
					<div className="depositImgArea">{arr}</div>
				</div>
				<div className="btn-group" data-testid="backBtn">
					<button className="left" onClick={toPrevStep}>
						<span className="icon icon-arrow-left2" />
						{i18n.lbl_Back}
					</button>
				</div>
			</>
		);
	} else {
		content = (
			<>
				<div className="depositInBox" data-testid="accountPanel">
					<div className="depositTitle textLeft">
						<h1>{i18n.lbl_EnterAccountNumber.toUpperCase()}</h1>
					</div>
					<div className="depositImgArea">
						<div className="img3Box">
							<img
								alt="BankLogo"
								src={`${paymentNoSiteImgURL}/${siteEWalletList[
									eWalletSelectedIdx
								]?.eWalletLogo?.toLowerCase()}`}
							/>
						</div>
					</div>
					{accountName ? null : (
						<Inputbox
							title={i18n.lbl_RealName}
							value={userValue.accountName ?? ""}
							onChange={editField.bind(this, {
								col: "accountName"
							})}
							onBlur={checkInput.bind(this, {
								val: userValue.accountName,
								col: "accountName"
							})}
							placeholder={i18n.msg_EnterRealName}
							btnStatus={inputStatus.accountName.checked}
							tip={inputStatus.accountName.msg}
							clickInfo={clickInfo.bind(this, {
								col: "accountName"
							})}
							testAttr="accountName"
						/>
					)}
					<Inputbox
						title={i18n.lbl_BankNumber}
						value={userValue.accountNo ?? ""}
						onChange={editField.bind(this, {
							col: "accountNo"
						})}
						onBlur={checkInput.bind(this, {
							val: userValue.accountNo,
							col: "accountNo"
						})}
						placeholder="1111 2222 3333 4444"
						btnStatus={inputStatus.accountNo.checked}
						tip={inputStatus.accountNo.msg}
						clickInfo={clickInfo.bind(this, {
							col: "accountNo"
						})}
						testAttr="bankAccount"
					/>
					<div className="btn-group">
						<button className="blue" onClick={clickSubmit}>
							{i18n.lbl_add_bank_submit.toUpperCase()}
						</button>
					</div>
				</div>
				<div className="btn-group" data-testid="backBtn">
					<button className="left" onClick={toPrevStep}>
						<span className="icon icon-arrow-left2" />
						{i18n.lbl_Back}
					</button>
				</div>
			</>
		);
	}

	return content;
};

EWalletAddCard.prototype = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	step: PropTypes.number.isRequired,
	setStep: PropTypes.func.isRequired,
	accountName: PropTypes.string.isRequired,
	siteEWalletList: PropTypes.func.isRequired,
	eWalletSelectedIdx: PropTypes.number.isRequired,
	setEWalletSelectedIdx: PropTypes.func.isRequired,
	GetCustEWalletInfo: PropTypes.func.isRequired,
	GetEWalletInfoSysList: PropTypes.func.isRequired,
	custEWalletInfo: PropTypes.arrayOf(PropTypes.objectOf).isRequired
};

export default EWalletAddCard;
