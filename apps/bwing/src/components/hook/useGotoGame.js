import React, {
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef
} from "react";
import { defGameInfo } from "../../datas/productList";
import { popBoxContext, i18nContext } from "../common/context";
import { api_tp_GotoGame, defGotoGame_AppType } from "../../service/api/tp";

export const defSpecialSetting = {
	playTech: defGameInfo.Casino_PT.tpId
};

const launchGameWithFunMode = ({ client, game, lang, mode }) => {
	if (client === "ngm_desktop" || client === "ngm_mobile") {
		iapiSetClientParams(client, `language=${lang}&real=0`);
		iapiLaunchClient(client, game, mode, "_self");
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
		if (autoGetData) {
			handleGoToGame({ isLogin, langId, tpId, gameId, isFun });
		}

		iapiSetCallout("Login", response => {
			if (response.errorCode) {
				if (response.errorCode == 48) {
					errorPopBox(
						`Login failed, error: ${response.errorCode} ,playerMessage: ${response.actions.PlayerActionShowMessage[0].message}`,
						response.errorCode
					);
				} else {
					errorPopBox(
						`Login failed, error: ${response.errorCode} ,playerMessage: ${response.playerMessage}`,
						response.errorCode
					);
				}
			}
		});
		return () => {
			isMountedRef.current = false;
		};
	});

	const handleGoToGame = useCallback(
		({
			isLogin: _isLogin = true,
			langId: _langId,
			tpId: _tpId,
			gameId: _gameId,
			isFun: _isFun
		}) => {
			if (_isLogin) {
				api_tp_GotoGame({
					TpId: _tpId,
					LangId: _langId,
					gameId: _gameId,
					fun: _isFun ? "1" : "0",
					AppType:
						_tpId === defSpecialSetting.playTech
							? defGotoGame_AppType.Mobile
							: defGotoGame_AppType.NativeAPP
				}).then(res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0 && res.data.message) {
							const result = JSON.parse(res.data.message);
							setData(() => result);
							if (_tpId === defSpecialSetting.playTech) {
								const {
									account: username,
									password,
									lang,
									mode
								} = result;

								if (mode === "real") {
									iapiSetClientType("casino");
									iapiSetClientPlatform("web");
									iapiLogin(username, password, 1, lang);
								} else {
									launchGameWithFunMode({ ...result });
								}
							}
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
