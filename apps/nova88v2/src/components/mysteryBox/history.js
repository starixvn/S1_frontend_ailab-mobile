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
		canDrawPrize,
		eventId: eventIds.mysteryBox
	});

	const arr = history?.map(data => {
		return (
			<Item
				key={`MysteryBox-${data.drawTime}`}
				drawTime={data.drawTime}
				prizeName={data.prizeName}
			/>
		);
	});

	return (
		<div className="list active">
			<ul>
				<li>
					{i18n.lbl_Date} ({moment().format("Z")})
				</li>
				<li>
					{i18n.lbl_MysteryBox_Awards} (
					{i18n[`Currency_${userInfo.currencyId}`]})
				</li>
			</ul>
			{history?.length > 0 ? (
				arr
			) : (
				<div className="nodata icon icon-nodata">
					<div className="txt-white">{i18n.msg_NoData}</div>
				</div>
			)}
		</div>
	);
};

History.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setPopBox: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
	canDrawPrize: PropTypes.bool.isRequired
};

const Item = ({ drawTime, prizeName }) => {
	return (
		<ul>
			<li>{moment(drawTime).format("YYYY/MM/DD HH:mm:ss")}</li>
			<li>{prizeName}</li>
		</ul>
	);
};

Item.propTypes = {
	drawTime: PropTypes.string.isRequired,
	prizeName: PropTypes.string.isRequired
};

export default History;
