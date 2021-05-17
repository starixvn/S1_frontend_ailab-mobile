import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { i18nContext, userInfoContext } from "../components/common/context";

import Event from "../components/ranking/event";
import Final from "../components/ranking/final";
import Record from "../components/ranking/records";
import { defBtns, defElemType, defEuroBtns } from "../components/ranking/def";
import { useHandleSelect } from "../components/ranking/hook";
import useHandleLogin from "../components/hook/useHandleLogin";
import BtnBar from "../components/common/btnBar";
import TournamentPoints from "../components/ranking/tournamentPoints";
import Layout from "../components/common/layout";
import Header from "../components/header/header";
import { Link } from "../route/link";
import path from "../path";

export default () => {
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
		<Link to={path.home.root}>
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);
	let helmet = {};
	switch (userInfo.langId) {
		case "en":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88.net/en/leaderBoard"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/leaderBoard"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/leaderBoard"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/leaderBoard"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/leaderBoard"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
		case "cs":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88gol.com/cs/leaderBoard"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/leaderBoard"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/leaderBoard"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/leaderBoard"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/leaderBoard"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
		case "th":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88apple.com/th/leaderBoard"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/leaderBoard"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/leaderBoard"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/leaderBoard"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/leaderBoard"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
		case "id":
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88-indo.com/id/leaderBoard"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/leaderBoard"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/leaderBoard"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/leaderBoard"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/leaderBoard"
						hrefLang="id-id"
					/>
				</Helmet>
			);

			break;

		default:
			helmet = (
				<Helmet>
					<link
						rel="canonical"
						href="https://www.nova88.net/en/leaderBoard"
					/>
					<link
						rel="alternate"
						href="https://www.nova88.net/en/leaderBoard"
						hrefLang="en-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88gol.com/cs/leaderBoard"
						hrefLang="zh-my"
					/>
					<link
						rel="alternate"
						href="https://www.nova88apple.com/th/leaderBoard"
						hrefLang="th-th"
					/>
					<link
						rel="alternate"
						href="https://www.nova88-indo.com/id/leaderBoard"
						hrefLang="id-id"
					/>
				</Helmet>
			);
			break;
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
					defBtns={defEuroBtns}
					btnListClass="quickSelect"
					isLogin={isLogin}
				/>
			</Header>
			<Layout mainClass="main rankingEuro" header={false}>
				<Event
					isOpen={
						defEuroBtns[selected].elemType === defElemType.Event
					}
					i18n={i18n}
					userInfo={userInfo}
				/>
				<Final
					isOpen={
						defEuroBtns[selected].elemType === defElemType.Final
					}
					i18n={i18n}
					userInfo={userInfo}
				/>
				<TournamentPoints
					isOpen={
						defEuroBtns[selected].elemType ===
						defElemType.Tournament
					}
					i18n={i18n}
					userInfo={userInfo}
				/>
				<Record
					isOpen={
						defEuroBtns[selected].elemType === defElemType.Record
					}
					i18n={i18n}
					userInfo={userInfo}
					title="lbl_Records"
				/>
			</Layout>
			{helmet}
		</>
	);
};
