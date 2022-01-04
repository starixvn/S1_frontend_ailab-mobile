import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "@reach/router";
import { popBoxContext } from "../common/context";
import { productList, defIconType } from "../../datas/defMenu";
import { api_GetTpIds } from "../../service/api/site";

const HeaderMenu = ({ i18n, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [showingTpIds, setShowningTpIds] = useState(null);

	useEffect(() => {
		if (userInfo.isLogin) {
			api_GetTpIds().then(
				res => {
					if (res.data.errorCode === 0) {
						setShowningTpIds(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	}, [userInfo.isLogin]);

	const content = Object.values(productList(userInfo.langId)).map(product => {
		if (!product.path && !product.href) {
			return (
				<ProductItem
					key={`header-menu-${product.displayKey}`}
					spanText={i18n[product.displayKey]}
					icon_img={product.icon_img}
					subIcon={product.items?.filter(
						subItem =>
							subItem.eventIcon &&
							(subItem.tpId
								? showingTpIds === null ||
								  showingTpIds.includes(subItem.tpId)
								: true)
					)}
					eventIcon={product?.eventIcon}
				/>
			);
		}
		return (
			<ProductLinkItem
				key={`header-menu-${product.displayKey}`}
				spanText={i18n[product.displayKey]}
				icon_img={product.icon_img}
				productPath={product.path}
				href={product.href}
				subIcon={product.items?.filter(
					subItem =>
						subItem.eventIcon &&
						(subItem.tpId
							? showingTpIds === null ||
							  showingTpIds.includes(subItem.tpId)
							: true)
				)}
				eventIcon={product?.eventIcon}
			/>
		);
	});

	return <div className="headerB">{content}</div>;
};

HeaderMenu.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

const ProductItem = ({
	spanText,
	OnClickProduct,
	subIcon,
	eventIcon,
	icon_img
}) => {
	const showingEventIcon = getEventIcon({ subIcon, eventIcon });
	return (
		<div onClick={OnClickProduct} className={`nav${showingEventIcon}`}>
			<img src={icon_img} alt={spanText} />
			{spanText.toUpperCase()}
		</div>
	);
};

ProductItem.defaultProps = {
	subIcon: [],
	eventIcon: []
};

ProductItem.propTypes = {
	spanText: PropTypes.string.isRequired,
	OnClickProduct: PropTypes.func.isRequired,
	subIcon: PropTypes.arrayOf(PropTypes.object),
	eventIcon: PropTypes.arrayOf(PropTypes.object)
};

const ProductLinkItem = ({
	spanText,
	productPath,
	href,
	subIcon,
	eventIcon,
	icon_img
}) => {
	const { pathname } = window.location;
	const showingEventIcon = getEventIcon({ subIcon, eventIcon });
	const navigate = useNavigate();

	return productPath ? (
		<div
			onClick={() => navigate(`/${productPath}`)}
			className={`nav${showingEventIcon} ${
				pathname === `/${productPath}` ? " active" : ""
			}`}>
			<img src={icon_img} alt={spanText} />
			{spanText.toUpperCase()}
		</div>
	) : (
		<a href={href}>
			<div className="nav">
				<img src={icon_img} alt={spanText} />
				{spanText.toUpperCase()}
			</div>
		</a>
	);
};

ProductLinkItem.defaultProps = {
	productPath: "",
	href: "",
	subIcon: [],
	eventIcon: []
};

ProductLinkItem.propTypes = {
	spanText: PropTypes.string.isRequired,
	productPath: PropTypes.string,
	href: PropTypes.string,
	subIcon: PropTypes.arrayOf(PropTypes.object),
	eventIcon: PropTypes.arrayOf(PropTypes.object)
};

const getEventIcon = ({ subIcon, eventIcon }) => {
	let showingEventIcon = "";
	let eventIconList = eventIcon ?? [];

	if (subIcon.length > 0) {
		const categoryIdx = subIcon.findIndex(obj =>
			obj?.eventIcon.find(item => item.inPeriod === true)
		);
		eventIconList =
			categoryIdx === -1 ? [] : subIcon[categoryIdx].eventIcon;
	}

	const eventInPeriodObj = eventIconList?.find(
		item => item.inPeriod === true
	);
	showingEventIcon = eventInPeriodObj ? eventInPeriodObj.icon : "";

	if (showingEventIcon === defIconType.new) {
		showingEventIcon = defIconType.new_nav;
	}

	return showingEventIcon;
};

export default HeaderMenu;
