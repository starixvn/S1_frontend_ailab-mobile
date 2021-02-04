import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { api_events_GetCustDrawPrizeList } from "../../service/api/events";

const useGetPrizeList = ({
	i18n,
	userInfo,
	setPopBox,
	setLoading,
	canDrawPrize
}) => {
	const [history, setHistory] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin === true) {
			setLoading(true);
			api_events_GetCustDrawPrizeList({ eventId: 0 }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setHistory(res.data.data);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}]${res.data.message}`
							});
						}
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setLoading(false);
					}
				}
			);
		}
	}, [i18n, setPopBox, userInfo, setLoading, canDrawPrize]);

	return { history };
};

const History = ({ i18n, userInfo, setPopBox, setLoading, canDrawPrize }) => {
	const { history } = useGetPrizeList({
		i18n,
		userInfo,
		setPopBox,
		setLoading,
		canDrawPrize
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
