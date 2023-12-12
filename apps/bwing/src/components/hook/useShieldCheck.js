import { useState } from "react";
import { setCookie, deleteCookie } from "../common/common";
import { api_shield_ShieldRiskCheck } from "../../service/api/shield";

export const SHIELD_SITE_ID = "b5626627447a18bbf8cab1510a2c59cda2442fa2";

const shieldScript = `https://d1cr9zxt7u0sgu.cloudfront.net/shdfp.js?SITE_ID=${SHIELD_SITE_ID}&TYPE=JS&DE=1&AUTO=0`;

const is_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const is_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;

const useShieldCheck = () => {
	const [shieldData, setShieldData] = useState({});

	const scriptNodeList = document.querySelectorAll("script");
	const scriptArr = Array.from(scriptNodeList);

	const isShieldLoaded = scriptArr.find(el => el.src === shieldScript);

	const android_firefox = is_firefox && is_android;

	const getShieldData = () => {
		return;
		if (isShieldLoaded && !android_firefox) {
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

					const {
						shield_id,
						device_score,
						is_bot
					} = device_intelligence;

					setCookie("shield_id", shield_id);
					setCookie("device_score", device_score);
					setCookie("is_bot", is_bot);
					setCookie("platform", platform.toUpperCase());
					setCookie("session_id", session_id);
					setShieldData(res.result);
				},
				// on error
				error => {
					// console.log(error.message);
				}
			);
		}
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

	return { getShieldData, deleteShieldData, saveShieldData, isShieldLoaded };
};

export default useShieldCheck;
