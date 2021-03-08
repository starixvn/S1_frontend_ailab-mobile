import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import eventImg from "../../styles/img/event/angpao_inf.png";
import eventIdImg from "../../styles/img/event/angpao_inf_id.png";
import { useDrawPrize } from "../hook/useDrawPrize";
import { eventIds } from "../../datas/eventId";

const AngPowPopBox = ({
	i18n,
	setDrawPopOpen,
	setCanDrawPrize,
	setPopBox,
	langId
}) => {
	const [animationOver, setAnimationOver] = useState(false);

	const { prize } = useDrawPrize({
		i18n,
		setDrawPopOpen,
		setCanDrawPrize,
		setPopBox,
		eventId: eventIds.angPow,
		alreadyDrawnKey: "lbl_AngPow_AlreadyDrawn"
	});

	useEffect(() => {
		if (prize) {
			setInterval(() => {
				setAnimationOver(true);
			}, 3000);
		}
	}, [prize]);

	const closePop = () => {
		setDrawPopOpen(false);
	};

	return prize ? (
		<div id="popup" className="active">
			<div className="popangpao">
				<div className="redbox">
					<img
						className="redbox"
						src={langId === "id" ? eventIdImg : eventImg}
						alt={i18n.lbl_AngPow}
					/>
				</div>
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
	) : null;
};

AngPowPopBox.defaultProps = {
	langId: null
};

AngPowPopBox.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setDrawPopOpen: PropTypes.func.isRequired,
	setCanDrawPrize: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired,
	langId: PropTypes.string
};

export default AngPowPopBox;
