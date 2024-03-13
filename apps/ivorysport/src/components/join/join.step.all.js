import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext, userInfoContext } from "../common/context";
import JoinStep1 from "./join.step1";
import JoinStep2 from "./join.step2";
import JoinStep3 from "./join.step3";
import { initValue, initStatus } from "./join.def";
import { getLocalStorage } from "../common/common";
import api from "../../service/api";

const JoinStepAll = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [step, setStep] = useState(1);
	const [userValue, setUserValue] = useState(initValue);
	const [hintStatus, setHintStatus] = useState(initStatus);
	const [recaptchaInfo, setRecaptchaInfo] = useState({});
	const lineUserId = getLocalStorage("lineUser");

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
	}, []);

	const EditField = (col, e) => {
		let val = null;
		if (
			col === "IDImage" ||
			// * 儲存下拉選單資訊
			col === "occupation" ||
			col === "sourceOfIncome"
		) {
			val = e; // * e = File || {index, value}
		} else {
			val = e.target.value;

			if (col === "UserName") {
				val = val.replace(/[\W_]/g, "");
			} else if (col === "RealName") {
				val = val.replace(
					/[\d\-!@#$%^&_()+";~～<>=|?\[\]\\`~{}]+/gu,
					""
				);
			} else if (col === "Phone") {
				val = val.replace(/[^0-9]+/g, "");
			}
		}
		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
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
