import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import useInterval from "../hook/useInterval";
import path from "../../path";

const Jactpot = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [jPotSuccess, setJPotSuccess] = useState(false);

	useInterval(() => {
		if (!jPotSuccess) {
			const ticker2 =
				typeof Ticker === "undefined"
					? null
					: new Ticker({
							info: 2,
							casino: "hotspin88am",
							currency: "vnd"
					  });

			if (ticker2) {
				setJPotSuccess(true);
			}

			ticker2?.attachToTextBox("tick");
			ticker2?.SetCurrencySign("");
			ticker2?.tick();
		}
	}, 1000);

	return (
		<div className={`home-jackpot mb-4 ${jPotSuccess ? "" : "maintain"}`}>
			<div className="home-jackpot-title">{t("lbl_TotalAmount")}</div>
			<div className="home-jackpot-btn">
				<button onClick={() => navigate(path.casino.root)}>
					{t("lbl_Sportsbook_PlayNow")}
				</button>
			</div>
			<div className="home-jackpot-number">
				<div>
					<span id="tick" />
				</div>
			</div>
			{!jPotSuccess && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
		</div>
	);
};
export default Jactpot;
