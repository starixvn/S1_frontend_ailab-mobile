import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useGetPrizeList } from "../hook/useGetPrizeList";
import { eventIds } from "../../datas/eventIds";

const History = ({ i18n, userInfo, setPopBox, setLoading, canDrawPrize }) => {
	const { history } = useGetPrizeList({
		i18n,
		userInfo,
		setPopBox,
		setLoading,
		canDrawPrize,
		eventId: eventIds.angPow
	});

	const arr = history?.map(data => {
		return (
			<Item
				key={`AngPow-${data.drawTime}`}
				drawTime={data.drawTime}
				prizeName={data.prizeName}
			/>
		);
	});

	return (
		<table className="eventList active">
			<tbody>
				<tr>
					<td>
						{i18n.lbl_Date} ({moment().format("Z")})
					</td>
					<td>
						{i18n.lbl_Awards} (
						{i18n[`Currency_${userInfo.currencyId}`]})
					</td>
				</tr>
				{history?.length > 0 ? (
					arr
				) : (
					<tr>
						<td colSpan="2">
							<div className="nodata icon icon-nodata">
								<div className="txt-white">
									{i18n.msg_NoData}
								</div>
							</div>
						</td>
					</tr>
				)}
			</tbody>
		</table>
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
		<tr>
			<td>{moment(drawTime).format("YYYY/MM/DD HH:mm:ss")}</td>
			<td>
				<div>{prizeName}</div>
			</td>
		</tr>
	);
};

Item.propTypes = {
	drawTime: PropTypes.string.isRequired,
	prizeName: PropTypes.string.isRequired
};

export default History;
