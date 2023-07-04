import React from "react";
import PropTypes from "prop-types";
import moment, { HTML5_FMT } from "moment";
import { useGetPrizeList } from "../hook/useGetPrizeList";
import { eventIds } from "../../datas/eventId";

const { DATE, TIME_SECONDS } = HTML5_FMT;

const History = ({ i18n, userInfo, setPopBox, setLoading, canDrawPrize }) => {
	const { history } = useGetPrizeList({
		i18n,
		userInfo,
		setPopBox,
		setLoading,
		eventId: eventIds.luckyWheel,
		canDrawPrize
	});

	return history?.length > 0 ? (
		<div className="eventList">
			<div className="listBoxShadow">
				<div>
					<div>
						{i18n.lbl_Date} ({moment().format("Z")})
					</div>
					<div>
						{i18n.lbl_MysteryBox_Awards} (
						{i18n[`Currency_${userInfo.currencyId}`]})
					</div>
				</div>
				{history?.map(data => (
					<div key={data.drawTime}>
						<div>
							{moment(data.drawTime).format(
								`${DATE} ${TIME_SECONDS}`
							)}
						</div>
						<div>{data.prizeName}</div>
					</div>
				))}
			</div>
		</div>
	) : (
		<div className="nodata icon icon-nodata">
			<div className="txt-white">{i18n.msg_NoData}</div>
		</div>
	);
};

History.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setPopBox: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired
};

export default History;
