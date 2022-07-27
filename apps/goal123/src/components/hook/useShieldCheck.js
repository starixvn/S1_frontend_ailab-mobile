import { useState } from "react";
import { setCookie, deleteCookie } from "../common/common";
import { api_shield_ShieldRiskCheck } from "../../service/api/shield";

const useShieldCheck = () => {
	const [shieldData, setShieldData] = useState({});

	const getShieldData = () => {
		getDeviceResult().then(
			// on success
			res => {
				// retrieve session id
				// consume device intelligence
				const {
					device_intelligence,
					platform,
					session_id
				} = res.result;

				const { shield_id, device_score, is_bot } = device_intelligence;

				setCookie("shield_id", shield_id);
				setCookie("device_score", device_score);
				setCookie("is_bot", is_bot);
				setCookie("platform", platform);
				setCookie("session_id", session_id);
				setShieldData(res.result);
			},
			// on error
			error => {
				// console.log(error.message);
			}
		);
	};

	const saveShieldData = async () => {
		try {
			const res = await api_shield_ShieldRiskCheck(shieldData);
			return res.data.errorCode === 0;
		} catch {
			return false;
		}
	};

	const deleteShieldData = () => {
		deleteCookie("shield_id");
		deleteCookie("device_score");
		deleteCookie("is_bot");
	};

	return { getShieldData, deleteShieldData, saveShieldData };
};

export default useShieldCheck;
