import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, globalHistory, useLocation } from "@reach/router";
import { i18nContext, userInfoContext } from "../common/context";
import JoinStep1 from "./join.step1";
import JoinStep2 from "./join.step2";
import { initValue, initStatus } from "./join.def";

const JoinStepAll = () => {
	const navigate = useNavigate();
	const state = useLocation();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [step, setStep] = useState(1);
	const [userValue, setUserValue] = useState(initValue);
	const [hintStatus, setHintStatus] = useState(initStatus);
	let helmet = {};
	switch (userInfo.langId) {
		case "en":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88.net/en/join"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/join"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/join"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/join"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/join"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
		case "cs":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88gol.com/cs/join"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/join"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/join"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/join"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/join"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
		case "th":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88apple.com/th/join"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/join"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/join"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/join"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/join"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
		case "id":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88-indo.com/id/join"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/join"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/join"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/join"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/join"
						hrefLang="id-id"
					/>
				</Helmet>
			);

			break;

		default:
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88.net/en/join"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/join"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/join"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/join"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/join"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
	}
	useEffect(() => {
		if (userInfo.isLogin) {
			navigate(`/${userInfo.langId}`);
		}
	}, []);

	useEffect(() => {
		if (state.state?.fromHeader) {
			localStorage.setItem("previousPage", "/");
		}
	}, [globalHistory]);

	const EditField = (col, e) => {
		const val = e.target.value;
		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	return (
		<>
			<div className="step">
				<div className="stepLine">
					<div />
				</div>
				<div className={`circle${step === 1 ? " active" : ""}`}>
					<div>
						<div className="icon icon-checkmark" />
					</div>
				</div>
				<div className={`circle${step === 2 ? " active" : ""}`}>
					<div>
						<div>2</div>
					</div>
				</div>
				<div className="circle">
					<div>
						<div>3</div>
					</div>
				</div>
			</div>
			{step === 2 ? (
				<JoinStep2
					i18n={i18n}
					userValue={userValue}
					hintStatus={hintStatus}
					setHintStatus={setHintStatus}
					EditField={EditField}
					userInfo={userInfo}
					setUserValue={setUserValue}
					setUserInfo={setUserInfo}
				/>
			) : (
				<JoinStep1
					i18n={i18n}
					userValue={userValue}
					hintStatus={hintStatus}
					setHintStatus={setHintStatus}
					EditField={EditField}
					langId={userInfo.langId}
					setStep={setStep}
				/>
			)}
			{helmet}
		</>
	);
};

export default JoinStepAll;
