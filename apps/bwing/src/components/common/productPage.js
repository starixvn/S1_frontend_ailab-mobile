import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { menuIconTypeEnum } from "@ailab-mobile/common";
import { i18nContext, userInfoContext } from "./context";
import useMenu from "../hook/useMenu";
import { isShowEventIcon } from "../../datas/defMenu";

const ProductPage = ({ category, bannerUrl }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { menuData, onClickProductItem } = useMenu();

	const subMenuItem =
		menuData?.find(
			({ category: menuCategory }) => menuCategory === category
		)?.data || [];

	const arr = subMenuItem.map(gameItem => {
		const {
			tpGameIdNo,
			productName,
			currencyGameName,
			iconType,
			iconStartTime,
			iconEndTime,
			isInMaintain,
			mobileLobbyPicUrl
		} = gameItem;

		// * 後端這裡是字串格式 需做處理
		const suBMenuImage =
			mobileLobbyPicUrl && JSON.parse(mobileLobbyPicUrl)[0];

		const isNew =
			isShowEventIcon(iconStartTime, iconEndTime) &&
			iconType === menuIconTypeEnum.New;

		const displayName =
			currencyGameName &&
			currencyGameName[userInfo?.langId] &&
			currencyGameName[userInfo?.langId];

		return (
			<button
				key={tpGameIdNo}
				className={classNames("lobby-products-item", {
					maintain: isInMaintain,
					"tag-new-pop": isNew
				})}
				onClick={() => onClickProductItem(gameItem)}>
				{isInMaintain && (
					<div className="tag-maintain">
						{i18n.lbl_underMaintenance}
					</div>
				)}
				<img src={suBMenuImage} alt={productName} />
				<div className="name">{displayName || productName}</div>
			</button>
		);
	});

	const Banner = () => {
		return (
			<div className="lobby-banner">
				<img src={bannerUrl} alt="lobby-banner" />
			</div>
		);
	};

	const Lobby = () => {
		return (
			<div className="wrapper">
				<div className="col-12">
					<div className="lobby-top">
						<Banner />
					</div>
					<div className="lobby-products">{arr}</div>
				</div>
			</div>
		);
	};

	return <Lobby />;
};

ProductPage.propTypes = {
	category: PropTypes.string.isRequired,
	bannerUrl: PropTypes.string.isRequired
};

export default ProductPage;
