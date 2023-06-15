import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useGetPrizeList } from "../hook/useGetPrizeList";
import { eventIds } from "../../datas/eventId";

const History = ({ i18n, userInfo, setPopBox, setLoading, canDrawPrize }) => {
	const { history } = useGetPrizeList({
		i18n,
		userInfo,
		setPopBox,
		setLoading,
		eventId: eventIds.luckyWheel,
		canDrawPrize
	});

	const arr = history?.map(data => {
		return (
			<Item
				key={`luckyWheel-${data.drawTime}`}
				drawTime={data.drawTime}
				prizeName={data.prizeName}
			/>
		);
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
				{arr}
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

const Item = ({ drawTime, prizeName }) => {
	return (
		<div>
			<div>{moment(drawTime).format("YYYY/MM/DD HH:mm:ss")}</div>
			<div>{prizeName}</div>
		</div>
	);
};

Item.propTypes = {
	drawTime: PropTypes.string.isRequired,
	prizeName: PropTypes.string.isRequired
};

export default History;
