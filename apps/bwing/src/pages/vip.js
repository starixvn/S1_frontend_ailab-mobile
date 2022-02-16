import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AutoPlay } from "../components/common/swipperBanner";
import {
	userInfoContext,
	i18nContext,
	defNavPanel,
	navContext
} from "../components/common/context";
import { defBannersUrl, defLevelList } from "../components/vip/def";
import { EventList } from "../components/vip/eventList";
import { Info } from "../components/vip/info";
import { FooterBanner } from "../components/vip/footerBanner";

const Banners = ({ langId }) => {
	const rows = defBannersUrl({ langId }).map((b, bIdx) => (
		<img
			key={`VIPBanner-${bIdx}`}
			src={b}
			className="banner"
			alt="vip banner"
		/>
	));
	return <AutoPlay Rows={rows} />;
};

Banners.propTypes = {
	langId: PropTypes.string.isRequired
};

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);

	const openJoinPop = () => {
		if (!userInfo.isLogin) {
			setNav(defNavPanel.join);
		}
	};

	return (
		<>
			<Banners langId={userInfo.langId} />
			<LevelList i18n={i18n} />
			<Info langId={userInfo.langId} />
			<div className="vipPage">
				<div className="text">{i18n.lbl_LastUpdated} : 02/15/2022</div>
				<EventList langId={userInfo.langId} />
				<FooterBanner
					langId={userInfo.langId}
					openJoinPop={openJoinPop}
				/>
			</div>
		</>
	);
};

const LevelList = ({ i18n }) => {
	const rows = defLevelList.map(l => (
		<div key={`VIPLevelList-${l.levelName}`}>
			<img src={l.imgUrl} alt={l.levelName} />
			{i18n[l.levelName]}
		</div>
	));

	return <div className="medal">{rows}</div>;
};

LevelList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default IndexPage;
