import React, { useEffect } from "react";
import { some } from "lodash";
import { products } from "@ailab-mobile/common";
import LauncherScreen from "../components/launcher/launcherScreen";
import { api_tp_GotoGame, defGotoGame_AppType } from "../service/api/tp";

const LauncherPage = () => {
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

				if (Number(tpId) === products.PGSoft.tpId) {
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
