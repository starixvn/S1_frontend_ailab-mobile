import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Autoplay } from "../components/common/swipperBanner";
import { userInfoContext, i18nContext } from "../components/common/context";
import { defBannersUrl, defLevelList } from "../components/vip/def";
import { EventList } from "../components/vip/eventList";

const Banners = ({ langId }) => {
	const rows = defBannersUrl({ langId }).map((b, bIdx) => (
		<img
			key={`VIPBanner-${bIdx}`}
			src={b}
			className="banner"
			alt="vip banner"
		/>
	));
	return <Autoplay Rows={rows} />;
};

Banners.propTypes = {
	langId: PropTypes.string.isRequired
};

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

	return (
		<>
			<Banners langId={userInfo.langId} />
			<LevelList i18n={i18n} />
			<EventList langId={userInfo.langId} />
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
