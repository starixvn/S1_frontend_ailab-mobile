import React, { useContext, useEffect, useState, useRef } from "react";
import moment from "moment/moment";
import PropTypes from "prop-types";
import { Autoplay } from "../components/common/swipperBanner";
import {
	userInfoContext,
	i18nContext,
	defNavPanel,
	navContext,
	popBoxContext
} from "../components/common/context";
import { defBannersUrl, defLevelList } from "../components/vip/def";
import { EventList } from "../components/vip/eventList";
import { Info } from "../components/vip/info";
import { FooterBanner } from "../components/vip/footerBanner";
import Layout from "../components/common/layout";
import { api_site_GetVipBanner } from "../service/api/site";

const swipperParams = {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	rebuildOnUpdate: true
};

const Banners = ({ langId }) => {
	const rows = defBannersUrl({ langId }).map(b => (
		<img
			key={`VIPBanner-${b}`}
			src={b}
			className="banner"
			alt="vip banner"
		/>
	));
	return <Autoplay Rows={rows} params={swipperParams} />;
};

Banners.propTypes = {
	langId: PropTypes.string.isRequired
};

const IndexPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setNav } = useContext(navContext);
	const [vipBanner, setVipBanner] = useState([]);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	const openJoinPop = () => {
		if (!userInfo.isLogin) {
			setNav(defNavPanel.join);
		}
	};

	useEffect(() => {
		const getVipBanner = async () => {
			await api_site_GetVipBanner().then(
				res => {
					if (isMountedRef.current && res.data.errorCode === 0) {
						setVipBanner(res.data.data || []);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		};
		getVipBanner();
	}, []);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return (
		<Layout title={i18n.lbl_VIP} mainClass="main vip">
			<Banners langId={userInfo.langId} />
			<LevelList i18n={i18n} />
			<Info langId={userInfo.langId} />
			<div className="vipPage">
				<div className="text">
					{i18n.lbl_LastUpdated} :{" "}
					{moment(vipBanner?.lastUpdateTime, "YYYY-MM-DDThh:mm:ssZ")
						.zone("+07:00")
						.format("MM/DD/YYYY")}
				</div>
				<EventList langId={userInfo.langId} vipBanner={vipBanner} />
				<FooterBanner
					langId={userInfo.langId}
					openJoinPop={openJoinPop}
				/>
			</div>
		</Layout>
	);
};

const LevelList = ({ i18n }) => {
	const rows = defLevelList.map(l => (
		<div key={`VIPLevelList-${l.levelName}`}>
			<img src={l.imgUrl} alt={l.levelName} />
			{l.levelName ? (
				i18n[l.levelName]
			) : (
				<>
					{l.levelName_col1}
					<p>{l.levelName_col2}</p>
					<p>{l.levelName_col3}</p>
				</>
			)}
		</div>
	));

	return <div className="medal">{rows}</div>;
};

LevelList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default IndexPage;
