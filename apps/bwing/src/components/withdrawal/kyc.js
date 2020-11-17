import React, { useContext, useState, useEffect, useRef } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import { api_UploadCustPhotoId } from "../../service/api/accountStrict";
import { api_GetCustBankInfo } from "../../service/api/account";
import { api_KycCheck } from "../../service/api/payment";
import { Redirect } from "@reach/router";
import path from "../../path";
import Loading from "../common/loading";

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
		return () => (isMountedRef.current = false);
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
				let result = await api_GetCustBankInfo().then(res => {
					let hasBankInfo = false;
					if (res.data.errorCode === 0) {
						if (res.data.data?.bankInfoDetail) {
							hasBankInfo = true;
						} else if (isMountedRef.current) {
							setRedirectPath(`/${path.withdrawal.root}`);
						}
					}
					return hasBankInfo;
				});

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
						err => {
							if (isMountedRef.current) {
								setLoading(false);
							}
						}
					);
				}
			});
		}
	}, [userInfo.isLogin]);

	const onChangeUpload = e => {
		let newFile = e.target.files[0];
		setFile(newFile);
	};

	const onUploadFile = () => {
		setLoading(true);

		if (file !== null && !processing) {
			setProcessing(true);
			let formData = new FormData();
			formData.append("PhotoId", file);
			api_UploadCustPhotoId(formData).then(
				response => {
					if (isMountedRef.current) {
						let res = response.data;
						if (res.errorCode === 0) {
							setRedirectPath(`/${path.kycWaiting.root}`);
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
		} else {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_SubmitPhotoIdHint
			});
			setLoading(false);
		}
	};

	return redirectPath !== null ? (
		<Redirect to={redirectPath} noThrow />
	) : loading ? (
		<Loading />
	) : (
		<section className="withdrawalBox">
			<div>{i18n.lbl_KycHint}</div>
			<div className="subModuleList">
				<div className="subModule">
					<div className="subModuleBody column">
						<span className="title text-org">
							{i18n.lbl_SubmitPhotoId}
						</span>
						<div className="txt-lightgray">
							<ul>
								<li>{i18n.lbl_KYCSubmitHint}</li>
								<li>
									{`${i18n.lbl_ImageUploadWarning} ${i18n.lbl_ImageJpgPngOnly}`}
								</li>
							</ul>
						</div>
						<div className="uploadBox">
							<label className="upload_img">
								<input
									type="file"
									accept="image/*"
									onChange={onChangeUpload}
								/>

								{!file ? (
									<i className="icon icon-cloud_upload"></i>
								) : null}
								{`${file ? file.name : i18n.msg_SelectFile}`}
							</label>
							<div className="directions">
								<ul>
									<li>{i18n.lbl_NationalIdentityCard}</li>
									<li>{i18n.lbl_Passport}</li>
									<li>{i18n.lbl_DrivingLicense}</li>
									<li>{i18n.lbl_BirthCertificate}</li>
								</ul>
							</div>
						</div>
						<div className="btn-group">
							<button className="submit" onClick={onUploadFile}>
								{i18n.lbl_Submit}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
