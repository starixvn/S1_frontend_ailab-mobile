import React from "react";
import Swiper from "react-id-swiper";
import { lobbyCategoryEnum } from "@ailab-mobile/common";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import useMenu from "../hook/useMenu";

const SportList = () => {
	const { menuList = [], onClickProductItem } = useMenu();

	const sportLobbyList =
		menuList?.find(
			({ lobbyCategoryId }) =>
				lobbyCategoryId === lobbyCategoryEnum.SPORTS
		)?.data || [];

	const { t } = useTranslation();

	const swiperParams = {
		slidesPerView: 2.15,
		spaceBetween: 10,
		centeredSlides: true,
		initialSlide: 2.5,
		loop: true
	};

	return (
		<div className="home-sports mb-2">
			<Swiper {...swiperParams}>
				{sportLobbyList.map(sportItem => {
					const {
						tpGameIdNo,
						productName,
						isInMaintain,
						mobileLobbyPicUrl
					} = sportItem || {};

					// * 後端這裡是字串格式 需做處理
					const suBMenuImage =
						mobileLobbyPicUrl && JSON.parse(mobileLobbyPicUrl)[0];

					return (
						<div
							className={classNames({ maintain: isInMaintain })}
							key={tpGameIdNo}>
							<img
								onClick={() => onClickProductItem(sportItem)}
								src={suBMenuImage}
								alt={productName}
							/>
							{isInMaintain && (
								<div className="tag-maintain">
									{t("lbl_underMaintenance")}
								</div>
							)}
						</div>
					);
				})}
			</Swiper>
		</div>
	);
};

export default SportList;
