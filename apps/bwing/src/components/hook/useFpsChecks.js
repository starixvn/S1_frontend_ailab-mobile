import { useState } from "react";
import { api_fps_checks } from "../../service/api/fps";
import useInterval from "./useInterval";

const getInputValueById = id => document.getElementById(id)?.value || "";

const useFpsChecks = ({ isLogin, interval = 10000 }) => {
	const [isChecked, setIsChecked] = useState(false); // fps是否已經發送過check了

	useInterval(
		// eslint-disable-next-line consistent-return
		async () => {
			try {
				const fpsNeededToCheck = localStorage.getItem(
					"fpsNeededToCheck"
				);
				if (!fpsNeededToCheck) return setIsChecked(true); // 如果localStorage沒有fpsNeededToCheck，就代表不需要check，後面也就不需要執行了
				localStorage.removeItem("fpsNeededToCheck"); // 已經發出check之後就不用再保留storage佔位置了

				const di = getInputValueById("__di");
				const bi = getInputValueById("__bi");
				const detecasAnalysis = getInputValueById("detecas-analysis");

				// 取得這 3 個值後再送
				// eslint-disable-next-line consistent-return
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
			} catch {
				// 忽略
			}
		},
		isLogin && !isChecked ? interval : null
	);
};

export default useFpsChecks;
