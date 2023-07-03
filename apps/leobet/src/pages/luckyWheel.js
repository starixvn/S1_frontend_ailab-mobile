import React, { useContext, useEffect, useState, useMemo } from "react";
import { Redirect } from "@reach/router";
import {
	i18nContext,
	rootContext,
	userInfoContext
} from "../components/common/context";
import LuckyWheel from "../components/luckyWheel/luckyWheel";
import {
	isEventPeriod,
	GetCurrencyName,
	defCurrenyId
} from "../components/common/common";
import Header from "../components/header/header";
import Footer from "../components/common/footer";
import { Link } from "../route/link";
import path from "../path";
import { eventTime } from "../components/common/eventTime";
import GoTopBtn from "../components/common/goTopBtn";
import { cloudBannerImgURL } from "../config";

const CURRENCY_PERMISSION = [
	defCurrenyId.MYR,
	defCurrenyId.THB,
	defCurrenyId.IDR
];

const isInPeriod = isEventPeriod(eventTime.luckyWheel);

export const LuckyWheelPop = () => {
	const { root } = useContext(rootContext);
	const [isShow, setIsShow] = useState(false);
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const currencyName = GetCurrencyName({
		langId: userInfo.langId,
		currencyId: userInfo.currencyId,
		i18n
	});

	const currencyId = useMemo(() => userInfo?.currencyId, [
		userInfo.currencyId,
		userInfo.langId
	]);

	const isPassCurrencyIdPermission = CURRENCY_PERMISSION.includes(currencyId);

	useEffect(() => {
		if (
			!root ||
			(userInfo.isLogin !== false && !userInfo.lastLogin) ||
			!isPassCurrencyIdPermission ||
			!isInPeriod
		) {
			setIsShow(false);
		} else if (root && !isShow) {
			setIsShow(true);
		}
	}, [root, userInfo.isLogin, userInfo.lastLogin, currencyName]);

	const closePop = () => {
		setIsShow(false);
	};

	return (
		isShow && (
			<div className="eventLink">
				<button className="icon icon-close" onClick={closePop} />

				<Link to={path.luckyWheel.root} className="wheelModule">
					<img
						src={`${cloudBannerImgURL}/h5/img/event/wheel/eventlinkbg.png`}
						alt="luckyWheel Box"
					/>
					<img
						className="eventlinkimg"
						src={`${cloudBannerImgURL}/h5/img/event/wheel/eventlinkimg.png`}
						alt="luckyWheel Box"
					/>
					<img
						className="eventlinkwin"
						src={`${cloudBannerImgURL}/h5/img/event/wheel/eventlinkwin.png`}
						alt="luckyWheel Box"
					/>
				</Link>
			</div>
		)
	);
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	const currencyId = useMemo(() => userInfo?.currencyId, [
		userInfo.currencyId,
		userInfo.langId
	]);

	const isPassCurrencyIdPermission = CURRENCY_PERMISSION.includes(currencyId);

	if (userInfo.isLogin !== false && !userInfo.lastLogin) return null;

	if (!isPassCurrencyIdPermission || !isInPeriod)
		return <Redirect to={`/${userInfo.langId}`} noThrow />;

	return (
		<>
			<Header title={i18n.lbl_LuckyBox} hideLogo={true} />
			<main className="main wheelEvent">
				<LuckyWheel />
			</main>
			<Footer />
			<GoTopBtn />
		</>
	);
};

export default IndexPage;
