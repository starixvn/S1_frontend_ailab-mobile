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
	const isMountedRef = useRef(null);
	const {
		userInfo: { isLogin }
	} = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();
	// 控制顯示頁面
	const [isSubmitted, setIsSubmitted] = useState(false);
	// 是否正在submit，避免連點重複呼叫
	const [isSubmitting, setIsSubmitting] = useState(false);
	// 是否符合表單驗證規則
	const [isValid, setIsValid] = useState(false);
	// 是否有點選輸入過欄位
	const [isDirty, setIsDirty] = useState(false);
	// 表單控制
	const [surveyForm, setSurveyForm] = useState(initStatus);
	// 表單tip控制
	const [surveyFormTip, setSurveyFormTip] = useState(initStatus);

	const EMAIL_OR_PHONE_REGEX = /^((\+84)?[0-9]{9,}|(\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+))$/;
	const formValidateRules = {
		content: {
			required: {
				value: true,
				message: t("lbl_Survey_Req_Content")
			}
		},
		contactInfo: {
			pattern: {
				value: EMAIL_OR_PHONE_REGEX,
				message: t("lbl_Survey_Vld_Contact")
			}
		}
	};

	const onSubmit = async e => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const res = await api_survey_Set(surveyForm);
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					setSurveyForm(initStatus);
					setIsSubmitted(true);
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
		} finally {
			setIsSubmitting(false);
		}
	};

	const validateForm = (formValidateRule, value) => {
		const { required, pattern } = formValidateRule;
		if (required && required.value && !value) {
			return required.message;
		}
		if (pattern && pattern.value && value) {
			const regex = pattern.value;
			if (!regex.test(value)) {
				return pattern.message;
			}
		}
		return "";
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setSurveyForm(prev => ({
			...prev,
			[name]: value
		}));
		setIsDirty(true);
	};

	const handleOnBlur = e => {
		const { name, value } = e.target;
		const tipMsg = validateForm(formValidateRules[name], value);
		setSurveyFormTip(prev => ({
			...prev,
			[name]: tipMsg
		}));
	};

	const renderInfoMessage = errMsg => {
		if (errMsg) {
			return (
				<div
					className={classNames("tip active", {
						message: errMsg === t("lbl_Survey_Req_Content")
					})}>
					{errMsg}
				</div>
			);
		}
		return null;
	};

	// 初始化validate，並在每次form有改變時做驗證isValid
	useEffect(() => {
		let valid = true;
		for (const key of ["content", "contactInfo"]) {
			if (validateForm(formValidateRules[key], surveyForm[key])) {
				valid = false;
			}
		}
		setIsValid(valid);
	}, [surveyForm, formValidateRules, validateForm, setIsValid]);

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
					close: isSubmitted
				})}>
				<div>{t("lbl_Survey_Title")}</div>
				<div>{t("lbl_Survey_Hint1")}</div>
				<form className="survey-input" onSubmit={onSubmit}>
					<fieldset
						className={classNames({
							error: !!surveyFormTip.content
						})}>
						<textarea
							name="content"
							placeholder={t("lbl_Survey_Phd_Content") ?? ""}
							value={surveyForm.content}
							maxLength={2000}
							onChange={e => handleInputChange(e)}
							onBlur={e => handleOnBlur(e)}
						/>
						{renderInfoMessage(surveyFormTip.content)}
					</fieldset>
					<fieldset
						className={classNames({
							error: !!surveyFormTip.contactInfo
						})}>
						<input
							type="text"
							name="contactInfo"
							placeholder={t("lbl_Survey_Phd_Contact") ?? ""}
							value={surveyForm.contactInfo}
							onChange={e => handleInputChange(e)}
							onBlur={e => handleOnBlur(e)}
						/>
						{renderInfoMessage(surveyFormTip.contactInfo)}
					</fieldset>
					<fieldset className="survey-btn">
						<button
							type="submit"
							disabled={!isValid || !isDirty || isSubmitting}>
							{t("lbl_Submit")}
						</button>
						<button type="button" onClick={() => navigate(-1)}>
							{t("lbl_Cancel")}
						</button>
					</fieldset>
				</form>
			</div>
			<div
				className={classNames("survey-after", {
					close: !isSubmitted
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
