import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { productList, defIconType } from "../../datas/defMenu";

const HeaderMenu = ({ i18n, OnClickProduct, userInfo }) => {
	const content = Object.values(productList(userInfo.langId)).map(product => {
		if (!product.path && !product.href) {
			return (
				<ProductItem
					key={`header-menu-${product.displayKey}`}
					spanText={i18n[product.displayKey]}
					OnClickProduct={OnClickProduct.bind(this, {
						...product,
						lang: userInfo.langId,
						isLogin: userInfo.isLogin
					})}
					subIcon={product.items?.filter(
						subItem => subItem.eventIcon
					)}
					categoryEvent={product?.categoryEvent}
				/>
			);
		}
		return (
			<ProductLinkItem
				key={`header-menu-${product.displayKey}`}
				spanText={i18n[product.displayKey]}
				productPath={product.path}
				href={product.href}
				subIcon={product.items?.filter(subItem => subItem.eventIcon)}
				categoryEvent={product?.categoryEvent}
			/>
		);
	});

	return <div className="headerB">{content}</div>;
};

HeaderMenu.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	OnClickProduct: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

const ProductItem = ({ spanText, OnClickProduct, subIcon, categoryEvent }) => {
	const showingEventIcon = getEventIcon({ subIcon, categoryEvent });
	return (
		<button onClick={OnClickProduct} className={`nav${showingEventIcon}`}>
			{spanText.toUpperCase()}
		</button>
	);
};

ProductItem.defaultProps = {
	subIcon: [],
	categoryEvent: []
};

ProductItem.propTypes = {
	spanText: PropTypes.string.isRequired,
	OnClickProduct: PropTypes.func.isRequired,
	subIcon: PropTypes.arrayOf(PropTypes.object),
	categoryEvent: PropTypes.arrayOf(PropTypes.object)
};

const ProductLinkItem = ({
	spanText,
	productPath,
	href,
	subIcon,
	categoryEvent
}) => {
	const { pathname } = window.location;
	const showingEventIcon = getEventIcon({ subIcon, categoryEvent });

	return productPath ? (
		<Link
			to={`/${productPath}`}
			className={`nav${showingEventIcon} ${
				pathname === `/${productPath}` ? " active" : ""
			}`}>
			{spanText.toUpperCase()}
		</Link>
	) : (
		<a target="_blank" rel="noreferrer" href={href} className="nav">
			{spanText.toUpperCase()}
		</a>
	);
};

ProductLinkItem.defaultProps = {
	productPath: "",
	href: "",
	subIcon: [],
	categoryEvent: []
};

ProductLinkItem.propTypes = {
	spanText: PropTypes.string.isRequired,
	productPath: PropTypes.string,
	href: PropTypes.string,
	subIcon: PropTypes.arrayOf(PropTypes.object),
	categoryEvent: PropTypes.arrayOf(PropTypes.object)
};

const getEventIcon = ({ subIcon, categoryEvent }) => {
	let showingEventIcon = "";

	if (subIcon && subIcon.length > 0) {
		const categoryIdx = subIcon.findIndex(obj =>
			obj?.eventIcon.find(item => item.inPeriod === true)
		);
		showingEventIcon = subIcon[categoryIdx].eventIcon.find(
			item => item.inPeriod === true
		)?.icon;
		if (showingEventIcon === defIconType.new) {
			showingEventIcon = defIconType.new_nav;
		}
	} else if (categoryEvent && categoryEvent.length > 0) {
		showingEventIcon = categoryEvent.find(obj => obj.inPeriod === true)
			.icon;
	}

	return showingEventIcon;
};

export default HeaderMenu;
