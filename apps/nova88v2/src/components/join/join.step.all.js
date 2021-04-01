import React, { useState, useContext, useEffect } from "react";
import { useNavigate, globalHistory, useLocation } from "@reach/router";
import { i18nContext, userInfoContext } from "../common/context";
import { Link } from "../../route/link";
import JoinStep1 from "./join.step1";
import JoinStep2 from "./join.step2";
import { initValue, initStatus } from "./join.def";
import Logo from "../common/logo";
import path from "../../path";

const JoinStepAll = () => {
	const navigate = useNavigate();
	const state = useLocation();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [step, setStep] = useState(1);
	const [userValue, setUserValue] = useState(initValue);
	const [hintStatus, setHintStatus] = useState(initStatus);

	useEffect(() => {
		if (userInfo.isLogin) {
			navigate(`/${userInfo.langId}`);
		}
	}, []);

	useEffect(() => {
		if (state.state.fromHeader) {
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
					JoinStep3={
						<JoinStep3 langId={userInfo.langId} i18n={i18n} />
					}
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
		</>
	);
};

const JoinStep3 = ({ langId, i18n }) => {
	return (
		<div className="joinSuccess">
			<Logo langId={langId} />
			<div className="step">
				<div className="stepLine">
					<div className="stepBar100" />
				</div>
				<div className="circle active">
					<div>
						<div className="icon icon-checkmark" />
					</div>
				</div>
				<div className="circle active">
					<div>
						<div className="icon icon-checkmark" />
					</div>
				</div>
				<div className="circle active">
					<div>
						<div className="icon icon-checkmark" />
					</div>
				</div>
			</div>
			<div className="Join">
				<div className="Terms">{i18n.lbl_AfterJoinHint}</div>
				<Link className="btn-group" to={path.deposit.root}>
					<button>{i18n.lbl_DepositNow}</button>
				</Link>
			</div>
		</div>
	);
};

export default JoinStepAll;
