import React, { useContext } from "react";
import Swiper from "react-id-swiper";
import { userInfoContext, i18nContext } from "../common/context";
import { productList } from "../../datas/productList";
import ButtonWithCopyBtn from "../common/btnWithCopyBtn";
import { useGotoGame } from "../hook/useGotoGame";
import { cloudBannerImgURL } from "../../config";

const downloadLink = {
	ios:
		"itms-services://?action=download-manifest&url=https://appsetup.gdsenmu.com/ios/plist/Mega888_1.plist",
	android: "https://appsetup.huafaw.com/apk/Mega888_V1.2.apk",
	windows: "https://appsetup.huafaw.com/pc/Mega888.zip"
};

export default () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { data } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		tpId: productList.mega888.tpId,
		tpGameType: productList.mega888.tpGameType,
		allowBeforeLogin: true
	});

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
						href={downloadLink.android}
						target="_blank"
						rel="noreferrer">
						<i className="icon icon-android" />
						<div>
							{i18n.lbl_app_for_android}
							<br />
							APK
						</div>
					</a>
					<a target="_blank" rel="noreferrer" href={downloadLink.ios}>
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
