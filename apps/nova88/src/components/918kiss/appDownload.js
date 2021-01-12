import React from "react";

const APPDownloadLink = {
	Android:
		"https://s3-ap-southeast-1.amazonaws.com/app918kiss/apk/918Kiss.apk",
	IOS:
		"itms-services://?action=download-manifest&url=itms-services://?action=download-manifest&url=https://s3-ap-southeast-1.amazonaws.com/app918kiss/ios/918Kiss.plist",
	IOS32:
		"itms-services://?action=download-manifest&url=itms-services://?action=download-manifest&url=https://s3-ap-southeast-1.amazonaws.com/app918kiss/ios32/918Kiss.plist"
};

const DownloadAPP = ({ i18n = {} }) => {
	const OnClick = e => {
		return typeof window !== "undefined"
			? window.open(e.target.value)
			: null;
	};
	return (
		<div className="kissdoanload open">
			<div>
				<div className="icon icon-android" />
				<div className="title">Android</div>
				<div className="sysName">918Kiss android</div>
				<div className="btn-group">
					<button
						className="orange"
						value={APPDownloadLink.Android}
						onClick={OnClick}>
						{i18n.lbl_Download.toUpperCase()}
					</button>
				</div>
			</div>
			<div>
				<div className="icon icon-appleinc" />
				<div className="title">IOS</div>
				<div className="sysName">Iphone 5s+</div>
				<div className="btn-group">
					<button
						className="orange"
						value={APPDownloadLink.IOS}
						onClick={OnClick}>
						{i18n.lbl_Download.toUpperCase()}
					</button>
				</div>
			</div>
			<div>
				<div className="icon icon-appleinc" />
				<div className="title">IOS</div>
				<div className="sysName">Iphone 5-</div>
				<div className="btn-group">
					<button
						className="orange"
						value={APPDownloadLink.IOS32}
						onClick={OnClick}>
						{i18n.lbl_Download.toUpperCase()}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DownloadAPP;
