import React, { useContext, useRef, useEffect } from "react";
import { popBoxContext } from "Context";
import PropTypes from "prop-types";
import DefLangs from "../../datas/defLangs";
import api from "../../service/api";
import { siteInfo } from "../../config";
import { setCookie } from "../common/common";

const LanguageList = ({ userInfo, setUserInfo, i18n }) => {
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const selectLanguage = (language, currencyId) => {
		if (
			userInfo.langId !== language ||
			userInfo.currencyId !== currencyId
		) {
			const langId = language;

			if (userInfo.isLogin) {
				api.account.SetLanguage(langId).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								setUserInfo(prevState => ({
									...prevState,
									langId
								}));
							} else {
								setPopBox({
									isOpen: true,
									content: `[${res.data.errorCode}] ${res.data.message}`
								});
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			} else {
				setUserInfo(prevState => ({
					...prevState,
					langId,
					currencyId
				}));
			}
			setCookie(siteInfo(language).langCookie, language);
			setCookie(siteInfo(language).currencyCookie, currencyId);
		}
	};

	const isLogin = userInfo.isLogin && userInfo.currencyId;

	const languageList = Object.values(DefLangs);

	const availableCurrencyId = languageList.find(
		item => item.currencyId === userInfo.currencyId
	);

	const arr = languageList
		.filter(item =>
			isLogin && availableCurrencyId
				? item.currencyId === userInfo.currencyId
				: true
		)
		.map(item => {
			const isSelected =
				item.lang.some(l => l.value === userInfo.langId) &&
				item.currencyId === userInfo.currencyId;
			return (
				<Item
					key={`lang-${item.country}`}
					lang={item.lang}
					img={item.img}
					country={item.country}
					userLanguage={userInfo.langId}
					selectLanguage={selectLanguage}
					isSelected={isSelected}
					countryName={item.countryName}
					currencyId={item.currencyId}
					userCurrencyId={userInfo.currencyId}
				/>
			);
		});
	return <div className="countryNew">{arr}</div>;
};

LanguageList.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setUserInfo: PropTypes.func.isRequired
};

const Item = ({
	lang,
	img,
	country,
	userLanguage,
	selectLanguage,
	isSelected,
	countryName,
	currencyId,
	userCurrencyId
}) => {
	const langArr = lang.map(l => (
		<button
			key={`lang-${currencyId}-${l.value}`}
			className={
				userLanguage === l.value && userCurrencyId === currencyId
					? "active"
					: ""
			}
			onClick={selectLanguage.bind(this, l.value, currencyId)}>
			{l.displayText}
		</button>
	));

	return (
		<div className={isSelected ? "active" : ""}>
			<div className="countryName">
				<img src={img} alt={country} />
				{countryName}
			</div>
			{langArr}
		</div>
	);
};

Item.defaultProps = {
	userLanguage: null,
	isSelected: false,
	userCurrencyId: null
};

Item.propTypes = {
	lang: PropTypes.arrayOf(PropTypes.object).isRequired,
	userLanguage: PropTypes.string,
	selectLanguage: PropTypes.func.isRequired,
	img: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	isSelected: PropTypes.bool,
	countryName: PropTypes.string.isRequired,
	currencyId: PropTypes.number.isRequired,
	userCurrencyId: PropTypes.number
};

export default LanguageList;
