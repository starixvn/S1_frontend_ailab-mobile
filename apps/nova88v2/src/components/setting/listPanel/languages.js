import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useContext } from "react";
import { userInfoContext } from "Context";
import { useSetLanguageMutation } from "@ailab-mobile/service";
import DefLangs from "../../../datas/defLangs";
import { siteInfo } from "../../../config";
import { setCookie } from "../../common/common";

const LanguageList = () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { langId, isLogin, currencyId } = userInfo;

	const [setLanguage] = useSetLanguageMutation();

	const selectLanguage = async (selLang, selCurrencyId) => {
		if (langId !== selLang || currencyId !== selCurrencyId) {
			if (isLogin) {
				const { errorCode } = await setLanguage({
					langId: selLang
				}).unwrap();

				if (errorCode === 0) {
					setUserInfo(prevState => ({
						...prevState,
						langId: selLang
					}));
				}
			} else {
				setUserInfo(prevState => ({
					...prevState,
					langId: selLang,
					currencyId: selCurrencyId
				}));
			}

			setCookie(siteInfo(selLang).langCookie, selLang);
			setCookie(siteInfo(selLang).currencyCookie, selCurrencyId);
		}
	};

	const languageList = Object.values(DefLangs);

	const availableCurrencyId = languageList.find(
		item => item.currencyId === currencyId
	);

	const arr = languageList
		.filter(item =>
			isLogin && currencyId && availableCurrencyId
				? item.currencyId === currencyId
				: true
		)
		.map(item => {
			const isSelected =
				item.lang.some(l => l.value === langId) &&
				item.currencyId === currencyId;

			return (
				<Item
					key={`lang-${item.country}`}
					img={item.img}
					lang={item.lang}
					country={item.country}
					isSelected={isSelected}
					currencyId={item.currencyId}
					countryName={item.countryName}
					userLanguage={langId}
					selectLanguage={selectLanguage}
					userCurrencyId={currencyId}
				/>
			);
		});
	return <div className="country">{arr}</div>;
};

const Item = ({
	img,
	lang,
	country,
	isSelected,
	currencyId,
	countryName,
	userLanguage,
	userCurrencyId,
	selectLanguage
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
		<div
			key={countryName}
			className={classNames("country-item", { active: isSelected })}>
			<div className="country-title">
				<div>
					<img src={img} alt={country} />
				</div>
				{countryName}
			</div>
			<div>{langArr}</div>
		</div>
	);
};

Item.defaultProps = {
	isSelected: false,
	userLanguage: null,
	userCurrencyId: null
};

Item.propTypes = {
	isSelected: PropTypes.bool,
	userLanguage: PropTypes.string,
	userCurrencyId: PropTypes.number,
	img: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	currencyId: PropTypes.number.isRequired,
	countryName: PropTypes.string.isRequired,
	selectLanguage: PropTypes.func.isRequired,
	lang: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LanguageList;
