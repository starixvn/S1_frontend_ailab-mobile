import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { CurrenciesEnum, isDateRange } from "@ailab-mobile/common";
import { Angpao } from "@ailab-mobile/components";
import { AngpaoWrapper, DrawPrizeEventIdEnum } from "@ailab-mobile/wrapper";
import {
	defNavPanel,
	navContext,
	userInfoContext
} from "../components/common/context";
import Footer from "../components/common/footer";
import GoTopBtn from "../components/common/goTopBtn";

// * 活動時間
export const angPaoEventPeriod = {
	startDate: "2023-01-21 00:00:00",
	endDate: "2023-02-05 23:59:59"
};

export default () => {
	const { setNav } = useContext(navContext);
	const { userInfo } = useContext(userInfoContext);

	const openLoginPopBox = () => {
		setNav(defNavPanel.login);
	};

	// * 活動時間不然範圍內導轉回首頁
	if (!isDateRange(angPaoEventPeriod)) {
		return <Redirect to="/" noThrow />;
	}

	return (
		<AngpaoWrapper
			isLogin={userInfo?.isLogin}
			eventId={DrawPrizeEventIdEnum.AngpaoBwing}
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
						<Angpao
							isLogin={userInfo?.isLogin}
							currencyId={CurrenciesEnum.VN}
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
