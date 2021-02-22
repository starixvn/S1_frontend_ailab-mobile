import React, { useRef, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { loadingContext } from "../common/context";
import { api_events_DrawPrize } from "../../service/api/events";
import eventImg from "../../styles/img/event/box/box_open.png";

const useDrawPrize = ({
	i18n,
	setMysteryBoxPop,
	setCanDrawPrize,
	setPopBox
}) => {
	const { setLoading } = useContext(loadingContext);
	const [prize, setPrize] = useState("");

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		setLoading(true);
		api_events_DrawPrize({ eventId: 5 }).then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;
					if (errorCode === 0) {
						setPrize(data.prizeName);
						setCanDrawPrize(false);
					} else if (errorCode === 100) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.lbl_MysteryBox_AlreadyDrawn
						});
						setCanDrawPrize(false);
						setMysteryBoxPop(false);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}]${message}`
						});
						setMysteryBoxPop(false);
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
	}, [i18n, setPopBox, setMysteryBoxPop, setCanDrawPrize, setLoading]);

	return { prize };
};

const MysteryBoxPop = ({
	i18n,
	setMysteryBoxPop,
	setCanDrawPrize,
	setPopBox
}) => {
	const [animationOver, setAnimationOver] = useState(false);
	const { prize } = useDrawPrize({
		i18n,
		setMysteryBoxPop,
		setCanDrawPrize,
		setPopBox
	});

	useEffect(() => {
		if (prize) {
			setInterval(() => {
				setAnimationOver(true);
			}, 1000);
		}
	}, [prize]);

	const closePop = () => {
		setMysteryBoxPop(false);
	};

	return prize ? (
		<div id="popup" className="goldbox active">
			<div className="popgoldbox">
				<div className="redbox">
					<img
						className="goldbox__open"
						src={eventImg}
						alt="Mystery Box"
					/>
				</div>
			</div>
			<div
				className={`eventpop goldbox${animationOver ? " active" : ""}`}>
				<button className="icon icon-close" onClick={closePop} />
				<div className="title">
					{i18n.lbl_MysteryBox_Congratulations}
				</div>
				<div>{i18n.lbl_MysteryBox_CreditedAccount1}</div>
				<div className="am">{prize}</div>
				<div>{i18n.lbl_MysteryBox_CreditedAccount2}</div>
			</div>
		</div>
	) : null;
};

MysteryBoxPop.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setMysteryBoxPop: PropTypes.func.isRequired,
	setCanDrawPrize: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default MysteryBoxPop;
