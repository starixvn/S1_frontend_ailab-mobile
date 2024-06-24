// 因 useMenu 開新視窗的方法在 app 內會畫面全白打不開遊戲
// app team 推測是瀏覽器對彈窗容忍度的問題
// 根據建議在此另做了開啟 PG Slots 用的頁面

import React, { useEffect } from "react";
import { some } from "lodash";
import LauncherScreen from "../components/launcher/launcherScreen";
import { api_tp_GotoGame, defGotoGame_AppType } from "../service/api/tp";

const LauncherPage = ({ type }) => {
	useEffect(() => {
		const launch = async () => {
			try {
				const params = new URLSearchParams(window.location.search);
				const tpId = params.get("tpId");
				const langId = params.get("langId");
				const gameId = params.get("gameId");
				const tpGameType = params.get("tpGameType");
				const loginGameType = params.get("loginGameType");

				// 原想將非 app 環境導回首頁，但此頁未能以 window.ReactNativeWebView 作判斷，暫先只檢查參數是否有少
				const isParamsMissing = some(
					[tpId, langId, gameId, tpGameType, loginGameType],
					param => param === null
				);
				if (isParamsMissing) throw new Error("Missing parameters");

				if (type === "pg") {
					const {
						data: { message }
					} = await api_tp_GotoGame({
						TpId: tpId,
						LangId: langId,
						gameId,
						fun: "0",
						gameType: tpGameType,
						AppType: defGotoGame_AppType.NativeAPP,
						tpGameType: String(tpGameType),
						loginGameType
					});

					if (message) {
						const newDocument = document.open(
							"text/html",
							"replace"
						);
						newDocument.write(message);
						newDocument.close();
					} else throw new Error("No message");
				} else throw new Error("Invalid type");
			} catch (e) {
				document.location = "/";
			}
		};

		launch();
	}, []);
	return <LauncherScreen />;
};

export default LauncherPage;
