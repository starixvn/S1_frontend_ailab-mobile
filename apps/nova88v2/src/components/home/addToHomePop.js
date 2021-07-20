import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import icon from "../../styles/img/icon_256_Nova88_1.png";
import { setCookie, readCookie, validImgLang } from "../common/common";

const ua = window.navigator.userAgent;
const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
const isSafari =
	navigator.vendor &&
	navigator.vendor.indexOf("Apple") > -1 &&
	navigator.userAgent &&
	navigator.userAgent.indexOf("CriOS") == -1 &&
	navigator.userAgent.indexOf("FxiOS") == -1;
const iOSSafari = iOS && isSafari;

const AddToHomePop = ({ i18n, userInfo }) => {
	const _langId = validImgLang(userInfo.langId);
	const [addToHomePop, setAddToHomePop] = useState(false);

	useEffect(() => {
		if (readCookie("AddToHome") !== "1") {
			setAddToHomePop(true);
		}
	}, []);

	const clickNotShowing = () => {
		setCookie("AddToHome", "1", 7);
		setAddToHomePop(false);
	};

	return addToHomePop && iOSSafari ? (
		<div className="favouriteModule">
			<div className="favourite">
				<img src={icon} alt="Nova88" />
				<div>
					{i18n.lbl_AddToHome_Hint}
					<div>
						<a href={`/ac/teaching_${_langId}.html`}>
							{i18n.lbl_AddToHome_Tutorial}
						</a>
						<button onClick={clickNotShowing}>
							{i18n.lbl_Skip}
						</button>
					</div>
				</div>
			</div>
		</div>
	) : null;
};

AddToHomePop.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default AddToHomePop;
