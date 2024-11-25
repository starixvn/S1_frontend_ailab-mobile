import { useState } from "react";
import { api_fps_checks } from "../../service/api/fps";
import useInterval from "./useInterval";

const getInputValueByName = id =>
	document.getElementsByName(id)?.[0]?.value || "";

const useFpsChecks = ({ isLogin, interval = 10000 }) => {
	const [isSent, setIsSent] = useState(false);

	useInterval(
		async () => {
			try {
				const di = getInputValueByName("__di");
				const bi = getInputValueByName("__bi");
				const detecasAnalysis = getInputValueByName("detecas-analysis");
				const sessionKey = getInputValueByName("__fdi");
				const token = getInputValueByName("__tk");
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
