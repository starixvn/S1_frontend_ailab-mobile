/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode.react";
import api from "../../service/api";
import path from "../../path";

const currentLocation = window.location.origin;

export default ({ isLogin, i18n, setPopBox }) => {
	const [referralCode, setReferralCode] = useState("");
	const isMountedRef = useRef(null);

	const refLink = `${currentLocation}/${path.join.root}/?AffId=${referralCode}`;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isLogin === true && isMountedRef.current) {
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
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
		}
	}, [isLogin, i18n, setPopBox]);

	const copyText = colName => {
		if (colName === "copyToClipboard") {
			const virtualInput = document.createElement("input");
			virtualInput.value = i18n.lbl_Referral_Welcome;
			document.body.appendChild(virtualInput);
			virtualInput.select();
			document.execCommand("copy");
			document.body.removeChild(virtualInput);
		} else {
			const copyCol = document.getElementById(colName);
			window.getSelection().selectAllChildren(copyCol);
			document.execCommand("Copy");
		}
	};

	const clickDownload = () => {
		const canvas = document.getElementById("refQRcode");
		const imgUrl = canvas.toDataURL("image/png", "image/octet-stream");

		setPopBox({
			isOpen: true,
			title: `${i18n.lbl_Referral_code}: ${referralCode}`,
			content: <img src={imgUrl} alt={referralCode} />
		});

		// let downloadLink = document.createElement("a");
		// downloadLink.href = imgUrl;
		// downloadLink.download = "refImage.png";
		// document.body.appendChild(downloadLink);
		// downloadLink.click();
		// document.body.removeChild(downloadLink);
	};

	return (
		<div className="refLink">
			<div className="title">{i18n.lbl_Your_link_invite}</div>
			<div className="refBox">
				<div>{i18n.lbl_Referral_link}:</div>
				<div className="text-org" id="referralLink">
					{refLink}
					<button
						className="icon icon-files-empty"
						onClick={copyText.bind(this, "referralLink")}
					/>
				</div>

				<div className="refMedia">
					<a
						className="icon icon-files-empty"
						onClick={copyText.bind(this, "copyToClipboard")}>
						{i18n.lbl_Copy_to_clipboard}
					</a>
					<a className="icon icon-qrcode" onClick={clickDownload}>
						QR Code
					</a>
					<MediaLinks refLink={refLink} i18n={i18n} />
				</div>
				<QRCode
					id="refQRcode"
					value={refLink}
					style={{ display: "none" }}
				/>
			</div>
		</div>
	);
};

const MediaLinks = ({ refLink, i18n }) => {
	const socialLink = ({ socialMedia }) => {
		const links = {
			fb: `https://www.facebook.com/sharer/sharer.php?u=${refLink}&quote=${i18n.lbl_Referral_Welcome}`,
			whatsapp: `https://wa.me/?text=${i18n.lbl_Referral_Welcome} ${refLink}`,
			line: `http://line.naver.jp/R/msg/text/?${i18n.lbl_Referral_Welcome}%0D%0A${refLink}`,
			telegram: `https://t.me/share/url?url=${refLink}&text=${i18n.lbl_Referral_Welcome}`
		};

		return links[socialMedia];
	};

	return (
		<>
			<a
				className="icon icon-facebook2"
				target="_blank"
				rel="noreferrer"
				href={socialLink({ socialMedia: "fb" })}>
				Facebook
			</a>
			<a
				className="icon icon-whatsapp"
				target="_blank"
				rel="noreferrer"
				href={socialLink({ socialMedia: "whatsapp" })}>
				Whatsapp
			</a>
			<a
				className="icon icon-line"
				target="_blank"
				rel="noreferrer"
				href={socialLink({ socialMedia: "line" })}>
				Line
			</a>
			<a
				className="icon icon-telegram"
				target="_blank"
				rel="noreferrer"
				href={socialLink({ socialMedia: "telegram" })}>
				Telegram
			</a>
		</>
	);
};
