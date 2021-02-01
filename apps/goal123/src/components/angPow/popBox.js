import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { api_events_DrawPrize } from "../../service/api/events";

const useDrawPrize = ({ i18n, setAngPowPop, setCanDrawPrize, setPopBox }) => {
	const [prize, setPrize] = useState("");
	const [inProgress, setInProgress] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (!inProgress) {
			setInProgress(true);
			api_events_DrawPrize({ eventId: 0 }).then(
				res => {
					if (isMountedRef.current) {
						const { data, errorCode, message } = res.data;
						if (errorCode === 0) {
							setPrize(data.prizeName);
							setCanDrawPrize(false);
						} else if (errorCode === 100 || errorCode === 101) {
							const msg =
								errorCode === 100
									? "lbl_AngPow_AlreadyDrawn"
									: "lbl_AngPow_NotWinning";
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: i18n[msg]
							});
							setCanDrawPrize(false);
							setAngPowPop(false);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${errorCode}]${message}`
							});
							setAngPowPop(false);
						}
						setInProgress(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setInProgress(false);
					}
				}
			);
		}
	}, [i18n, setPopBox, setAngPowPop, setCanDrawPrize, inProgress]);

	return { prize };
};

const AngPowPopBox = ({ i18n, setAngPowPop, setCanDrawPrize, setPopBox }) => {
	const [animationOver, setAnimationOver] = useState(false);

	const { prize } = useDrawPrize({
		i18n,
		setAngPowPop,
		setCanDrawPrize,
		setPopBox
	});

	useEffect(() => {
		setInterval(() => {
			setAnimationOver(true);
		}, 3000);
	}, []);

	const closePop = () => {
		setAngPowPop(false);
	};

	return (
		<div id="popup" className="active">
			<div className="popangpao">
				<div className="redbox inner" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
			</div>
			<div className={`eventpop${animationOver ? " active" : ""}`}>
				<button className="icon icon-close" onClick={closePop} />
				<div className="title">{i18n.lbl_AngPow_Congratulations}</div>
				<div>{i18n.lbl_AngPow_CreditedAccount1}</div>
				<div className="am">{prize}</div>
				<div>{i18n.lbl_AngPow_CreditedAccount2}</div>
			</div>
		</div>
	);
};

AngPowPopBox.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setAngPowPop: PropTypes.func.isRequired,
	setCanDrawPrize: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default AngPowPopBox;
