import React, { useContext } from "react";
import { userInfoContext, i18nContext } from "../common/context";
import oneGameImg from "../../styles/img/onegame/bg.jpg";
import QRCode from "../../styles/img/onegame/qr.png";
import { productList } from "../../datas/productList";
import ButtonWithCopyBtn from "../common/btnWithCopyBtn";
import { useGotoGame } from "../hook/useGotoGame";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { data } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		tpId: productList.oneGame.tpId
	});

	const clickDownload = () => {
		const downloadLink = "http://interdownload.info/download/OneGaming.apk";
		return typeof window !== "undefined" ? window.open(downloadLink) : null;
	};

	return (
		<>
			<img src={oneGameImg} className="banner" alt="one game" />
			<div className="inputBox filterBtn kissinfo">
				<div>{i18n.lbl_Username.toUpperCase()}</div>
				<ButtonWithCopyBtn value={data?.account} />
				<div>{i18n.lbl_Password.toUpperCase()}</div>
				<ButtonWithCopyBtn value={data?.password} />
			</div>
			<div className="btn-group">
				<button
					className="orange icon icon-android"
					onClick={clickDownload}>
					{i18n.lbl_DownloadApp.toUpperCase()}
				</button>
			</div>
			<div className="kisstitle">
				{`${i18n.lbl_ScanQRCode} (Android)`}
			</div>
			<div className="onegameQR">
				<img src={QRCode} alt="one game QR code" />
			</div>
		</>
	);
};
