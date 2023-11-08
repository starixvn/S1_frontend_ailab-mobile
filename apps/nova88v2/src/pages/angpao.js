import React, { useContext } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Redirect, useNavigate } from "@reach/router";
import { Angpao } from "@ailab-mobile/components";
import { isDateRange } from "@ailab-mobile/common";
import { AngpaoWrapper, DrawPrizeEventIdEnum } from "@ailab-mobile/wrapper";
import { userInfoContext } from "../components/common/context";
import path from "../path";
import { Footer } from "../components/common/footer";
import GoTopBtn from "../components/common/goTopBtn";
import { defCurrenyId } from "../components/common/common";

// * 支援幣別
export const angpaoAllowedCurrencies = [defCurrenyId.MYR, defCurrenyId.THB];

// * 活動時間
export const angPaoEventPeriod = {
	startDate: "2023-01-21 00:00:00",
	endDate: "2023-02-05 23:59:59"
};

export default () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const openLoginPopBox = () => {
		navigate(`/${i18next.language}/${path.login.root}`, {
			state: {
				previousPage: `/${i18next.language}/${path.angpao.root}`
			}
		});
	};

	// * 活動尚未開始導轉回首頁 或 不支援該幣別 導轉回首頁
	if (
		!isDateRange(angPaoEventPeriod) ||
		!angpaoAllowedCurrencies.includes(userInfo?.currencyId)
	) {
		<Redirect to="/" noThrow />;
	}

	return (
		<AngpaoWrapper
			isLogin={userInfo?.isLogin}
			eventId={DrawPrizeEventIdEnum.AngpaoNova88}
			eventPeriod={angPaoEventPeriod}>
			{({
				angpaoModal,
				message,
				drawPrizeResult,
				drawPrizeStatus,
				isDrawPrizeRecordListFetching,
				drawPrizeRecordList,
				onCheckDrawPrize,
				onPostDrawPrize
			}) => {
				return (
					<>
						<header className="header">
							<div className="title">
								{t("Label_AngpaoNewYearTitle")}
							</div>
						</header>
						<Angpao
							isLogin={userInfo?.isLogin}
							currencyId={userInfo?.currencyId}
							angpaoModal={angpaoModal}
							message={message}
							drawPrizeResult={drawPrizeResult}
							drawPrizeStatus={drawPrizeStatus}
							isDrawPrizeRecordListFetching={
								isDrawPrizeRecordListFetching
							}
							drawPrizeRecordList={drawPrizeRecordList}
							onCheckDrawPrize={onCheckDrawPrize}
							onPostDrawPrize={onPostDrawPrize}
							onOpenLoginPopBox={openLoginPopBox}
						/>

						<Footer />
						<GoTopBtn />
					</>
				);
			}}
		</AngpaoWrapper>
	);
};
