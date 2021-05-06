import React, { useContext, useRef, useEffect } from "react";
import { popBoxContext } from "Context";
import PropTypes from "prop-types";
import { siteInfo } from "../../config";
import DefLangs from "../../datas/defLangs";
import api from "../../service/api";

const languageList = () => {
	const _siteInfo = siteInfo();
	return _siteInfo.siteLangList.map(l => DefLangs[l]);
};

const LanguageList = ({ userInfo, setUserInfo, i18n }) => {
	const { setPopBox } = useContext(popBoxContext);
	const _languageList = languageList();

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const selectLanguage = language => {
		if (userInfo.langId !== language) {
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
									title: i18n.lbl_ImportantNote,
									content: res.data.message
								});
							}
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n.msg_ApiServerError
							});
						}
					}
				);
			} else {
				setUserInfo(prevState => ({
					...prevState,
					langId
				}));
			}
		}
	};

	const arr = _languageList.map(item => {
		return (
			<Item
				key={`lang-${item.value}`}
				value={item.value}
				displayText={item.displayText}
				img={item.img}
				userLanguage={userInfo.langId}
				selectLanguage={selectLanguage}
			/>
		);
	});
	return <div className="country">{arr}</div>;
};

LanguageList.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

const Item = props => {
	return (
		<button
			className={`${props.userLanguage === props.value ? "active" : ""}`}
			onClick={props.selectLanguage.bind(null, props.value)}>
			<img src={props.img} alt={props.value} />
			<span>{props.displayText}</span>
		</button>
	);
};

Item.defaultProps = {
	userLanguage: null,
	value: ""
};

Item.propTypes = {
	userLanguage: PropTypes.string,
	selectLanguage: PropTypes.func.isRequired,
	img: PropTypes.string.isRequired,
	value: PropTypes.string,
	displayText: PropTypes.string.isRequired
};

export default LanguageList;
