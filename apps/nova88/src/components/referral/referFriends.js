/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useContext, useRef } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import stepImg from "../../styles/img/refbanner.png";
import ReacentDatas from "./referral.recentDatas";
import MediaLinks, { text_welCome } from "./links";
import api from "../../service/api";
import path from "../../path";
import QRCode from "qrcode.react";
import TandC from "../../service/t_and_c";

const currentLocation = window.location.origin;

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [referralCode, setReferralCode] = useState("");
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		api.account.GetReferralCode().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setReferralCode(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	}, []);

	const refLink = `${currentLocation}/${path.join.root}/?AffId=${referralCode}`;
	// const refLink = `m.nova88.net/${path.join.root}/?AffId=${referralCode}`;

	const copyText = colName => {
		if (colName === "copyToClipboard") {
			let virtualInput = document.createElement("input");
			virtualInput.value = text_welCome;
			document.body.appendChild(virtualInput);
			virtualInput.select();
			document.execCommand("copy");
			document.body.removeChild(virtualInput);
		} else {
			let copyCol = document.getElementById(colName);
			window.getSelection().selectAllChildren(copyCol);
			document.execCommand("Copy");
		}
	};

	const clickDownload = () => {
		const canvas = document.getElementById("refQRcode");
		const imgUrl = canvas.toDataURL("image/png", "image/octet-stream");
		let downloadLink = document.createElement("a");
		downloadLink.href = imgUrl;
		downloadLink.download = "refImage.png";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	return (
		<>
			<img
				className="refbanner"
				src={stepImg}
				alt="referral step banner"
			/>
			<div className="refShare">
				<div className="title">{i18n.lbl_Share_with_friend}</div>
				<div className="refBox">
					<div className="open">
						<div>
							{i18n.lbl_Bonus} <span>MYR 88</span>
						</div>
						<div>
							{i18n.lbl_ValidBet} <span>8x</span>
						</div>
						<div>
							{i18n.lbl_Deposit} <span>888</span>
						</div>
						<a href={TandC(userInfo.langId).Referral}>
							{i18n.lbl_Details}
						</a>
					</div>
				</div>
			</div>
			<div className="refLink">
				<div className="title">{i18n.lbl_Your_link_invite}</div>
				<div className="refBox">
					<div>{i18n.lbl_Referral_code}:</div>
					<div className="text-org" id="referralCode">
						{referralCode}
						<button
							className="icon icon-files-empty"
							onClick={copyText.bind(
								this,
								"referralCode"
							)}></button>
					</div>
					<div>{i18n.lbl_Referral_link}:</div>
					<div className="text-org" id="referralLink">
						{refLink}
						<button
							className="icon icon-files-empty"
							onClick={copyText.bind(
								this,
								"referralLink"
							)}></button>
					</div>

					<div className="refMedia">
						<a
							className="icon icon-files-empty"
							onClick={copyText.bind(this, "copyToClipboard")}>
							{i18n.lbl_Copy_to_clipboard}
						</a>
						<a
							className="icon icon-download2"
							onClick={clickDownload}>
							{i18n.lbl_Downloads}
						</a>
						<MediaLinks
							refLink={refLink}
							langId={userInfo.langId}
						/>
					</div>
					<QRCode id="refQRcode" value={refLink} />
				</div>
			</div>

			{/* <ReacentDatas /> */}
		</>
	);
};
