import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDrawPrize } from "../hook/useDrawPrize";
import { eventIds } from "../../datas/eventId";
import { cloudBannerImgURL } from "../../config";

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
		alreadyDrawnKey: "lbl_MysteryBox_AlreadyDrawn"
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
			<div className="eventpop">
				<img
					className="redbox"
					src={`${cloudBannerImgURL}/h5/img/event/mysterybox/angpao_backa.png`}
					alt="Mystery Box"
				/>
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className={`pop ${animationOver ? " active" : ""}`}>
					<div className="popTit text-center">
						{i18n.lbl_MysteryBox_Congratulations}
						<button
							className="icon icon-close"
							onClick={closePop}
						/>
					</div>
					<div className="popTxt text-center">
						<div>{i18n.lbl_MysteryBox_CreditedAccount1}</div>
						<div className="blackInfo">{prize}</div>
						<div>{i18n.lbl_MysteryBox_CreditedAccount2}</div>
					</div>
				</div>
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
