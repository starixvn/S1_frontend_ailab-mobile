import React, { useContext } from "react";
import { Autoplay } from "../components/common/swipperBanner";
import { userInfoContext } from "../components/common/context";
import { defBannersUrl, defLevelList } from "../components/vip/def";
import { EventList } from "../components/vip/eventList";

const Banners = () => {
	const rows = defBannersUrl.map((b, bIdx) => (
		<img
			key={`VIPBanner-${bIdx}`}
			src={b}
			className="banner"
			alt="vip banner"
		/>
	));
	return <Autoplay Rows={rows} />;
};

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<>
			<Banners />
			<LevelList />
			<EventList langId={userInfo.langId} />
		</>
	);
};

const LevelList = () => {
	const rows = defLevelList.map(l => (
		<div key={`VIPLevelList-${l.levelName}`}>
			<img src={l.imgUrl} alt={l.levelName} />
			{l.levelName}
		</div>
	));

	return <div className="medal">{rows}</div>;
};

export default IndexPage;
