import React, {
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef
} from "react";
import { defGameInfo } from "../../datas/productList";
import { popBoxContext, i18nContext, userInfoContext } from "../common/context";
import api from "../../service/api";

export const defOpenType = {
	_blank: "_blank",
	_self: "_self"
};

export const defSpecialSetting = {
	playTech: defGameInfo.Casino_PlayTech.tpId,
	sports_9w: defGameInfo.nineW.tpId,
	PG: defGameInfo.Casino_PG.tpId
};

export const defLoginGameType = {
	returlGameUrl: 1,
	returnHtml: 2
};

export const open9wSports = ({ url, key, userId }) => {
	const windowName = "9wSports";
	const form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", url);
	form.setAttribute("target", windowName);
	const addInput = ({ name, value }) => {
		const hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", name);
		hiddenField.setAttribute("value", value);
		form.appendChild(hiddenField);
	};

	addInput({ name: "userId", value: userId });
	addInput({ name: "key", value: decodeURIComponent(key) });
	document.body.appendChild(form);
	window.open(
		"",
		windowName,
		"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
	);
	form.submit();
	form.remove();
};

const playTechLaunchGame = (client, game, mode, openType) => {
	try {
		iapiConf.clientUrl_ngm_desktop =
			"https://cachedownload-am.htsp123.com/ngmdesktop/casinoclient.html";
		iapiConf.clientUrl_ngm_mobile =
			"https://games-am.htsp123.com/casinomobile/casinoclient.html";
		iapiConf.clientUrl_live_desk =
			"https://cachedownload-am.htsp123.com/live/html5/desktop/";
		iapiConf.clientUrl_live_mob =
			"https://cachedownload-am.htsp123.com/live/html5/mobile/";
	} catch (error) {}

	iapiLaunchClient(client, game, mode, openType);
};

const launchGame = ({
	client,
	mode,
	game,
	lang,
	openType = defOpenType._blank
}) => {
	const real = mode === "real" ? 1 : 0;
	// Optional Variables
	const lobbyUrl = "";
	const logoutUrl = "";
	const supportUrl = "";
	const depositUrl = "";

	// Slots,Table Games and other non-live games
	if (client === "ngm_desktop" || client === "ngm_mobile") {
		iapiSetClientParams(
			client,
			`language=${lang}&real=${real}&lobby=${lobbyUrl}&logout=${logoutUrl}&deposit=${depositUrl}&support=${supportUrl}&backurl=${lobbyUrl}`
		);
		playTechLaunchGame(client, game, mode, openType);
	}

	// Live Games
	if (client === "live_desk" || client === "live_mob") {
		iapiSetClientParams(
			client,
			`&launch_alias=${game}&language=${lang}&real=${real}&lobby=${lobbyUrl}&logout=${logoutUrl}&deposit=${depositUrl}&support=${supportUrl}`
		);
		playTechLaunchGame(client, null, mode, openType);
	}
};

const launchGameWithFunMode = ({
	client,
	game,
	lang,
	mode,
	openType = defOpenType._blank
}) => {
	if (client === "ngm_desktop" || client === "ngm_mobile") {
		iapiSetClientParams(client, `language=${lang}&real=0`);
		playTechLaunchGame(client, game, mode, openType);
	}
};

