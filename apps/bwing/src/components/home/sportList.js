import React, { useContext } from "react";
import Swiper from "react-id-swiper";
import { useTranslation } from "react-i18next";
import { defAppType, GET_ENTER_PAGE } from "../../service/enterPage";
import { defNavPanel, navContext, userInfoContext } from "../common/context";
import { SPORT_LIST } from "./def";
import {
	defTpGameType,
	useGetTpMaintainList
} from "../hook/useGetTpMaintainList";

const SportList = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);
	const { maintainList } = useGetTpMaintainList();
	const { t } = useTranslation();

	const swiperParams = {
		slidesPerView: 2.15,
		spaceBetween: 10,
		centeredSlides: true,
		initialSlide: 2.5
	};

	return (
		<div className="home-sports mb-2">
			<Swiper {...swiperParams}>
				{SPORT_LIST.map(
					({ img, tpId, gameId, tpGameType, hasDesktopLink }) => {
						const isMaintain = maintainList?.some(
							m =>
								m.tpId === tpId &&
								(m.tpGameType === tpGameType ||
									m.tpGameType === defTpGameType.All)
						);
						return (
							<a key={`sports-${tpId}-${tpGameType}-${gameId}`}>
								<div className={isMaintain ? "maintain" : ""}>
									<img
										onClick={() => {
											!isMaintain &&
												GET_ENTER_PAGE({
													langId: userInfo.langId,
													tpId,
													gameId,
													isLogin: userInfo.isLogin,
													loginCallback: () =>
														setNav(
															defNavPanel.login
														),
													tpGameType,
													appType: hasDesktopLink
														? defAppType.desktop
														: null
												});
										}}
										key={`${tpId}_${gameId}`}
										src={img}
										alt=""
									/>
									{isMaintain && (
										<div className="tag-maintain">
											{t("lbl_underMaintenance")}
										</div>
									)}
								</div>
							</a>
						);
					}
				)}
			</Swiper>
		</div>
	);
};

export default SportList;
