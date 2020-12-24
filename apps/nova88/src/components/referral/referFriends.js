import React, { useEffect, useState, useContext, useRef } from "react";
import { i18nContext } from "../common/context";
import stepImg from "../../styles/img/refbanner.png";
import ReacentDatas from "./referral.recentDatas";
import MediaLinks, { text_welCome } from "./links";

const fakeData = {
	referralCode: "xxxReferralCodexxxxxx",
	refId: "xxx"
};

const currentLocation = window.location.hostname;

export default () => {
	const { i18n } = useContext(i18nContext);
	const [data, setData] = useState(fakeData);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

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
							FREE <span>MYR 88</span>
						</div>
						<div>
							Turn <span>8x</span>
						</div>
						<div>
							Deposit <span>888</span>
						</div>
						<a>More Details</a>
					</div>
					<div>
						<div>
							FREE <span>MYR 88</span>
						</div>
						<div>
							Turn <span>8x</span>
						</div>
						<div>
							Deposit <span>888</span>
						</div>
						<a>More Details</a>
					</div>
					<div>
						<div>
							FREE <span>MYR 88</span>
						</div>
						<div>
							Turn <span>8x</span>
						</div>
						<div>
							Deposit <span>888</span>
						</div>
						<a>More Details</a>
					</div>
				</div>
			</div>
			<div className="refLink">
				<div className="title">{i18n.lbl_Your_link_invite}</div>
				<div className="refBox">
					<div>Referral Code:</div>
					<div className="text-org" id="referralCode">
						{data.referralCode}
						<button
							className="icon icon-files-empty"
							onClick={copyText.bind(
								this,
								"referralCode"
							)}></button>
					</div>
					<div>Referral Link:</div>
					<div className="text-org" id="referralLink">
						{`${currentLocation}/?refid=${fakeData.refId}`}
						{/* https://www.nova88.net/?refid=xxxx */}
						<button
							className="icon icon-files-empty"
							onClick={copyText.bind(
								this,
								"referralLink"
							)}></button>
					</div>

					<div className="refMedia">
						<button
							className="icon icon-files-empty"
							onClick={copyText.bind(this, "copyToClipboard")}>
							{i18n.lbl_Copy_to_clipboard}
						</button>
						<a className="icon icon-download2">QRCode</a>
						<MediaLinks />
					</div>
				</div>
			</div>

			<ReacentDatas />
		</>
	);
};

// const
