import React, { useContext, useEffect, useRef, useState } from "react";
import Swiper from "react-id-swiper";
import { products, defDeepLinkId } from "@ailab-mobile/common";
import { userInfoContext, i18nContext } from "../common/context";
import ButtonWithCopyBtn from "../common/btnWithCopyBtn";
import { useGotoGame } from "../hook/useGotoGame";
import { cloudBannerImgURL, siteInfo } from "../../config";
import api from "../../service/api";

const downloadLink = {
	ios:
		"itms-services://?action=download-manifest&url=https://appsetup.gdsenmu.com/ios/plist/Mega888_1.plist",
	android: "https://appsetup.huafaw.com/apk/Mega888_V1.2.apk",
	windows: "https://appsetup.huafaw.com/pc/Mega888.zip"
};

const defType = {
	Android: 1,
	IOS: 2,
	WindowsPC: 3
};

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);
	const [linkList, setLinkList] = useState([]);

	const { data } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		tpId: products.Mega888.tpId,
		tpGameType: products.Mega888.tpGameType,
		allowBeforeLogin: true
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api.player
			.GetDeepLink({
				deepLinkId: defDeepLinkId.mega888,
				siteId: siteInfo(userInfo.langId).siteId
			})
			.then(
				res => {
					if (!isMountedRef.current) return;

					const { errorCode, message, data: _data } = res.data;
					if (errorCode === 0) {
						setLinkList(_data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				},
				() => {
					if (!isMountedRef.current) return;
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
	}, []);

	const getLink = type => linkList?.find(el => type === el.type)?.deepLink;

	return (
		<section>
			<img
				src={`${cloudBannerImgURL}/h5/img/mega_side.png`}
				alt="mega888"
			/>

			<div className="copyinfo">
				<div>{i18n.lbl_Username.toUpperCase()}</div>
				<ButtonWithCopyBtn value={data?.account} />
				<div>{i18n.lbl_Password.toUpperCase()}</div>
				<ButtonWithCopyBtn value={data?.password} />
			</div>

			<div className="downloadModule">
				<div className="downloadSelect active">
					<a
						href={getLink(defType.Android) ?? downloadLink.android}
						target="_blank"
						rel="noreferrer">
						<i className="icon icon-android" />
						<div>
							{i18n.lbl_app_for_android}
							<br />
							APK
						</div>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href={getLink(defType.IOS) ?? downloadLink.ios}>
						<i className="icon icon-appleinc" />
						<div>
							{i18n.lbl_app_for_ios}
							<br />
							IOS 64Bit (iPhone 5s +)
						</div>
					</a>
				</div>
			</div>
			<div className="title">{i18n.lbl_mega888_download_app}</div>
			<InstallGuide />
		</section>
	);
};

const InstallGuide = () => {
	const params = {
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		rebuildOnUpdate: true
	};

	return (
		<div className="downloadModule">
			<div className="guideMark" />
			<Swiper {...params}>
				<img
					src={`${cloudBannerImgURL}/h5/img/mega/Help_01.png`}
					alt="step1"
				/>
				<img
					src={`${cloudBannerImgURL}/h5/img/mega/Help_02.png`}
					alt="step2"
				/>
				<img
					src={`${cloudBannerImgURL}/h5/img/mega/Help_03.png`}
					alt="step3"
				/>
				<img
					src={`${cloudBannerImgURL}/h5/img/mega/Help_04.png`}
					alt="step4"
				/>
				<img
					src={`${cloudBannerImgURL}/h5/img/mega/Help_05.png`}
					alt="step5"
				/>
				<img
					src={`${cloudBannerImgURL}/h5/img/mega/Help_06.png`}
					alt="step6"
				/>
				<img
					src={`${cloudBannerImgURL}/h5/img/mega/Help_07.png`}
					alt="step7"
				/>
				<img
					src={`${cloudBannerImgURL}/h5/img/mega/Help_08.png`}
					alt="step8"
				/>
			</Swiper>
		</div>
	);
};
