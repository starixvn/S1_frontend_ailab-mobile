import { useState } from "react";
import { api_fps_checks } from "../../service/api/fps";
import useInterval from "./useInterval";

const getInputValueById = id => document.getElementById(id)?.value || "";

const useFpsChecks = ({ isLogin, interval = 60000 }) => {
	const [isSent, setIsSent] = useState(false);

	useInterval(
		async () => {
			try {
				const di = getInputValueById("__di");
				const bi = getInputValueById("__bi");
				const detecasAnalysis = getInputValueById("detecas-analysis");

				// 取得這 3 個值後再送
				if (![di, bi, detecasAnalysis].every(Boolean)) return;

				const sessionKey = getInputValueById("__fdi");
				const token = getInputValueById("__tk");
				const url = window.location.href;
				await api_fps_checks({
					di,
					bi,
					detecasAnalysis,
					sessionKey,
					token,
					url
				});
				setIsSent(true);
			} catch {
				// 忽略
			}
		},
		isLogin && !isSent ? interval : null
	);
};

export default useFpsChecks;
