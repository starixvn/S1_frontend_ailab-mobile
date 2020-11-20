import React, { useEffect, useRef, useState, useContext } from "react";
import { api_GetBankInfoSysList } from "../../service/api/payment";
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
	setLoading,
	GetCustBankInfo
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const [siteBankList, setSiteBankList] = useState([]);
	const [bankSelectedIdx, setBankSelectedIdx] = useState(0);
	const [userValue, setUserValue] = useState({});
	const [warning, setWarning] = useState(initWarning);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const clickAddBtn = () => {
		setStep(defStep.bankPanel);
		api_GetBankInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setSiteBankList(res.data.data);
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
					setPopBox({
						isOpen: true,
						title: i18n["lbl_ImportantNote"],
						content: i18n["msg_ApiServerError"]
					});
					setLoading(false);
				}
			}
		);
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
								value={userValue.accountName}
								onChange={editField.bind(this, "accountName")}
								onBlur={checkInput.bind(
									this,
									userValue.accountName,
									"accountName"
								)}
								Warning={warning.accountName}
							/>
						</>
					)}

					<div className="input-title">{i18n["lbl_BankNumber"]}</div>
					<Inputbox
						value={userValue.accountNo}
						onChange={editField.bind(this, "accountNo")}
						onBlur={checkInput.bind(
							this,
							userValue.accountNo,
							"accountNo"
						)}
						Warning={warning.accountNo}
					/>
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
