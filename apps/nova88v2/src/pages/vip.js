import React, { useContext, useEffect, useState, useRef } from "react";
import moment from "moment/moment";
import { useNavigate } from "@reach/router";
import {
	userInfoContext,
	i18nContext,
	popBoxContext
} from "../components/common/context";
import { Info } from "../components/vip/info";
import { FooterBanner } from "../components/vip/footerBanner";
import Header from "../components/header/header";
import api from "../service/api";
import path from "../path";
import {
	defCurrenyId,
	currencyIdToTimeZone,
	numFormatToDigits
} from "../components/common/common";
import { VIP_LEVEL } from "../components/vip/def";
import Layout from "../components/common/layout";
import VipBanner from "../components/vip/vipBanner";
import VipMedal from "../components/vip/vipMedal";
import VipTable from "../components/vip/vipTable";
import allowedCurrencyList from "../datas/allowedCurrencyList";

const IndexPage = () => {
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);

	const [vipBanner, setVipBanner] = useState([]);
	// 預設 vintage
	const [vipActiveTabId, setVipActiveTabId] = useState(
		VIP_LEVEL.VIP_LEVEL_VINTAGE
	);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	if (
		userInfo?.currencyId !== null &&
		!allowedCurrencyList.VIP.includes(userInfo.currencyId)
	)
		navigate(`/${userInfo.langId}`);

	const openJoinPop = () => {
		if (!userInfo.isLogin) {
			navigate(path.join.root);
		}
	};

	// * 因 GetVipBanner response 裡有參雜 string number 故須額外判斷與顯示
	const number_format_excludeString = input => {
		if (!isNaN(Number(input))) {
			return numFormatToDigits(Number(input), 0);
		}

		return input;
	};

	const selectedVipTableData = vipBanner?.vipBannerData?.find(
		item => item.level === vipActiveTabId
	);

	useEffect(() => {
		// * 當 userInfo 非 null 時，才 call api
		if (!userInfo?.currencyId) return;

		const getVipBanner = async () => {
			await api.site
				.GetVipBanner({ CurrencyId: userInfo?.currencyId })
				.then(
					res => {
						if (isMountedRef.current && res.data.errorCode === 0) {
							setVipBanner(res.data.data || []);
						} else if (res.data.errorCode !== 0) {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					},
					() => {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				);
		};
		getVipBanner();
	}, [userInfo?.currencyId]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const goBackBtn = (
		<a onClick={() => navigate(-1)}>
			<i className="icon icon-keyboard_arrow_left" />
		</a>
	);

	const header = <Header title="VIP" hideLogo={true} link={goBackBtn} />;

	return (
		<Layout header={header} mainClass="main vip">
			<VipBanner
				i18n={i18n}
				userInfo={userInfo}
				vipBanner={vipBanner}
				number_format_excludeString={number_format_excludeString}
			/>

			<div className="vipprogram">
				{/* 目前只用 en 圖 */}
				<img
					src="https://banner.0814media.net/h5/img/vipbox.png"
					alt=""
				/>
				<Info langId={userInfo.langId} />
			</div>

			<div className="vipPage">
				<div className="text">
					{i18n.lbl_Vip_Last_Updated}:{" "}
					{moment(vipBanner?.lastUpdateTime, "YYYY-MM-DDThh:mm:ssZ")
						.zone(
							currencyIdToTimeZone[
								userInfo.currencyId ?? defCurrenyId.MYR
							]
						)
						.format("MM/DD/YYYY")}
				</div>
				<VipMedal
					i18n={i18n}
					langId={userInfo.langId}
					vipActiveTabId={vipActiveTabId}
					setVipActiveTabId={setVipActiveTabId}
				/>

				<VipTable
					selectedVipTableData={selectedVipTableData}
					userInfo={userInfo}
					vipActiveTabId={vipActiveTabId}
					number_format_excludeString={number_format_excludeString}
				/>
			</div>

			<FooterBanner langId={userInfo.langId} openJoinPop={openJoinPop} />
		</Layout>
	);
};

export default IndexPage;
