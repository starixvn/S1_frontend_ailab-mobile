import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext, userInfoContext } from "../common/context";
import JoinStep1 from "./join.step1";
import JoinStep2 from "./join.step2";
import JoinStep3 from "./join.step3";
import { initValue, initStatus } from "./join.def";
import {
	defCurrenyId,
	getLocalStorage,
	getUrlParameter,
	getCookie
} from "../common/common";
import useHandleLineLogin, { defType } from "../hook/useHandleLineLogin";
import api from "../../service/api";

const JoinStepAll = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [step, setStep] = useState(1);
	const [userValue, setUserValue] = useState(initValue);
	const [hintStatus, setHintStatus] = useState(initStatus);
	const [siteCurrency, setSiteCurrencyState] = useState([]);
	const [recaptchaInfo, setRecaptchaInfo] = useState({});
	const { lineLogin } = useHandleLineLogin();
	const lineUserId = getLocalStorage("lineUser");

	const urlAffId = getUrlParameter("AffId") || getCookie("AffId");
	const urlAffCode = getUrlParameter("AffCode") || getCookie("AffCode");
	const urlAffiliate = urlAffId || urlAffCode;

	useEffect(() => {
		if (userInfo.isLogin) {
			navigate(`/${userInfo.langId}`);
		}
		const getRecaptchaSiteKey = async () => {
			try {
				const res = await api.site.GetRecaptchaInfo();
				const { country, siteKey } = res.data.data;
				setRecaptchaInfo({
					country,
					siteKey
				});
			} catch (error) {}
		};
		getRecaptchaSiteKey();

		if (urlAffiliate) {
			checkAffiliate({});
		}
	}, []);

	const checkAffiliate = async ({ formAffCode }) => {
		let checked = null;
		let msg = "";

		if (urlAffId) {
			const res = await api.site.GetAffiliateAgent({ AffId: urlAffId });
			if (res.data.errorCode === 0) {
				const { currencyId } = res.data.data;
				const currencyArr = [
					{
						id: currencyId,
						displayKey: `Currency_${currencyId}`
					}
				];
				setSiteCurrencyState(currencyArr);
				setUserValue(prev => ({
					...prev,
					Affiliate: urlAffId
				}));
			}
		} else if (urlAffCode) {
			const res = await api.site.AffiliateCheck({
				AffCode: urlAffCode,
				langId: userInfo.langId
			});
			if (res.data.errorCode === 0) {
				setUserValue(prev => ({
					...prev,
					Affiliate: urlAffCode
				}));
			}
		} else if (formAffCode) {
			const res = await api.site.AffiliateCheck({
				AffCode: formAffCode,
				langId: userInfo.langId
			});
			if (res.data.errorCode === 0) {
				if (res.data.data !== 0) {
					const currencyId = res.data.data;
					const currencyArr = [
						{
							id: currencyId,
							displayKey: `Currency_${currencyId}`
						}
					];
					setSiteCurrencyState(currencyArr);
				}

				checked = true;
				msg = "";
			} else {
				checked = false;
				msg = "lbl_AffiliateIdWrong";
			}
		}

		return { checked, msg };
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "UserName") {
			val = val.replace(/[\W_]/g, "");
		} else if (col === "RealName") {
			val = val.replace(/[\d\-!@#$%^&_()+";~～<>=|?[\]\\`~{}]+/gu, "");
		} else if (col === "Phone") {
			val = val.replace(/[^0-9]+/g, "");
		}

		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const handleLineRegister = e => {
		e.preventDefault();
		lineLogin({ type: defType.register });
	};

	const judgeStepHandle = () => {
		let content;
		switch (step) {
			case 1:
				content = (
					<JoinStep1
						i18n={i18n}
						userValue={userValue}
						hintStatus={hintStatus}
						setHintStatus={setHintStatus}
						EditField={EditField}
						langId={userInfo.langId}
						setStep={setStep}
						setUserValue={setUserValue}
						urlAffiliate={urlAffiliate}
						checkAffiliate={checkAffiliate}
					/>
				);
				break;
			case 2:
				content = (
					<JoinStep2
						i18n={i18n}
						userValue={userValue}
						hintStatus={hintStatus}
						setHintStatus={setHintStatus}
						EditField={EditField}
						userInfo={userInfo}
						setUserValue={setUserValue}
						setUserInfo={setUserInfo}
						lineUserId={lineUserId}
						setStep={setStep}
						recaptchaInfo={recaptchaInfo}
						siteCurrency={siteCurrency}
						setSiteCurrencyState={setSiteCurrencyState}
						urlAffId={urlAffId}
					/>
				);
				break;
			case 3:
				content = <JoinStep3 />;
				break;
			default:
				break;
		}
		return content;
	};

	return (
		<>
			{(userInfo.langId === "th" ||
				userInfo.currencyId === defCurrenyId.THB) &&
				!lineUserId && (
					<div className="register-line">
						{i18n.lbl_RegisterWithLine} ID
						<div className="btn-group">
							<button
								className="btn-line"
								onClick={e => {
									handleLineRegister(e);
								}}>
								<i className="icon icon-line-bold" />
								{i18n.lbl_RegisterWithLine}
							</button>
						</div>
					</div>
				)}
			<div className="step">
				<div className="stepLine">
					<div />
				</div>
				<div className={`circle${step === 1 ? " active" : ""}`}>
					<div>
						{step > 1 ? (
							<div className="icon icon-checkmark" />
						) : (
							<div>1</div>
						)}
					</div>
				</div>
				<div className={`circle${step === 2 ? " active" : ""}`}>
					<div>
						{step > 2 ? (
							<div className="icon icon-checkmark" />
						) : (
							<div>2</div>
						)}
					</div>
				</div>
				<div className={`circle${step === 3 ? " active" : ""}`}>
					<div>
						{step > 2 ? (
							<div className="icon icon-checkmark" />
						) : (
							<div>3</div>
						)}
					</div>
				</div>
			</div>
			{judgeStepHandle()}
		</>
	);
};

export default JoinStepAll;
