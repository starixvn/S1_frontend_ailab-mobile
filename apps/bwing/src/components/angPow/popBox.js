import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { api_events_DrawPrize } from "../../service/api/events";

const useDrawPrize = ({ i18n, setAngPowPop, setCanDrawPrize, setPopBox }) => {
	const [prize, setPrize] = useState("");
	const [jackpot, setJackpot] = useState(false);

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_events_DrawPrize({ eventId: 0 }).then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;
					if (errorCode === 0) {
						if (data.jackpot === 1) {
							setJackpot(true);
						}
						setPrize(data.prizeName);
						setCanDrawPrize(false);
					} else if (errorCode === 100 || errorCode === 101) {
						setCanDrawPrize(false);
						setAngPowPop(false);

						const msg =
							errorCode === 100
								? "lbl_AngPow_AlreadyDrawn"
								: "lbl_AngPow_NotWinning";
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n[msg]
						});
					} else {
						setAngPowPop(false);

						setPopBox({
							isOpen: true,
							content: `[${errorCode}]${message}`
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
	}, [i18n, setPopBox, setAngPowPop, setCanDrawPrize]);

	return { prize, jackpot };
};

const AngPowPopBox = ({ i18n, setAngPowPop, setCanDrawPrize, setPopBox }) => {
	const [animationOver, setAnimationOver] = useState(false);

	const { prize, jackpot } = useDrawPrize({
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
			<Animation
				jackpot={jackpot}
				animationOver={animationOver}
				prize={prize}
			/>
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

const Animation = ({ jackpot, animationOver, prize }) => {
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
					<p className="bigtitle">Free Ang Pow</p>
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
	prize: PropTypes.string.isRequired
};

export default AngPowPopBox;
