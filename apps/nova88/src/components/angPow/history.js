import React, { useState, useRef, useEffect, useContext } from "react";
import moment from "moment";
import { i18nContext, popBoxContext } from "../common/context";
import api from "../../service/api";

const History = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [history, setHistory] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api.events.GetCustDrawPrizeList({ eventId: 0 }).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setHistory(res.data.data);
					} else if (
						res.data.errorCode !== 0 &&
						res.data.errorCode !== 100
					) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	}, [i18n, setPopBox]);

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
					<td>Date ( +08:00 )</td>
					<td>Awards ( MYR )</td>
				</tr>
				{history?.length > 0 ? (
					arr
				) : (
					<tr>
						<td colSpan="2">
							<div className="nodata icon icon-nodata">
								<div className="txt-white">
									No information is available now.
								</div>
							</div>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

const Item = ({ drawTime, prizeName }) => {
	return (
		<tr>
			<td>{moment(drawTime).format("YYYY/MM/DD hh:mm:ss")}</td>
			<td>
				<div>{prizeName}</div>
			</td>
		</tr>
	);
};

export default History;
