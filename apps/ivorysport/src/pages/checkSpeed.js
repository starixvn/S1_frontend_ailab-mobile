import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
	i18nContext,
	userInfoContext,
	popBoxContext
} from "../components/common/context";
import api from "../service/api";
import { siteInfo, cloudBannerImgURL } from "../config";
import path from "../path";

const getVerifyAPIUrl = url => {
	let tmpUrl = url;

	if (/^http|https/.test(url)) {
		if (url.split(".").length >= 3) {
			tmpUrl = url.replace("://www.", "://m.");
		} else {
			tmpUrl = url.replace("://", "://m.");
		}
	} else if (/^www./.test(url)) {
		tmpUrl = url.replace(/^www./, "m.");
	} else if (/^(?!m.)/.test(url)) {
		tmpUrl = `m.${url}`;
	}

	return `${tmpUrl}${tmpUrl.slice(-1) === "/" ? "" : "/"}api/speed`;
};

axios.interceptors.request.use(
	config => {
		config.metadata = { startTime: new Date() };
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	response => {
		response.config.metadata.endTime = new Date();
		response.duration =
			response.config.metadata.endTime -
			response.config.metadata.startTime;
		return response;
	},
	error => {
		error.config.metadata.endTime = new Date();
		error.duration =
			error.config.metadata.endTime - error.config.metadata.startTime;
		return Promise.reject(error);
	}
);

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [list, setList] = useState([]);
	const [ip, setIp] = useState("");
	const _GetIp = async () => {
		const { data } = await axios.get("https://api.ipify.org?format=json");
		setIp(data.ip);
	};

	const _GetSupportDomainList = () => {
		setList([]);
		api.site
			.GetSupportDomainList({ langId: userInfo.langId })
			.then(async res => {
				if (res.data.errorCode === 0) {
					res.data.data.forEach(el => {
						checkURL(el.domainName);
					});
				} else {
					setPopBox({
						isOpen: true,
						content: `[${res.data.errorCode}] ${res.data.message}`
					});
				}
			})
			.catch(() => {
				setPopBox({
					isOpen: true,
					content: i18n.msg_ApiServerError
				});
			});
	};
	useEffect(() => {
		_GetSupportDomainList();
		_GetIp();
	}, []);

	const checkURL = async URL => {
		try {
			const { status, duration } = await axios.head(getVerifyAPIUrl(URL));

			if (status === 200) {
				setList(prev => {
					const fails = [];
					prev.forEach(el => {
						if (el.available === false) fails.push(el);
					});

					const arr = prev.filter(el => el.available === true);
					arr.push({
						domainName: URL,
						available: true,
						duration
					});

					return [...arr, ...fails];
				});
			} else {
				setList(prev => [
					...prev,
					{ domainName: URL, available: false, duration }
				]);
			}
		} catch (error) {
			setList(prev => [
				...prev,
				{ domainName: URL, available: false, duration: error.duration }
			]);
		}
	};

	const setHome = url => {
		if (document.body.setHomePage) {
			document.body.style.behavior = "url(#default#homepage)";
			document.body.setHomePage(url);
		} else {
			alert(`${i18n.lbl_AddFavoriteTip} ${url} ${i18n.lbl_ClickOk}`);
		}
	};

	const addFavorite = (title, url) => {
		try {
			window.external.addFavorite(url, title);
		} catch (err) {
			try {
				window.sidebar.addPanel(title, url, "");
			} catch (e) {
				alert(i18n.lbl_AddFavoriteFail);
			}
		}
	};
	return (
		<div className="checkspeed">
			<div className="wallpaper">
				<nav>
					<ul>
						<li>
							<a href={path.home.root} className="logo">
								<img src={siteInfo("en").logo} alt="logo" />
							</a>
						</li>
						<li>
							<button
								onClick={() =>
									addFavorite(document.title, window.location)
								}>
								{i18n.lbl_AddToFavorite}
							</button>
						</li>
						<li>
							<button onClick={() => setHome(window.location)}>
								{i18n.lbl_SetHomePage}
							</button>
						</li>
					</ul>
				</nav>

				<div className="module">
					<div className="moduleBg" />
					<div className="top">
						<div>
							<div>{i18n.lbl_CurrentIp}</div>
							<div>{ip}</div>
						</div>
						<button>
							<img
								src={`${cloudBannerImgURL}/h5/img/check_speed/start.png`}
								alt="start"
							/>
							<div onClick={_GetSupportDomainList}>
								{i18n.lbl_Refresh}
							</div>
						</button>
					</div>
					<div className="bottom">
						<div className="left">
							<div>{i18n.lbl_DomainListTip}</div>
							<div>
								{list.map(el => (
									<>
										<div key={el.domainName}>
											{el.available ? (
												<img
													src={`${cloudBannerImgURL}/h5/img/check_speed/y.png`}
													alt="V"
												/>
											) : (
												<img
													src={`${cloudBannerImgURL}/h5/img/check_speed/n.png`}
													alt="X"
												/>
											)}

											<div>{el.domainName}</div>

											<a href={el.domainName}>
												{i18n.lbl_EnterWebsite}
											</a>
										</div>
										{el.available && (
											<div
												className="time"
												key={el.duration}>
												{i18n.lbl_ResponseTime} :
												<span>{el.duration}</span>
											</div>
										)}
									</>
								))}
							</div>
						</div>
						<div className="right">
							<div>{i18n.lbl_TipTitle}</div>
							<div>
								<div>{i18n.lbl_StepTitle}</div>
								<ul>
									<li>
										<div>{i18n.lbl_OpenIE}</div>
										<div>{i18n.lbl_OpenIESteps}</div>
									</li>
									<li>
										<div>{i18n.lbl_Tip1}</div>
										<div>{i18n.lbl_Tip2}</div>
									</li>
									<li>
										<div>{i18n.lbl_Tip3}</div>
										<div>{i18n.lbl_Tip4}</div>
									</li>
								</ul>
								<button>{i18n.lbl_ClearCache}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
