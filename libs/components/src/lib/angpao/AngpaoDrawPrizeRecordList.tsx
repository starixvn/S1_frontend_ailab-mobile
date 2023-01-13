import React from "react";
import moment, { HTML5_FMT } from "moment";
import { IDrawPrizeRecordData } from "@ailab-mobile/wrapper";
import { useTranslation } from "react-i18next";

const { DATE, TIME_SECONDS } = HTML5_FMT;

interface IAngpaoDrawPrizeListProps {
	loading: boolean;
	currencyId: number;
	drawPrizeRecordList: IDrawPrizeRecordData[];
}

const AngpaoDrawPrizeList = ({
	loading,
	currencyId,
	drawPrizeRecordList
}: IAngpaoDrawPrizeListProps) => {
	const { t } = useTranslation();
	return (
		<>
			<div className="title">{t("Label_AngpaoLuckyDrawRecord")}</div>
			<div className="eventList">
				<div>
					<div>
						{t("Label_Date")} ( {moment().format("Z")})
					</div>
					<div>
						{t("Label_Awards")} ( {t(`Currency_${currencyId}`)} )
					</div>
				</div>
				{!loading &&
					drawPrizeRecordList.map(({ drawTime, prizeName }) => (
						<div key={drawTime}>
							<div>
								{moment(drawTime).format(
									`${DATE} ${TIME_SECONDS}`
								)}
							</div>
							<div>{prizeName}</div>
						</div>
					))}

				{/* <!-- 無資料時顯示icon+文字 --> */}
				{!loading && drawPrizeRecordList.length === 0 && (
					<div className="nodata icon icon-nodata">
						<div>{t("Label_No_InformationNow")}</div>
					</div>
				)}
			</div>
		</>
	);
};

export default AngpaoDrawPrizeList;
