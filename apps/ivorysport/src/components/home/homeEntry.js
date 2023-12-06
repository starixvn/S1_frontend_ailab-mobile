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
		displayKey: "lbl_Sports",
		imgUrl: "home_Sportsbook.jpg",
		description: "28.000 di pasar bermain per bulan",
		...defGameInfo.Soccer
	},
	{
		displayKey: "lbl_IceHockey",
		imgUrl: "home_Icehockey.jpg",
		description: "Practice winning every day!",
		...defGameInfo.hockey
	},
	{
		displayKey: "lbl_eSports",
		imgUrl: "home_ESports.jpg",
		description: "Teamwork makes the dream work",
		...defGameInfo.ESportAll
	},
	{
		displayKey: "lbl_Tennis",
		imgUrl: "home_Tennis.jpg",
		description: "28,000 in play markets per month",
		...defGameInfo.Tennis
	},
	{
		displayKey: "lbl_Basketball",
		imgUrl: "home_Basketball.jpg",
		description: "28,000 in play markets per month",
		...defGameInfo.basketball
	},
	{
		displayKey: "lbl_Baseball",
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
		<>
			<div className="home-entry">
				{homeEntryList.map(
					({
						tpId,
						gameId,
						tpGameType,
						displayKey,
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
									{t(displayKey)}
									<span>{description}</span>
								</div>
							</div>
						</Fragment>
					)
				)}
			</div>
			<div className="home-license">
				<div className="title">
					{t("lbl_Gaming_License")}
					<img
						src="https://banner.ivorysport.com/h5/img/license_tick.png"
						alt=""
					/>
				</div>
				<a
					href="https://www.pagcor.ph/regulatory/cop.php"
					target="_blank"
					rel="noreferrer">
					<img
						src="https://banner.ivorysport.com/h5/img/pagcor.png"
						alt=""
					/>
				</a>
			</div>
		</>
	);
};

export default HomeEntry;
