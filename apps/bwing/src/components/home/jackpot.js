import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import useInterval from "../hook/useInterval";
import path from "../../path";

const Jactpot = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [isJackPotLoaded, setIsJackPotLoaded] = useState(false);
	const jackpotRef = useRef(null);
	const [jackpotNum, setJackpotNum] = useState(null);

	useInterval(() => {
		try {
			const ticker = new Ticker({
				info: 2,
				casino: "hotspin88am",
				currency: "vnd"
			});

			if (isJackPotLoaded) return;

			if (ticker) {
				setIsJackPotLoaded(true);
				ticker.attachToTextBox("tick");
				ticker.sign = "";
				ticker.tick();
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);
			setIsJackPotLoaded(false);
		}
	}, 1000);
	useInterval(() => {
		if (jackpotRef.current) {
			const text = document.getElementById("tick").innerText;
			const num = text.replace(/\.\d*/, "");
			setJackpotNum(num);
		}
	}, 100);

	return (
		<div
			className={`home-jackpot mb-4 ${
				isJackPotLoaded ? "" : "maintain"
			}`}>
			<div className="home-jackpot-title">{t("lbl_TotalAmount")}</div>
			<div className="home-jackpot-btn">
				<button
					onClick={() =>
						navigate(`${path.casino.root}?page=jackpot`)
					}>
					{t("lbl_Sportsbook_PlayNow")}
				</button>
			</div>
			<div className="home-jackpot-number">
				<div>
					<span
						id="tick"
						ref={jackpotRef}
						style={{ display: "none" }}
					/>
					{jackpotNum && <span>{jackpotNum}</span>}
				</div>
			</div>
			{!isJackPotLoaded && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
		</div>
	);
};
export default Jactpot;
