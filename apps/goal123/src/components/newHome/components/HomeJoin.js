import React from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import path from "apps/goal123/src/path";
import { bannerImgUrl } from "../../../config";

const HomeJoin = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const JoinListItems = [
		{
			title: "lbl_Home_Professional_Image_Title",
			text: "lbl_Home_Professional_Image_Text",
			img: "professional.png"
		},
		{
			title: "lbl_Home_Exclusives_VIP_Title",
			text: "lbl_Home_Exclusives_VIP_Text",
			img: "exclusives-vip.png"
		},
		{
			title: "lbl_Home_Attractive_Bonus_Title",
			text: "lbl_Home_Attractive_Bonus_Text",
			img: "bouns.png"
		},
		{
			title: "lbl_Home_Speedy_Transactions_Title",
			text: "lbl_Home_Speedy_Transactions_Text",
			img: "speedy.png"
		}
	];

	const getImageUrl = imageName =>
		`${bannerImgUrl}/h5/img/home-page/${imageName}`;

	return (
		<>
			<div className="home-join">
				<div className="home-title">{t("lbl_Home_Join")} GOAL123</div>
				<div className="join-list">
					{JoinListItems.map((item, index) => (
						<div className="join-item" key={index.title}>
							<div className="title">{t(item.title)}</div>
							<img
								src={getImageUrl(item.img)}
								alt={t(item.title)}
							/>
						</div>
					))}
				</div>
				<button
					className="btn-more"
					onClick={() => {
						navigate(`/${path.join.root}`);
					}}>
					{t("lbl_PromoJoinNow")}
				</button>
			</div>
		</>
	);
};

export default HomeJoin;
