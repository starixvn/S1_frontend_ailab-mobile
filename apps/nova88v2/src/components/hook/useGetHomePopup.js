import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { popBoxContext, userInfoContext } from "Context";
import { defDeviceType } from "@ailab-mobile/api";
import {
	useGetIpCountryQuery,
	useLazyGetPopUpPromotionQuery
} from "@ailab-mobile/service";
import path from "../../path";
import { cloudBannerImgURL } from "../../config";
import { setCookie, readCookie } from "../common/common";

const useGetHomePopup = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { langId, isLogin, userName, accountName } = userInfo;

	const { data: { data: ipCountryData = {} } = {} } = useGetIpCountryQuery();

	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();

	const showSponsorshipPopup = () => {
		if (new Date() > new Date(2023, 12, 31)) {
			openHomePopup();
			return;
		}

		const cookieName = `sponsorship-nova88`;
		if (!isLogin && !accountName && readCookie(cookieName) !== "1") {
			setCookie(cookieName, "1", 1);

			setPopBox({
				isOpen: true,
				className: "sponsorpop",
				custContent: (
					<div className="pop sponsor">
						<img
							src={`${cloudBannerImgURL}/h5/img/sponsorpop-${
								langId || "en"
							}.png`}
							alt="img-sponsorpop"
						/>
						<img
							onClick={() => {
								setPopBox({ isOpen: false });
								openHomePopup();
							}}
							src={`${cloudBannerImgURL}/h5/img/promosBackPopup/delet.png`}
							alt="delete"
							className="closepop"
						/>
					</div>
				)
			});
		}
	};

	const showPromotionPopup = async () => {
		const cookieName = `popUpPromotion-${userName}`;

		if (!isLogin || !accountName || readCookie(cookieName) === "1") {
			openHomePopup();
			return;
		}

		const {
			data: { data: { bonusCode } = {} } = {}
		} = await getPopUpPromotion({
			langId,
			deviceType: defDeviceType.Mobile
		});

		if (bonusCode) {
			setPopBox({
				isOpen: true,
				className: "promosback",
				custContent: (
					<div className="pop promosbackpop">
						<img
							src={`${cloudBannerImgURL}/h5/img/promosBackPopup/promosPopup-${
								langId || "en"
							}.png`}
							alt="img-promosPopup"
						/>
						<button
							className="popgo"
							onClick={() => {
								navigate(
									`/${langId}/${path.promotion.root}?bonusCode=${bonusCode}`
								);
								setPopBox({ isOpen: false });
							}}>
							{t("lbl_ClaimNow")}
						</button>
						<img
							src={`${cloudBannerImgURL}/h5/img/promosBackPopup/delet.png`}
							alt="img-delet"
							className="closepop"
							onClick={() => {
								setPopBox({ isOpen: false });
								openHomePopup();
							}}
						/>
					</div>
				)
			});
			setCookie(cookieName, "1", 1);
		} else {
			openHomePopup();
		}
	};

	const showDisclaimerForVnd = async () => {
		if (new Date() > new Date(2024, 3, 13)) {
			openHomePopup();
			return;
		}

		const cookieName = "disclaimerForVnd";
		if (
			(ipCountryData && Object.keys(ipCountryData)?.length === 0) ||
			ipCountryData?.code !== "VN" ||
			readCookie(cookieName) === "1"
		) {
			openHomePopup();
			return;
		}

		const showLang =
			ipCountryData?.code === "VN" && langId === "vn" ? "vn" : "en";

		setCookie(cookieName, "1", 1);
		setPopBox({
			isOpen: true,
			className: "vninfopop active",
			custContent: (
				<div className="pop vninfopop-inner">
					<img
						src={`${cloudBannerImgURL}/h5/img/disclaimer-vnd-currency-popup-${showLang}.png`}
						alt="disclaimer-vnd"
					/>
					<button
						className="popgoto"
						onClick={() => setPopBox({ isOpen: false })}>
						{t("lbl_JoinNow")}
					</button>
					<img
						className="closepop"
						src={`${cloudBannerImgURL}/h5/img/promosBackPopup/delet.png`}
						alt="delete"
						onClick={() => setPopBox({ isOpen: false })}
					/>
				</div>
			)
		});
	};

	const popUpStack = [
		showSponsorshipPopup,
		showPromotionPopup,
		showDisclaimerForVnd
	];

	const openHomePopup = () => {
		if (popUpStack.length) {
			popUpStack.pop()();
		} else {
			setPopBox({ isOpen: false });
		}
	};

	return { openHomePopup };
};

export default useGetHomePopup;
