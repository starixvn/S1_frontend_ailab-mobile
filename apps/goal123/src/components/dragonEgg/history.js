import React, { useState, useEffect } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useGragonEgg } from "@ailab-mobile/hooks";
import { eventIds } from "../../datas/eventIds";

const History = () => {
	const { t } = useTranslation();

	const [history, setHistory] = useState([]);

	const { eggTicket, getDrawPrizeList } = useGragonEgg();

	const getPrizeList = async () => {
		const { data } = await getDrawPrizeList({
			eventId: eventIds.dragonEgg
		});

		setHistory(data);
	};

	useEffect(() => {
		getPrizeList();
	}, [eggTicket]);

	return (
		history?.length > 0 && (
			<div className="event-history">
				<div className="event-history-title">
					{t("lbl_DragonEgg_RewardHistory")}
				</div>
				<div className="event-history-table">
					<div className="top-title">
						<div>{t("lbl_Date")}</div>
						<div>{t("lbl_Referral_rewards")}</div>
					</div>
					<div className="content">
						{history?.map(({ drawTime, prizeName }) => (
							<div key={`${drawTime}-${prizeName}`}>
								<div>
									{moment(drawTime).format("MM/DD HH:mm:ss")}
								</div>
								<div>{prizeName}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	);
};

export default History;
