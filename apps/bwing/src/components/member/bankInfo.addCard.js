import React, { useEffect, useRef, useState, useContext } from "react";
import { api_SetCustBankInfo } from "../../service/api/accountStrict";
import { popBoxContext } from "../common/context";
import config from "../../config";
import { defStep } from "./bankInfo.step";
import Inputbox from "../common/inputbox";

const initWarning = {
	accountName: {
		status: false,
		msg: ""
	},
	accountNo: {
		status: false,
		msg: ""
	}
};

export default ({
	i18n,
	step,
	setStep,
	accountName,
	siteBankList,
	bankSelectedIdx,
	setBankSelectedIdx,
	GetCustBankInfo,
	GetBankInfoSysList
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const [userValue, setUserValue] = useState({});
	const [warning, setWarning] = useState(initWarning);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const clickAddBtn = () => {
		setStep(defStep.bankPanel);
		GetBankInfoSysList();
	};

	const toPrevStep = () => {
		if (step === defStep.accountPanel) {
			setUserValue({});
			setWarning(initWarning);
		}
		setStep(step - 1);
	};

	const selectBank = bankIdx => {
		setBankSelectedIdx(bankIdx);
		setStep(step + 1);
	};

	const editField = (col, e) => {
		let val = e.target.value;

		if (col === "accountNo") {
			val = val.replace(/[^0-9,.]+/g, "");
		}

		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const checkInput = (val, col) => {
		let _status = !val ? true : false;
		let _msg = "";

		if (!val) {
			_msg =
				col === "accountName"
					? "msg_EnterRealName"
					: "msg_NeedAccountNo";
		}

		setWarning(prev => ({
			...prev,
			[col]: {
				status: _status,
				msg: _msg !== "" ? i18n[_msg] : ""
			}
		}));
	};

	const clickInfo = col => {
		let _msg = "";

		if (warning[col].msg === "") {
			if (col === "accountName") {
				_msg = i18n["lbl_Please_input_your_real_name_as_in_your_ID"];
			} else {
				_msg = i18n["lbl_EnterAccountNumber"];
			}
		}

		setWarning(prev => ({
			...prev,
			[col]: {
				status: false,
				msg: _msg
			}
		}));
	};

	const clickSubmit = () => {
		let checked =
			(accountName || userValue.accountName) && userValue.accountNo;

		if (checked) {
			let bankInfoData = {
				AccountName: accountName ?? userValue.accountName,
				AccountNo: userValue.accountNo,
				SysId: siteBankList[bankSelectedIdx].sysId
			};

			api_SetCustBankInfo(bankInfoData).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode !== 0) {
							setPopBox({
								isOpen: true,
								title: i18n["lbl_ImportantNote"],
								content: res.data.message
							});
						} else {
							setUserValue({});
							setStep(defStep.initPanel);
							GetCustBankInfo();
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n["lbl_ImportantNote"],
							content: i18n["msg_ApiServerErrors"]
						});
					}
				}
			);
		} else {
			checkInput(userValue.accountNo, "accountNo");
			if (!accountName) {
				checkInput(userValue.accountName, "accountName");
			}
		}
	};

	let arr = siteBankList?.map((item, i) => {
		return (
			<div className="img3Box" key={`addBankAccount-${item.sysId}`}>
				<img
					onClick={selectBank.bind(this, i)}
					src={`${config.imgUrl}/common/images/BankLogo/${item.bankLogo}`}
					alt={item.bankName}
				/>
			</div>
		);
	});

	return step === defStep.initPanel ? (
		<div className="btn-group">
			<button className="blue" onClick={clickAddBtn}>
				{i18n["lbl_AddBankAccount"]}
			</button>
		</div>
	) : step === defStep.bankPanel ? (
		<>
			<div className="depositInBox">
				<div className="depositTitle textLeft">
					<h1>{i18n["lbl_Step_SelectBank"].toUpperCase()}</h1>
				</div>
				<div className="depositImgArea">{arr}</div>
			</div>
			<div className="btn-group">
				<button className="left" onClick={toPrevStep}>
					<span className="icon icon-arrow-left2"></span>
					{i18n["lbl_Back"]}
				</button>
			</div>
		</>
	) : (
		<>
			<div className="depositInBox">
				<div className="depositTitle textLeft">
					<h1>{i18n["lbl_EnterAccountNumber"].toUpperCase()}</h1>
				</div>
				<div className="depositImgArea">
					<div className="img3Box">
						<img
							alt="BankLogo"
							src={`${config.imgUrl}/common/images/BankLogo/${siteBankList[bankSelectedIdx]?.bankLogo}`}
						/>
					</div>
				</div>

				<div className="inputBox">
					{accountName ? null : (
						<>
							<div className="input-title">
								{i18n["lbl_RealName"]}
							</div>
							<Inputbox
								className="inputBoxText"
								value={userValue.accountName}
								onChange={editField.bind(this, "accountName")}
								onBlur={checkInput.bind(
									this,
									userValue.accountName,
									"accountName"
								)}
								WarningIcon={warning.accountName.status}
								placeholder={i18n["msg_EnterRealName"]}
								iconModuleName={
									!warning.accountName.status
										? "icon-information-solid"
										: null
								}
								clickInfo={clickInfo.bind(this, "accountName")}
							/>
							{warning.accountName.msg ? (
								<div>{warning.accountName.msg}</div>
							) : null}
						</>
					)}

					<div className="input-title">{i18n["lbl_BankNumber"]}</div>
					<Inputbox
						value={userValue.accountNo}
						className="inputBoxText"
						onChange={editField.bind(this, "accountNo")}
						onBlur={checkInput.bind(
							this,
							userValue.accountNo,
							"accountNo"
						)}
						WarningIcon={warning.accountNo.status}
						placeholder="1111 2222 3333 4444"
						iconModuleName={
							!warning.accountNo.status
								? "icon-information-solid"
								: null
						}
						clickInfo={clickInfo.bind(this, "accountNo")}
					/>
					{warning.accountNo.msg ? (
						<div>{warning.accountNo.msg}</div>
					) : null}

					<div className="btn-group">
						<button className="blue" onClick={clickSubmit}>
							{i18n["lbl_Submit"].toUpperCase()}
						</button>
					</div>
				</div>
			</div>
			<div className="btn-group">
				<button className="left" onClick={toPrevStep}>
					<span className="icon icon-arrow-left2"></span>
					{i18n["lbl_Back"]}
				</button>
			</div>
		</>
	);
};
