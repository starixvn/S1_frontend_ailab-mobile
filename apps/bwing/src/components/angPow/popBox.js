import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDrawPrize } from "../hook/useDrawPrize";
import { eventIds } from "../../datas/eventId";

const AngPowPopBox = ({ i18n, setDrawPopOpen, setCanDrawPrize, setPopBox }) => {
	const [animationOver, setAnimationOver] = useState(false);

	const { prize, jackpot } = useDrawPrize({
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
			<Animation
				jackpot={jackpot}
				animationOver={animationOver}
				prize={prize}
				i18n={i18n}
			/>
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

AngPowPopBox.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setDrawPopOpen: PropTypes.func.isRequired,
	setCanDrawPrize: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired
};

const Animation = ({ jackpot, animationOver, prize, i18n }) => {
	return jackpot ? (
		<div className={`gold${animationOver ? "" : " active"}`}>
			<div className="textBox">
				<p className="bigtitle">{prize}</p>
			</div>
			<div className="moneyArea">
				<div className="box" />
				<div className="l" />
				<div className="l" />
				<div className="l" />
				<div className="l" />
				<div className="l" />
			</div>
		</div>
	) : (
		<div className={`popangpao${animationOver ? "" : " active"}`}>
			<div className="angpao pop ">
				<div className="top">
					<div className="badge" />
				</div>
				<div className="top2">
					<div className="badge" />
				</div>
				<div className="textBox">
					<p className="bigtitle">{i18n.lbl_FreeAngPow}</p>
				</div>
				<div className="moneyArea">
					<div className="box" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
				</div>
			</div>
		</div>
	);
};

Animation.propTypes = {
	jackpot: PropTypes.bool.isRequired,
	animationOver: PropTypes.bool.isRequired,
	prize: PropTypes.string.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default AngPowPopBox;
