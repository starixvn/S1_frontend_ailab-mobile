import React, { useContext } from "react";
import { Redirect, useNavigate } from "@reach/router";
import { i18nContext, userInfoContext } from "../components/common/context";
// import { SEO } from "../components/seo/seo";
import Event from "../components/ranking/event";
import Record from "../components/ranking/records";
import {
	defBtns,
	defElemType,
	getLeaderBoardSupportCurrencyId
} from "../components/ranking/def";
import { useHandleSelect } from "../components/ranking/hook";
import useHandleLogin from "../components/hook/useHandleLogin";
import BtnBar from "../components/common/btnBar";
import Layout from "../components/common/layout";
import Header from "../components/header/header";

export default () => {
	const navigate = useNavigate();

	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { isLogin } = userInfo;

	const { handleLogin } = useHandleLogin();

	const { selected, handleSelect } = useHandleSelect({
		defaultSelect: defBtns.Event.value,
		handleLogin,
		isLogin
	});
	const link = (
		<a onClick={() => navigate(-1)}>
			<i className="icon icon-keyboard_arrow_left" />
		</a>
	);

	if (userInfo.isLogin !== false && !userInfo.lastLogin) return null;

	const allowCurrencies = getLeaderBoardSupportCurrencyId();
	const currencyId = userInfo?.currencyId;

	if (!allowCurrencies.includes(currencyId)) {
		return <Redirect to={`/${userInfo.langId}`} noThrow />;
	}

	return (
		<>
			<Header
				title={i18n.lbl_Ranking}
				hideLogo={true}
				link={link}
				titleClass="title">
				<BtnBar
					i18n={i18n}
					selected={selected}
					handleSelect={handleSelect}
					mainKey="leader-board-btnBar"
					defBtns={defBtns}
					btnListClass="quickSelect"
					isLogin={isLogin}
				/>
			</Header>
			<Layout mainClass="main rankingNew" noHeader>
				<Event
					isOpen={defBtns[selected].elemType === defElemType.Event}
					i18n={i18n}
					userInfo={userInfo}
				/>
				<Record
					isOpen={defBtns[selected].elemType === defElemType.Ranking}
					i18n={i18n}
					userInfo={userInfo}
					title={defBtns.Ranking.displayKey}
					customTopNum={50}
				/>
				<Record
					isOpen={
						defBtns[selected].elemType === defElemType.GamesPoint
					}
					i18n={i18n}
					userInfo={userInfo}
					title={defBtns.GamesPoint.displayKey}
					customTopNum={50}
				/>
				<Record
					isOpen={defBtns[selected].elemType === defElemType.Result}
					i18n={i18n}
					userInfo={userInfo}
					title={defBtns.Result.displayKey}
					customTopNum={30}
				/>
			</Layout>
			{/* <SEO
				path={path.ranking.root}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
			/> */}
		</>
	);
};
