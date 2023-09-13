import React, { useState, useContext, useEffect, useRef } from "react";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	withdrawalBlockSettingContext
} from "../common/context";
import Loading from "../common/loading";
import Step, { defStep } from "./eWallet.step";
import AddEWalletPanel from "./eWallet.addCard";
import ShowCardPanel from "./eWallet.showCard";
import { api_account_GetCustEWalletInfo } from "../../service/api/account";
import { api_payment_GetEWalletInfoSysList } from "../../service/api/payment";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const EWallet = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);
	const [siteEWalletList, setSiteEWalletList] = useState([]);
	const [custEWalletInfo, setCustEWalletInfo] = useState([]);
	const [eWalletSelectedIdx, setEWalletSelectedIdx] = useState(0);
	const [loading, setLoading] = useState(true);
	const [step, setStep] = useState(defStep.initPanel);
	const [tip, setTip] = useState("");
	const isMountedRef = useRef(null);

	const displayEWallet =
		withdrawalSettingTypeList?.find(
			item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.EWallet
		)?.status ?? true;

	const GetCustEWalletInfo = () => {
		setLoading(true);

		api_account_GetCustEWalletInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const { data } = res.data;
						if (data !== null) {
							const eWalletInfoDetail = data ?? [];
							const getBankInfoArr = eWalletInfoDetail.map(i => {
								return {
									bankName: i.eWalletName,
									image: i.eWalletLogo,
									accountNo: i.accountNo,
									SysId: i.sysId
								};
							});
							setCustEWalletInfo(getBankInfoArr);
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
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	const GetEWalletInfoSysList = () => {
		setLoading(true);
		api_payment_GetEWalletInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setSiteEWalletList(res.data.data);
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

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			setLoading(true);
			GetCustEWalletInfo();
		}
	}, [
		i18n.lbl_ImportantNote,
		i18n.msg_ApiServerError,
		setPopBox,
		userInfo.isLogin
	]);

	if (!displayEWallet) return null;

	return loading ? (
		<Loading />
	) : (
		<section className="depositBox" data-testid="bankInfo">
			<p className="depositBox-text">{i18n.lbl_EWallet_Update_Hint}</p>
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

			{custEWalletInfo?.length < 3 ? (
				<AddEWalletPanel
					i18n={i18n}
					step={step}
					setStep={setStep}
					accountName={userInfo?.accountName}
					siteEWalletList={siteEWalletList}
					eWalletSelectedIdx={eWalletSelectedIdx}
					setEWalletSelectedIdx={setEWalletSelectedIdx}
					GetCustEWalletInfo={GetCustEWalletInfo}
					GetEWalletInfoSysList={GetEWalletInfoSysList}
					custEWalletInfo={custEWalletInfo}
				/>
			) : null}

			<ShowCardPanel
				i18n={i18n}
				custEWalletInfo={custEWalletInfo}
				reload={GetCustEWalletInfo}
			/>
		</section>
	);
};

export default EWallet;
