import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useNavigate } from "@reach/router";
import { userInfoContext } from "Context";
import { Footer } from "../components/common/footer";
import { eventTime } from "../components/common/eventTime";
import { isEventPeriod } from "../components/common/common";
import GoTopBtn from "../components/common/goTopBtn";
import DragonEgg from "../components/dragonEgg";
import allowedCurrencyList from "../datas/allowedCurrencyList";

const IndexPage = () => {
	const { t } = useTranslation();
	const navigateTo = useNavigate();

	const {
		userInfo: { langId, currencyId }
	} = useContext(userInfoContext);

	if (!currencyId) return null;

	return isEventPeriod(eventTime.dragonEgg) &&
		allowedCurrencyList.dragonEgg.includes(currencyId) ? (
		<>
			<main className="dragonegg-event">
				<div className="event-back">
					<i className="icon-back" />
					<button className="back" onClick={() => navigateTo(-1)}>
						{t("lbl_Back")}
					</button>
				</div>
				<DragonEgg />
			</main>
			<Footer />
			<GoTopBtn />
		</>
	) : (
		<Redirect to={`/${langId}`} noThrow />
	);
};

export default IndexPage;
