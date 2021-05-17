import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { defMetaData } from "../components/seo/def";
import { Autoplay } from "../components/common/swipperBanner";
import { userInfoContext, i18nContext } from "../components/common/context";
import { defBannersUrl, defLevelList } from "../components/vip/def";
import { EventList } from "../components/vip/eventList";
import { Info } from "../components/vip/info";
import { FooterBanner } from "../components/vip/footerBanner";
import Header from "../components/header/header";
import Footer from "../components/common/footer";
import path from "../path";

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
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

	const openJoinPop = () => {
		if (!userInfo.isLogin) {
			navigate(path.join.root);
		}
	};
	const helmet = defMetaData[path.vip.root]?.[userInfo.langId].links.map(
		el => {
			return <link href={el.href} rel={el.rel} hrefLang={el.hrefLang} />;
		}
	);

	return (
		<>
			<Header title="VIP" hideLogo={true} />
			<main className="main vip">
				<Banners langId={userInfo.langId} />
				<LevelList i18n={i18n} langId={userInfo.langId} />
				<Info langId={userInfo.langId} />
				<div className="vipPage">
					<div className="text">
						{i18n.lbl_Vip_Last_Updated}: 12/05/2021
					</div>
					<EventList langId={userInfo.langId} />
					<FooterBanner
						langId={userInfo.langId}
						openJoinPop={openJoinPop}
					/>
				</div>
			</main>
			<Footer />
			<Helmet>{helmet}</Helmet>
		</>
	);
};

const LevelList = ({ i18n, langId }) => {
	const rows = defLevelList.map(l => (
		<div key={`VIPLevelList-${l.levelName}`}>
			<img src={l.imgUrl} alt={l.levelName} />
			{langId === "cs" ? (
				<>
					{i18n[l.levelNameCS]}
					<p>{i18n.lbl_Club}</p>
				</>
			) : (
				i18n[l.levelName]
			)}
		</div>
	));

	return <div className="medal">{rows}</div>;
};

LevelList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

export default IndexPage;
