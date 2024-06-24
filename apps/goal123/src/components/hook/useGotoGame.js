import React, {
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef
} from "react";
import { isInApp, products } from "@ailab-mobile/common";
import { popBoxContext, i18nContext } from "../common/context";
import { api_tp_GotoGame, defGotoGame_AppType } from "../../service/api/tp";

export const defOpenType = {
	_blank: "_blank",
	_self: "_self"
};

export const defLoginGameType = {
	returlGameUrl: 1,
	returnHtml: 2
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
	const real = mode == "real" ? 1 : 0;
	// Optional Variables
	const lobbyUrl = "";
	const logoutUrl = "";
	const supportUrl = "";
	const depositUrl = "";

	// Slots,Table Games and other non-live games
	if (client == "ngm_desktop" || client == "ngm_mobile") {
		iapiSetClientParams(
			client,
			`language=${lang}&real=${real}&lobby=${lobbyUrl}&logout=${logoutUrl}&deposit=${depositUrl}&support=${supportUrl}&backurl=${lobbyUrl}`
		);
		playTechLaunchGame(client, game, mode, openType);
	}

	// Live Games
	if (client == "live_desk" || client == "live_mob") {
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
	autoGetData = true
}) => {
	const { setPopBox } = useContext(popBoxContext);
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
		if (autoGetData && isLogin !== null) {
			handleGoToGame({ isLogin, langId, tpId, gameId, isFun });
		}

		return () => {
			isMountedRef.current = false;
		};
	}, [autoGetData, isLogin, langId]);

	const handleGoToGame = useCallback(
		({
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
			if (_isLogin) {
				// 因在 App 內彈窗開啟特定遊戲時會有問題，在此改導轉到專屬的開啟頁面
				if (isInApp() && _tpId === products.PGSoft.tpId) {
					const params = new URLSearchParams({
						tpId: String(_tpId),
						langId: String(_langId),
						gameId: String(_gameId),
						tpGameType: String(tpGameType),
						loginGameType
					}).toString();
					window.location = `/launcher/pg?${params}`;
					return;
				}

				api_tp_GotoGame({
					TpId: _tpId,
					LangId: _langId,
					gameId: _gameId,
					fun: _isFun ? "1" : "0",
					gameType:
						_tpId === products.NewPlayTechSlot.tpId ? "slots" : "",
					AppType:
						_tpId === products.NewPlayTechSlot.tpId
							? defGotoGame_AppType.Mobile
							: defGotoGame_AppType.NativeAPP,
					token: token ?? "",
					tpGameType: String(tpGameType),
					loginGameType: String(loginGameType)
				}).then(async res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0 && res.data.message) {
							const result = res.data.message;
							setData(() => result);
							if (_tpId === products.NewPlayTechSlot.tpId) {
								const {
									account: username,
									password,
									lang,
									mode
								} = result;

								await iapiSetCallout("Login", response => {
									if (response.errorCode) {
										if (response.errorCode == 48) {
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
							} else if (_tpId === products.PGSoft.tpId) {
								if (
									loginGameType ===
									defLoginGameType.returnHtml
								) {
									const newWindow = window.open();
									newWindow.document.write(res.data.message);
								} else {
									window.open(res.data.message);
								}
							}
						} else if (
							res.data.errorCode === 3000 &&
							res.data.message
						) {
							window.open(
								res.data.message,
								"Under Maintenance",
								"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
							);
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
					}
				});
			}

			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[gameId, isFun, isLogin, langId, tpId, i18n]
	);

	return { data, handleGoToGame };
};
