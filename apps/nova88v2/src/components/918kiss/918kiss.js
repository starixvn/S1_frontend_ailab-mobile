import React, {
	useContext,
	useEffect,
	useState,
	createRef,
	lazy,
	Suspense
} from "react";
import kiss from "../../styles/img/kiss.jpg";
import { popBoxContext, userInfoContext, i18nContext } from "../common/context";
import api from "../../service/api";
import { productList } from "../../datas/productList";
import AppDownload from "./appDownload";

const useGotoGame = ({ isLogin, langId, tpId }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [data, setData] = useState({ account: "", password: "" });

	const ClickClose = () => {
		setPopBox(() => ({
			isOpen: false
		}));
	};

	useEffect(() => {
		let mounted = true;
		if (isLogin) {
			api.tp
				.GotoGame({
					TpId: tpId,
					LangId: langId
				})
				.then(res => {
					if (
						res.data.errorCode === 0 &&
						mounted &&
						res.data.message
					) {
						setData(() => JSON.parse(res.data.message));
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`,
							hasBtn: true,
							btnBar: (
								<div className="btn-group">
									<button
										className="blue"
										onClick={ClickClose}>
										{i18n.lbl_Cancel}
									</button>
								</div>
							)
						});
					}
				});
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
		tpId: productList.kiss918.tpId
	});
	const { InstallGuide } = GetImageContent(userInfo);

	return (
		<>
			<img src={kiss} alt="918 kiss banner" className="banner" />

			<div className="inputBox filterBtn kissinfo">
				<div>{i18n.lbl_Username}</div>
				<ButtonWithCopyBtn value={data?.account} />
				<div> {i18n.lbl_Password}</div>
				<ButtonWithCopyBtn value={data?.password} />
			</div>

			<div className="kisstitle">{i18n.lbl_918KissMobileApp}</div>
			<AppDownload i18n={i18n} />

			<Suspense fallback={<div />}>
				<InstallGuide displayText={i18n.lbl_IOSInstallGuide} />
			</Suspense>
		</>
	);
};

const ButtonWithCopyBtn = ({ value = "" }) => {
	const ipt = createRef();
	const OnCopy = () => {
		ipt.current.select();
		document.execCommand("copy");
	};
	return (
		<div>
			<input readOnly={true} defaultValue={value} ref={ipt} />
			<button
				className="icon icon-files-empty"
				value={value}
				onClick={OnCopy}
			/>
		</div>
	);
};

export default Kiss918;
