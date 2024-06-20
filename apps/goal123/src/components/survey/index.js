import React, { useState, useEffect, useContext, useRef } from "react";
import classNames from "classnames";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../common/context";
import { bannerMediaUrl } from "../../config";
import { api_survey_Set } from "../../service/api/survey";

const initStatus = {
	content: "",
	contactInfo: ""
};

const Survey = () => {
	const { t } = useTranslation();
	const {
		userInfo: { isLogin }
	} = useContext(userInfoContext);
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const [isSubmit, setIsSubmit] = useState(false);
	const [surveyForm, setSurveyForm] = useState(initStatus);
	const navigate = useNavigate();

	const onCancelForm = () => {
		setSurveyForm(initStatus);
		navigate(-1);
	};

	const onSubmit = async e => {
		e.preventDefault();

		const errMessage = formValidate(surveyForm);
		if (errMessage) {
			setPopBox({
				isOpen: true,
				title: t("lbl_ImportantNote"),
				content: errMessage
			});
			return;
		}

		try {
			const res = await api_survey_Set(surveyForm);
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					setSurveyForm(initStatus);
					setIsSubmit(true);
				} else {
					setPopBox({
						isOpen: true,
						title: t("lbl_ImportantNote"),
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			}
		} catch (error) {
			setPopBox({
				isOpen: true,
				title: t("lbl_ImportantNote"),
				content: t("msg_ApiServerError")
			});
		}
	};

	const formValidate = form => {
		const EMAIL_OR_PHONE_REGEX = /^((\(?\+?[0-9]*\)?)?[0-9_]*|(\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+))$/;
		if (!form.content) {
			return t("lbl_Survey_Req_Content");
		}
		if (form.contactInfo && !EMAIL_OR_PHONE_REGEX.test(form.contactInfo)) {
			return t("lbl_Survey_Vld_Contact");
		}
		return null;
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setSurveyForm(prev => ({
			...prev,
			[name]: value
		}));
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	// 因為isLogin會先是null，然後才判斷是否登入並塞入資料，因此這邊不用(!isLogin)
	if (isLogin === false) {
		navigate("/");
		return null;
	}

	return (
		<>
			<div
				className={classNames("survey-before", {
					close: isSubmit
				})}>
				<div>{t("lbl_Survey_Title")}</div>
				<div>{t("lbl_Survey_Hint1")}</div>
				<form className="survey-input" onSubmit={onSubmit}>
					<fieldset>
						<textarea
							placeholder={t("lbl_Survey_Phd_Content") ?? ""}
							name="content"
							value={surveyForm.content}
							onChange={e => handleInputChange(e)}
						/>
					</fieldset>
					<fieldset>
						<input
							type="text"
							name="contactInfo"
							placeholder={t("lbl_Survey_Phd_Contact") ?? ""}
							value={surveyForm.contactInfo}
							onChange={e => handleInputChange(e)}
						/>
					</fieldset>
					<fieldset className="survey-btn">
						<button type="submit">{t("lbl_Submit")}</button>
						<button type="button" onClick={onCancelForm}>
							{t("lbl_Cancel")}
						</button>
					</fieldset>
				</form>
			</div>
			<div
				className={classNames("survey-after", {
					close: !isSubmit
				})}>
				<div>
					<img
						src={`${bannerMediaUrl}/h5/img/4.0/thankyou.png`}
						alt="thankyou"
					/>
					<div>{t("lbl_Thankyou")}</div>
				</div>
				<div>{t("lbl_Survey_Hint2")}</div>
			</div>
		</>
	);
};

export default Survey;
