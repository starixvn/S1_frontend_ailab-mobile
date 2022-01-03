import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect } from "@reach/router";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_UploadCustPhotoId } from "../../service/api/accountStrict";
import { api_GetCustBankInfo } from "../../service/api/account";
import { api_KycCheck } from "../../service/api/payment";
import path from "../../path";
import Loading from "../common/loading";
import Layout from "../common/layout";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [redirectPath, setRedirectPath] = useState(null);
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
		if (isMountedRef.current && redirectPath !== null) {
			setRedirectPath(null);
		}
	}, [redirectPath]);

	useEffect(() => {
		if (isMountedRef.current && userInfo.isLogin === false) {
			setRedirectPath("/");
		}
	}, [userInfo.isLogin, setRedirectPath]);

	useEffect(() => {
		if (userInfo.isLogin) {
			const CheckBankInfo = async () => {
				const result = await api_GetCustBankInfo().then(
					res => {
						let hasBankInfo = false;
						if (res.data.errorCode === 0) {
							if (res.data.data?.bankInfoDetail?.length) {
								hasBankInfo = true;
							} else if (isMountedRef.current) {
								setRedirectPath(`/${path.withdrawal.root}`);
							}
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
						return hasBankInfo;
					},
					() => {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				);

				return result;
			};

			CheckBankInfo().then(hasBankInfo => {
				if (hasBankInfo) {
					api_KycCheck().then(
						res => {
							if (isMountedRef.current) {
								if (res.data.errorCode === 2) {
									setRedirectPath(`/${path.kycWaiting.root}`);
								} else if (res.data.errorCode !== 1) {
									setRedirectPath(`/${path.withdrawal.root}`);
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
				}
			});
		}
	}, [userInfo.isLogin]);

	const onChangeUpload = e => {
		const newFile = e.target.files[0];
		setFile(newFile);
	};

	const onUploadFile = () => {
		if (file !== null && !processing) {
			setLoading(true);
			setProcessing(true);
			const formData = new FormData();
			formData.append("PhotoId", file);
			api_UploadCustPhotoId(formData).then(
				response => {
					if (isMountedRef.current) {
						const res = response.data;
						if (res.errorCode === 0) {
							setRedirectPath(`/${path.kycWaiting.root}`);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.errorCode}] ${res.message}`
							});
						}
						setProcessing(false);
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
						setLoading(false);
					}
				}
			);
		}
	};

	if (redirectPath !== null) return <Redirect to={redirectPath} noThrow />;

	if (loading) return <Loading />;

	return (
		<Layout title={i18n.lbl_SubmitPhotoId} mainClass="main kyc">
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
		</Layout>
	);
};
