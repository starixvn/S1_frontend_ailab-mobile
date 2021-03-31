import React, { useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext } from "../components/common/context";
import MysteryBox from "../components/mysteryBox/mysterBox";
import { isEventPeriod } from "../components/common/common";
import Header from "../components/header/header";
import Footer from "../components/common/footer";

export const eventTime = {
	mysteryBox: { startDate: "2021/02/27 00:00:00" }
};

const IndexPage = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);

	useEffect(() => {
		if (!isEventPeriod(eventTime.mysteryBox)) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<>
			<Header title={i18n.lbl_MysteryBox_EventTitle} hideLogo={true} />
			<main className="main event">
				<MysteryBox />
			</main>
			<Footer />
		</>
	);
};

export default IndexPage;
