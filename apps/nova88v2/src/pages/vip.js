import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { Autoplay } from "../components/common/swipperBanner";
import { userInfoContext, i18nContext } from "../components/common/context";
import { defBannersUrl, defLevelList } from "../components/vip/def";
import { EventList } from "../components/vip/eventList";
import { Info } from "../components/vip/info";
import { FooterBanner } from "../components/vip/footerBanner";
import Header from "../components/header/header";
import path from "../path";
import { defCurrenyId } from "../components/common/common";
import { useHandleAllowCurrencies } from "../components/hook/useHandleAllowCurrencies";
import Layout from "../components/common/layout";

export const vipAllowCurrencies = [
	defCurrenyId.MYR,
	defCurrenyId.THB,
	defCurrenyId.IDR
];

const Banners = ({ langId }) => {
	const rows = defBannersUrl({
		langId
	}).map(b => (
		<div>
			<img
				key={`VIPBanner-${b}`}
				src={b}
				className="banner"
				alt="vip banner"
			/>
		</div>
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
	const header = <Header title="VIP" hideLogo={true} />;

	useHandleAllowCurrencies({
		allowCurrencies: vipAllowCurrencies,
		isLogin: userInfo.isLogin,
		currencyId: userInfo.currencyId,
		langId: userInfo.langId,
		redirectPath: `/${userInfo.langId}`,
		i18n
	});

	const openJoinPop = () => {
		if (!userInfo.isLogin) {
			navigate(path.join.root);
		}
	};

	return (
		<Layout header={header} mainClass="main vip">
			<Banners langId={userInfo.langId} />
			<LevelList i18n={i18n} langId={userInfo.langId} />
			<Info langId={userInfo.langId} />
			<div className="vipPage">
				<div className="text">
					{i18n.lbl_Vip_Last_Updated}: 10/25/2022
				</div>
				<EventList langId={userInfo.langId} />
				<FooterBanner
					langId={userInfo.langId}
					openJoinPop={openJoinPop}
				/>
			</div>
		</Layout>
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
