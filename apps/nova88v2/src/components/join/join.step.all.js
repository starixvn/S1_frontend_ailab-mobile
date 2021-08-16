import React, { useState, useContext, useEffect } from "react";
import { useNavigate, globalHistory, useLocation } from "@reach/router";
import { i18nContext, userInfoContext } from "../common/context";
import { GetMetaDataByPage } from "../seo/seo";
import JoinStep1 from "./join.step1";
import JoinStep2 from "./join.step2";
import { initValue, initStatus } from "./join.def";
import path from "../../path";

const JoinStepAll = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { i18n } = useContext(i18nContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [step, setStep] = useState(1);
	const [userValue, setUserValue] = useState(initValue);
	const [hintStatus, setHintStatus] = useState(initStatus);

	const helmet = GetMetaDataByPage({
		path: path.join.root,
		langId: userInfo.langId
	});

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
