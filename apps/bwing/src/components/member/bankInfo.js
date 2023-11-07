import React, { useState, useContext, useEffect, useRef } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	withdrawalBlockSettingContext
} from "../common/context";
import { api_GetCustBankInfo } from "../../service/api/account";
import { api_GetBankInfoSysList } from "../../service/api/payment";
import Loading from "../common/loading";
import Step, { defStep } from "./bankInfo.step";
import AddCardPanel from "./bankInfo.addCard";
import ShowCardPanel from "./bankInfo.showCard";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const BankInfo = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);
	const [custBankInfo, setCustBankInfo] = useState([]);
	const [siteBankList, setSiteBankList] = useState([]);
	const [bankSelectedIdx, setBankSelectedIdx] = useState(0);
	const [loading, setLoading] = useState(true);
	const [step, setStep] = useState(defStep.initPanel);
	const [tip, setTip] = useState("");
	const isMountedRef = useRef(null);

	const displayBankCard =
		withdrawalSettingTypeList?.find(
			item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.BankCard
		)?.status ?? true;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			setLoading(true);
			api_GetCustBankInfo().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const { data } = res.data;
							if (data !== null) {
								const bankInfoDetail =
									data.bankInfoDetail ?? [];
								const getBankInfoArr = bankInfoDetail.map(i => {
									return {
										bankName: i.bankName,
										image: i.bankLogo,
										accountNo: i.accountNo,
										SysId: i.sysId
									};
								});
								setCustBankInfo(() => getBankInfoArr);
							}
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
						setLoading(false);
					}
				}
			);
		}
		setLoading(false);
	}, [
		i18n.lbl_ImportantNote,
		i18n.msg_ApiServerError,
		setPopBox,
		userInfo.isLogin
	]);

	const GetCustBankInfo = () => {
		setLoading(true);

		api_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const { data } = res.data;
						if (data !== null) {
							const bankInfoDetail = data.bankInfoDetail ?? [];
							const getBankInfoArr = bankInfoDetail.map(i => {
								return {
									bankName: i.bankName,
									image: i.bankLogo,
									accountNo: i.accountNo,
									SysId: i.sysId
								};
							});
							setCustBankInfo(preV => getBankInfoArr);
							setUserInfo(prevState => ({
								...prevState,
								accountName: data.accountName
							}));
							setLoading(false);
						}
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	const GetBankInfoSysList = () => {
		api_GetBankInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setSiteBankList(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
					setLoading(false);
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
					setLoading(false);
				}
			}
		);
	};

	const showTip = () => {
		const _tip = tip === "" ? i18n.lbl_BankAccountHint : "";
		setTip(_tip);
	};

	if (!displayBankCard) return null;

	return loading ? (
		<Loading />
	) : (
		<section className="depositBox" data-testid="bankInfo">
			<p className="depositBox-text">{i18n.lbl_BankInfo_Hint}</p>
			<Step i18n={i18n} step={step} />
			{userInfo?.accountName ? (
				<>
					<div className="depositInBox">
						<div className="textFlex textArea">
							<p>
								<span className="icon icon-icon32px_Profile" />
								{i18n.lbl_BankAccountName}
							</p>
							<p>
								{userInfo?.accountName}
								<span
									className="icon icon-information-solid"
									onClick={showTip}
								/>
							</p>
						</div>
					</div>
					{tip ? <div data-testid="accountNameTip">{tip}</div> : null}
				</>
			) : null}

			{custBankInfo?.length < 3 ? (
				<AddCardPanel
					i18n={i18n}
					step={step}
					setStep={setStep}
					accountName={userInfo?.accountName}
					siteBankList={siteBankList}
					bankSelectedIdx={bankSelectedIdx}
					setBankSelectedIdx={setBankSelectedIdx}
					GetCustBankInfo={GetCustBankInfo}
					GetBankInfoSysList={GetBankInfoSysList}
					custBankList={custBankInfo}
				/>
			) : null}

			<ShowCardPanel
				i18n={i18n}
				custBankList={custBankInfo}
				accountName={userInfo.accountName}
				reload={GetCustBankInfo}
			/>
		</section>
	);
};

export default BankInfo;