export const useGotoGame = ({
	isLogin,
	langId,
	tpId,
	gameId,
	isFun = false,
	autoGetData = true,
	tpGameType: _tpGameType = null,
	allowBeforeLogin = false
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo: { userName } = {} } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const [data, setData] = useState({ account: "", password: "" });

	const ClickClose = () => {
		setPopBox(() => ({
			isOpen: false
		}));
	};

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;

		if (
			!(isLogin === false && allowBeforeLogin) &&
			autoGetData &&
			isLogin
		) {
			handleGoToGame({
				isLogin,
				langId,
				tpId,
				gameId,
				isFun,
				tpGameType: _tpGameType
			});
		}

		return () => {
			isMountedRef.current = false;
		};
	}, [autoGetData, isLogin, langId, _tpGameType]);

	const handleGoToGame = useCallback(
		async ({
			isLogin: _isLogin = true,
			langId: _langId,
			tpId: _tpId,
			gameId: _gameId,
			isFun: _isFun,
			token,
			openType = defOpenType._blank,
			tpGameType,
			loginGameType
		}) => {
			let returnData = "";
			if (_isLogin) {
				try {
					const res = await api.tp.GotoGame({
						TpId: _tpId,
						LangId: _langId,
						gameId: _gameId,
						fun: _isFun ? "1" : "0",
						gameType:
							_tpId === defSpecialSetting.playTech ? "slots" : "",
						AppType:
							_tpId === defSpecialSetting.playTech
								? api.tp.defGotoGame_AppType.Mobile
								: api.tp.defGotoGame_AppType.NativeAPP,
						token: token ?? "",
						tpGameType: String(tpGameType),
						loginGameType: loginGameType
							? String(loginGameType)
							: ""
					});
					await api.frontEndLog.LogMessage({
						userName,
						apiPath: "api/FrontEndLog/LogMessage",
						logBody: "",
						logLevel: "info",
						step: "await api GotoGame"
					});
					if (isMountedRef.current) {
						if (res.data.errorCode === 0 && res.data.message) {
							const result = res.data.message;
							setData(() => result);
							if (_tpId === defSpecialSetting.playTech) {
								const {
									account: username,
									password,
									lang,
									mode
								} = result;

								await iapiSetCallout("Login", response => {
									if (response.errorCode) {
										if (
											response.errorCode === 48 ||
											response.errorCode === "48"
										) {
											setPopBox({
												isOpen: true,
												content: `[${response.errorCode}] Login failed, error: ${response.errorCode} ,playerMessage: ${response.actions.PlayerActionShowMessage[0].message}`,
												hasBtn: true,
												btnBar: (
													<div className="btn-group">
														<button
															className="blue"
															onClick={
																ClickClose
															}>
															OK
														</button>
													</div>
												)
											});
										} else {
											setPopBox({
												isOpen: true,
												content: `[${response.errorCode}] Login failed, error: ${response.errorCode} ,playerMessage: ${response.playerMessage}`,
												hasBtn: true,
												btnBar: (
													<div className="btn-group">
														<button
															className="blue"
															onClick={
																ClickClose
															}>
															OK
														</button>
													</div>
												)
											});
										}
									} else {
										launchGame({ ...result, openType });
									}
								});

								if (mode === "real") {
									iapiSetClientType("casino");
									iapiSetClientPlatform("web");
									iapiLogin(username, password, 1, lang);
								} else {
									launchGameWithFunMode({
										...result,
										openType
									});
								}
							} else if (_tpId === defSpecialSetting.sports_9w) {
								returnData = JSON.parse(result);
							} else if (
								loginGameType === defLoginGameType.returnHtml
							) {
								const newWindow = window.open();
								newWindow.document.write(res.data.message);
							} else {
								window.open(res.data.message);
							}
							await api.frontEndLog.LogMessage({
								userName,
								apiPath: "api/FrontEndLog/LogMessage",
								logBody: "",
								logLevel: "info",
								step:
									"res.data.errorCode === 0 && res.data.message"
							});
						} else if (
							res.data.errorCode === 3000 &&
							res.data.message
						) {
							window.open(
								res.data.message,
								"Under Maintenance",
								"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
							);
							await api.frontEndLog.LogMessage({
								userName,
								apiPath: "api/FrontEndLog/LogMessage",
								logBody: "",
								logLevel: "info",
								step:
									"res.data.errorCode === 3000 && res.data.message"
							});
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
							await api.frontEndLog.LogMessage({
								userName,
								apiPath: "api/FrontEndLog/LogMessage",
								logBody: "",
								logLevel: "info",
								step: "done"
							});
						}
					}
				} catch (error) {
					api.frontEndLog.LogMessage({
						userName,
						apiPath: "api/FrontEndLog/LogMessage",
						logBody: error.message,
						logLevel: "error",
						step: ""
					});
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			}
			return returnData;
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[gameId, isFun, isLogin, langId, tpId, i18n]
	);

	return { data, handleGoToGame };
};
