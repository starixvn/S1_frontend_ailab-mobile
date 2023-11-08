import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "Context";
import { cloudBannerImgURL } from "../../config";
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

const AddToHomePop = () => {
	const { t } = useTranslation();

	const { userInfo } = useContext(userInfoContext);
	const { langId } = userInfo;

	const _langId = validImgLang(langId);
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

	return (
		addToHomePop &&
		iOSSafari && (
			<div className="favouriteModule">
				<div className="favourite">
					<img
						src={`${cloudBannerImgURL}/h5/img/icon_256_Nova88_1.png`}
						alt="Nova88"
					/>
					<div>
						{t("lbl_AddToHome_Hint")}
						<div>
							<a href={`/ac/teaching_${_langId}.html`}>
								{t("lbl_AddToHome_Tutorial")}
							</a>
							<button onClick={clickNotShowing}>
								{t("lbl_Skip")}
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export { AddToHomePop };
