import React, { useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { i18nContext, rootContext } from "../components/common/context";
import MysteryBox from "../components/mysteryBox/mysterBox";
import { isEventPeriod } from "../components/common/common";
import Header from "../components/header/header";
import Footer from "../components/common/footer";
import { Link } from "../route/link";
import path from "../path";
import PopImg from "../styles/img/event/mysterybox/eventlink.png";
import { euro_event_time } from "../datas/productList";
import euroImg from "../styles/img/euro/eventlink.png";

export const eventTime = {
	mysteryBox: { startDate: "2021/02/27 00:00:00" }
};

export const MysteryBoxPop = () => {
	const { root, setRoot } = useContext(rootContext);

	const closePop = () => {
		setRoot(false);
	};

	return root ? (
		<div className="eventLink">
			<button className="icon icon-close" onClick={closePop} />
			<Link to={path.mysteryBox.root}>
				<img
					src={isEventPeriod(euro_event_time) ? euroImg : PopImg}
					alt="Mystery Box"
				/>
			</Link>
		</div>
	) : null;
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
