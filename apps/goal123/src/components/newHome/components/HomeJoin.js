import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import path from "apps/goal123/src/path";
import { userInfoContext } from "../../common/context";
import { bannerImgUrl } from "../../../config";
import useClickGame from "../hooks/useClickGame";
import { defGameInfo } from "../../../datas/productList";

const HomeJoin = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const clickGame = useClickGame();

	const JoinListItems = [
		{
			link: `/ambassador`,
			title: "lbl_Home_Professional_Image_Title",
			text: "lbl_Home_Professional_Image_Text",
			img: "professional.png"
		},
		{
			link: `/${path.vip.root}`,
			title: "lbl_Home_Exclusives_VIP_Title",
			text: "lbl_Home_Exclusives_VIP_Text",
			img: "exclusives-vip.png"
		},
		{
			link: `/${path.promotion.root}`,
			title: "lbl_Home_Attractive_Bonus_Title",
			text: "lbl_Home_Attractive_Bonus_Text",
			img: "bouns.png"
		},
		{
			link: `/${path.deposit.root}`,
			title: "lbl_Home_Speedy_Transactions_Title",
			text: "lbl_Home_Speedy_Transactions_Text",
			img: "speedy.png",
			isDeposit: true
		}
	];

	const getImageUrl = imageName =>
		`${bannerImgUrl}/h5/img/home-page/${imageName}`;

	const handleDepositImage = item => {
		if (item.isDeposit && !userInfo.isLogin) {
			navigate(`/${path.login.root}`);
		} else {
			navigate(item.link);
		}
	};

	const handleBetButton = () => {
		clickGame(defGameInfo.SabaSoccer);
	};

	return (
		<div className="home-join">
			<div className="home-title">{t("lbl_Home_Join")} GOAL123</div>
			<div className="join-list">
				{JoinListItems.map((item, index) => (
					<div
						className="join-item"
						key={index.title}
						onClick={() => handleDepositImage(item)}>
						<div className="title">{t(item.title)}</div>
						<img src={getImageUrl(item.img)} alt={t(item.title)} />
					</div>
				))}
			</div>

			{userInfo.isLogin ? (
				<button className="btn-more" onClick={handleBetButton}>
					{t("lbl_BetNow")}
				</button>
			) : (
				<button
					className="btn-more"
					onClick={() => {
						navigate(`/${path.join.root}`);
					}}>
					{t("lbl_PromoJoinNow")}
				</button>
			)}
		</div>
	);
};

export default HomeJoin;
