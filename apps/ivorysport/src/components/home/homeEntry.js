import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { defGameInfo } from "../../datas/productList";
import { userInfoContext } from "../common/context";
import useHandleLogin from "../hook/useHandleLogin";
import { GET_ENTER_PAGE } from "../../service/enterPage";
import { cloudBannerImgURL } from "../../config";

// 閹割版暫時使用
const homeEntryList = [
	{
		displayText: "SPORTS BOOK",
		imgUrl: "home_Sportsbook.jpg",
		description: "28.000 di pasar bermain per bulan",
		...defGameInfo.Soccer
	},
	{
		displayText: "Ice Hockey",
		imgUrl: "home_Icehockey.jpg",
		description: "Practice winning every day!",
		...defGameInfo.hockey
	},
	{
		displayText: "E-Sports",
		imgUrl: "home_ESports.jpg",
		description: "Teamwork makes the dream work",
		...defGameInfo.ESportAll
	},
	{
		displayText: "Tennis",
		imgUrl: "home_Tennis.jpg",
		description: "28,000 in play markets per month",
		...defGameInfo.Tennis
	},
	{
		displayText: "Basketball",
		imgUrl: "home_Basketball.jpg",
		description: "28,000 in play markets per month",
		...defGameInfo.basketball
	},
	{
		displayText: "Baseball",
		imgUrl: "home_Baseball.jpg",
		description: "28,000 in play markets per month",
		...defGameInfo.baseball
	}
];

const HomeEntry = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { handleLogin } = useHandleLogin();

	return (
		<div className="home-entry">
			{homeEntryList.map(
				({
					tpId,
					gameId,
					tpGameType,
					displayText,
					description,
					imgUrl
				}) => (
					<Fragment key={tpId}>
						<div
							className="home-entry-item"
							onClick={() =>
								GET_ENTER_PAGE({
									langId: userInfo.langId,
									tpId,
									gameId,
									isLogin: userInfo.isLogin,
									loginCallback: handleLogin,
									execFunction: null,
									specialUrl: "",
									tpGameType
								})
							}>
							<img
								src={`${cloudBannerImgURL}/h5/img/${imgUrl}`}
								alt={imgUrl}
							/>

							<div className="home-entry-info">
								{t(displayText)}
								<span>{description}</span>
							</div>
						</div>
					</Fragment>
				)
			)}
		</div>
	);
};

export default HomeEntry;
