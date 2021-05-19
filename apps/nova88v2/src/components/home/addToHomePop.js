import React from "react";
import PropTypes from "prop-types";
import icon from "../../styles/img/icon_256_Nova88_1.png";
import { setCookie } from "../common/common";

const AddToHomePop = ({ i18n, setAddToHomePop, langId }) => {
	const clickNotShowing = () => {
		setCookie("addToHome", "1", 1);
		setAddToHomePop(false);
	};

	return (
		<div className="favouriteModule">
			<div className="favourite">
				<img src={icon} alt="Nova88" />
				<div>
					{i18n.lbl_AddToHome_Hint}
					<div>
						<a href={`/ac/teaching.html?lang=${langId}`}>
							{i18n.lbl_AddToHome_Tutorial}
						</a>
						<button onClick={clickNotShowing}>
							{i18n.lbl_Dont_show_me_again}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

AddToHomePop.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setAddToHomePop: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};

const ua = window.navigator.userAgent;
const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
const isSafari =
	navigator.vendor &&
	navigator.vendor.indexOf("Apple") > -1 &&
	navigator.userAgent &&
	navigator.userAgent.indexOf("CriOS") == -1 &&
	navigator.userAgent.indexOf("FxiOS") == -1;
export const iOSSafari = iOS && isSafari;

export default AddToHomePop;
