import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext, userInfoContext } from "../common/context";
import { SEO } from "../seo/seo";
import JoinStep1 from "./join.step1";
import JoinStep2 from "./join.step2";
import JoinStep3 from "./join.step3";
import { initValue, initStatus } from "./join.def";
import path from "../../path";
import { defCurrenyId, getLocalStorage } from "../common/common";
import useHandleLineLogin, { defType } from "../hook/useHandleLineLogin";

const JoinStepAll = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [step, setStep] = useState(1);
	const [userValue, setUserValue] = useState(initValue);
	const [hintStatus, setHintStatus] = useState(initStatus);
	const { lineLogin } = useHandleLineLogin();
	const lineUserId = getLocalStorage("lineUser");

	useEffect(() => {
		if (userInfo.isLogin) {
			navigate(`/${userInfo.langId}`);
		}
	}, []);

	const EditField = (col, e) => {
		const val = e.target.value;
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
				userInfo.langId === "th_en" ||
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
			<SEO
				path={path.join.root}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
			/>
		</>
	);
};

export default JoinStepAll;
