import { useState } from "react";
import { api_fps_checks } from "../../service/api/fps";
import useInterval from "./useInterval";

const useFpsChecks = ({ isLogin, interval = 60000 }) => {
	const [isSent, setIsSent] = useState(false);

	useInterval(
		async () => {
			try {
				const values = ["__di", "__bi", "detecas-analysis"].map(
					id => document.getElementById(id)?.value
				);
				if (values.some(value => typeof value !== "string")) return;

				const [di, bi, detecasAnalysis] = values;
				const url = window.location.href;
				await api_fps_checks({ di, bi, detecasAnalysis, url });
				setIsSent(true);
			} catch {
				// 忽略
			}
		},
		isLogin && !isSent ? interval : null
	);
};

export default useFpsChecks;
