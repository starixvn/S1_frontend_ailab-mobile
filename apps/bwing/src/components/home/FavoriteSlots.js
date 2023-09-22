import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";
import {
	defTpGameType,
	useGetTpMaintainList
} from "../hook/useGetTpMaintainList";
import { GET_CASINO_ENTER_PAGE, GET_ENTER_PAGE } from "../../service/enterPage";
import {
	defNavPanel,
	navContext,
	popBoxContext,
	userInfoContext
} from "../common/context";
import { defProductType } from "./def";

const FavoriteSlots = ({ hotGameList }) => {
	const { t } = useTranslation();
	const { maintainList } = useGetTpMaintainList();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { setNav } = useContext(navContext);

	const handleGameClick = ({ tpId, gameId, tpCategory, tpGameType }) => {
		if (
			maintainList?.some(
				m =>
					m.tpId === tpId &&
					(m.tpGameType === tpGameType ||
						m.tpGameType === defTpGameType.All)
			)
		) {
			setPopBox({
				isOpen: true,
				content: t("lbl_underMaintenance"),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="white"
							onClick={() => {
								setPopBox({ isOpen: false });
							}}>
							OK
						</button>
					</div>
				)
			});
		} else if (userInfo.isLogin === false) {
			setNav(defNavPanel.login);
		} else if (tpCategory === defProductType.slots) {
			GET_CASINO_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isFree: false,
				tpGameType
			});
		} else {
			GET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				loginCallback: () => setNav(defNavPanel.login),
				tpGameType
			});
		}
	};

	const swiperParams = {
		spaceBetween: 15,
		slidesPerView: 1.3,
		initialSlide: 1.3
	};

	return (
		<>
			<div className="home-title">
				<i className="icon-slots" />
				{t("lbl_FavouriteSlots")}
			</div>
			<div className="home-fav mb-2">
				<Swiper {...swiperParams}>
					{hotGameList.map(
						({
							gameName,
							tpLogo,
							tpName,
							gameId,
							gameLogo,
							tpId,
							tpCategory,
							tpGameType
						}) => (
							<a
								key={gameId}
								className="home-fav-item"
								onClick={() =>
									handleGameClick({
										tpId,
										gameId,
										tpCategory,
										tpGameType
									})
								}>
								<div
									className="home-fav-img"
									style={{
										backgroundImage: `url("${gameLogo}")`
									}}
								/>
								<div className="home-fav-info">
									<span>{gameName}</span>
									<img src={tpLogo} alt={tpName} />
								</div>
							</a>
						)
					)}
				</Swiper>
			</div>
		</>
	);
};

FavoriteSlots.defaultProps = {
	hotGameList: []
};

FavoriteSlots.propTypes = {
	hotGameList: PropTypes.arrayOf(PropTypes.any)
};

export default FavoriteSlots;
