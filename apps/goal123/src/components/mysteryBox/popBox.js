import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import eventImg from "../../styles/img/event/box/box_open.png";
import { useDrawPrize } from "../hook/useDrawPrize";
import { eventIds } from "../../datas/eventIds";

const MysteryBoxPop = ({
	i18n,
	setDrawPopOpen,
	setCanDrawPrize,
	setPopBox
}) => {
	const [animationOver, setAnimationOver] = useState(false);
	const { prize } = useDrawPrize({
		i18n,
		setDrawPopOpen,
		setCanDrawPrize,
		setPopBox,
		eventId: eventIds.mysteryBox,
		alreadyDrwanKey: "lbl_MysteryBox_AlreadyDrawn"
	});

	useEffect(() => {
		if (prize) {
			setInterval(() => {
				setAnimationOver(true);
			}, 2000);
		}
	}, [prize]);

	const closePop = () => {
		setDrawPopOpen(false);
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
	setDrawPopOpen: PropTypes.func.isRequired,
	setCanDrawPrize: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default MysteryBoxPop;
