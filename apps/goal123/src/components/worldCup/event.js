import React, { useEffect, useState, useContext, useRef } from "react";
import { userInfoContext, popBoxContext, i18nContext } from "../common/context";
import { api_worldCupPrediction_GetMemberDepositTicketInfo } from "../../service/api/worldCupPrediction";
import Info from "./event.info";
import Prediction from "./event.prediction";
import Terms from "./event.terms";

const Event = () => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [info, setInfo] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			GetMemberDepositTicketInfo();
		}
	}, [userInfo.isLogin]);

	const GetMemberDepositTicketInfo = () => {
		api_worldCupPrediction_GetMemberDepositTicketInfo().then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;
					if (errorCode === 0) {
						setInfo(data);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			}
		);
	};

	return (
		<>
			{userInfo.isLogin && (
				<div className="ticket__body">
					<Info
						depositAmount={info?.DepositAmount}
						availableTickets={info?.availableTickets}
						usedTickets={info?.usedTickets}
						ticketLimit={info?.ticketLimit}
						userName={info?.userName}
						i18n={i18n}
					/>
					<Prediction
						userTicketResult={info?.userTicketResult}
						ticketOptions={info?.selectOptions}
						GetTicketInfo={GetMemberDepositTicketInfo}
						i18n={i18n}
					/>
				</div>
			)}

			<Terms langId={userInfo.langId} />
		</>
	);
};

export default Event;
