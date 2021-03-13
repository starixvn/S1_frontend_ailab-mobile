import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "Context";
import { useNavigate } from "@reach/router";
import path from "Path";
import Loading from "../common/loading";
import api from "../../service/api";

export default () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [file, setFile] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current && userInfo.isLogin === false) {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.isLogin, navigate, userInfo.langId]);

	useEffect(() => {
		if (userInfo.isLogin) {
			const CheckBankInfo = async () => {
				const result = await api.account.GetCustBankInfo().then(res => {
					let hasBankInfo = false;
					if (res.data.errorCode === 0) {
						if (res.data.data?.bankInfoDetail) {
							hasBankInfo = true;
						} else if (isMountedRef.current) {
							navigate(
								`/${userInfo.langId}/${path.withdrawal.root}`
							);
						}
					}
					return hasBankInfo;
				});

				return result;
			};

			CheckBankInfo().then(hasBankInfo => {
				if (hasBankInfo) {
					api.payment.KycCheck().then(
						res => {
							if (isMountedRef.current) {
								if (res.data.errorCode === 2) {
									navigate(
										`/${userInfo.langId}/${path.kycWaiting.root}`
									);
								} else if (res.data.errorCode !== 1) {
									navigate(
										`/${userInfo.langId}/${path.withdrawal.root}`
									);
								}
								setLoading(false);
							}
						},
						() => {
							if (isMountedRef.current) {
								setLoading(false);
							}
						}
					);
				}
			});
		}
	}, [userInfo.isLogin, navigate, userInfo.langId]);

	const onChangeUpload = e => {
		const newFile = e.target.files[0];
		setFile(newFile);
	};

	const onUploadFile = () => {
		setLoading(true);

		if (file !== null && !processing) {
			setProcessing(true);
			const formData = new FormData();
			formData.append("PhotoId", file);
			api.accountStrict.UploadCustPhotoId(formData).then(
				response => {
					if (isMountedRef.current) {
						const res = response.data;
						if (res.errorCode === 0) {
							navigate(
								`/${userInfo.langId}/${path.kycWaiting.root}`
							);
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.message
							});
						}
						setProcessing(false);
						setLoading(false);
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
						setLoading(false);
					}
				}
			);
		}
	};

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="step">
				<div className="stepLine">
					<div />
				</div>
				<div className="circle">
					<div>
						<div className="icon icon-checkmark" />
					</div>
				</div>
				<div className="circle">
					<div>
						<div>2</div>
					</div>
				</div>
			</div>
			<span className="text-org">{i18n.lbl_SubmitPhotoIdHint}</span>
			<div className="btn-group">
				<label className="fileUpload">
					<input
						type="file"
						accept="image/*"
						onChange={onChangeUpload}
					/>
					<i className="icon icon-folder-upload" />{" "}
					{`${file ? file.name : i18n.msg_SelectFile}`}
				</label>
				<button className="orange" onClick={onUploadFile}>
					{i18n.lbl_UploadPhotoId}
				</button>
			</div>
			<span className="text">{i18n.lbl_KYCSubmitHint}</span>
			<div className="text">
				<ul>
					<li>{i18n.lbl_NationalIdentityCard}</li>
					<li>{i18n.lbl_Passport}</li>
					<li>{i18n.lbl_DrivingLicense}</li>
				</ul>
			</div>
		</>
	);
};
