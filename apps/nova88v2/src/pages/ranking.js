import React, { useContext } from "react";
import { i18nContext, userInfoContext } from "../components/common/context";
import useHandleLogin from "../components/hook/useHandleLogin";
import Event from "../components/ranking/event";
import RankingByCategory from "../components/ranking/rankByCategory";
import Record from "../components/ranking/records";
import { defBtns, defElemType } from "../components/ranking/def";
import { useHandleSelect } from "../components/ranking/hook";
import BtnBar from "../components/common/btnBar";
import Header from "../components/header/header";
import { Link } from "../route/link";

const Ranking = ({ selected }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	return (
		<>
			<Event
				isOpen={defBtns[selected].elemType === defElemType.Event}
				i18n={i18n}
				userInfo={userInfo}
			/>
			<RankingByCategory
				isOpen={defBtns[selected].elemType === defElemType.Ranking}
				selected={selected}
				i18n={i18n}
				userInfo={userInfo}
			/>
			<Record
				isOpen={defBtns[selected].elemType === defElemType.Record}
				i18n={i18n}
				userInfo={userInfo}
				title={i18n[defBtns[selected].displayKey]}
			/>
			<Record
				isOpen={defBtns[selected].elemType === defElemType.LastEvent}
				i18n={i18n}
				userInfo={userInfo}
				isLastEvent={true}
				title={i18n[defBtns[selected].displayKey]}
			/>
		</>
	);
};
const IndexPage = () => {
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
		<Link to="/">
			<i className="icon icon icon-icon32px_1" />
			{i18n.lbl_Back}
		</Link>
	);
	return (
		<>
			<main className="main ranking">
				<Ranking selected={selected} />
			</main>
			<Header title={i18n.lbl_Ranking} hideLogo={true} link={link}>
				<BtnBar
					i18n={i18n}
					selected={selected}
					handleSelect={handleSelect}
					mainKey="leader-board-quickSelect"
					defBtns={defBtns}
					isLogin={isLogin}
					btnListClass="quickSelect"
				/>
			</Header>
		</>
	);
};

export default IndexPage;
