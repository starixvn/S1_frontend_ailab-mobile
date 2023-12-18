import React, {
	useContext,
	useEffect,
	useState,
	createRef,
	lazy,
	Suspense
} from "react";
import { products } from "@ailab-mobile/common";
import { popBoxContext, userInfoContext, i18nContext } from "../common/context";
import api from "../../service/api";
import AppDownload from "./appDownload";
import { cloudBannerImgURL } from "../../config";

const useGotoGame = ({ isLogin, langId, tpId }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [data, setData] = useState({ account: "", password: "" });

	useEffect(() => {
		let mounted = true;
		if (isLogin) {
			api.tp
				.GotoGame({
					TpId: tpId,
					LangId: langId
				})
				.then(
					res => {
						if (
							res.data.errorCode === 0 &&
							mounted &&
							res.data.message
						) {
							setData(() => JSON.parse(res.data.message));
						} else if (res.data.errorCode !== 0) {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					},
					() => {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				);
		}

		return () => {
			mounted = false;
		};
	}, [isLogin, langId, tpId]);

	return { data };
};

const GetImageContent = ({ langId }) => {
	let InstallGuide = null;
	if (langId === "cs") {
		InstallGuide = lazy(() => import("./installGuide.cs"));
	} else if (langId === "th") {
		InstallGuide = lazy(() => import("./installGuide.th"));
	} else {
		InstallGuide = lazy(() => import("./installGuide.en"));
	}

	return { InstallGuide };
};

const Kiss918 = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { data } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		tpId: products.Kiss918.tpId
	});
	const { InstallGuide } = GetImageContent(userInfo);
	const [downloadColOpen, setDownloadColOpen] = useState(false);
	const openDownloadCol = () => {
		setDownloadColOpen(prev => !prev);
	};

	return (
		<section>
			<div className="banner">
				<img
					src={`${cloudBannerImgURL}/h5/img/918/banner.jpg`}
					alt="918 kiss banner"
				/>
			</div>

			<div className="copyinfo">
				<div>{i18n.lbl_Username}</div>
				<ButtonWithCopyBtn value={data?.account} />
				<div> {i18n.lbl_Password}</div>
				<ButtonWithCopyBtn value={data?.password} />
			</div>

			<div className="downloadModule">
				<div className="title">{i18n.lbl_918KissMobileApp}</div>
				<div className="btn-group" onClick={openDownloadCol}>
					<button>{i18n.lbl_Download.toUpperCase()}</button>
				</div>
				<div
					className={`downloadSelect${
						downloadColOpen ? " active" : ""
					}`}>
					<AppDownload i18n={i18n} />
				</div>
			</div>

			<Suspense fallback={<div />}>
				<InstallGuide />
			</Suspense>
		</section>
	);
};

const ButtonWithCopyBtn = ({ value = "" }) => {
	const ipt = createRef();
	const OnCopy = () => {
		ipt.current.select();
		document.execCommand("copy");
	};
	return (
		<div className="infoModule parts">
			<div className="inputBox">
				<input readOnly={true} defaultValue={value} ref={ipt} />
			</div>
			<div className="btn-group">
				<button
					className="icon icon-files-empty"
					value={value}
					onClick={OnCopy}
				/>
			</div>
		</div>
	);
};

export default Kiss918;
