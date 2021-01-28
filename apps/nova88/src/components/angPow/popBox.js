import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../service/api";

const AngPowPopBox = ({ i18n, setAngPowPop, setCanDrawPrize, setPopBox }) => {
	const [prize, setPrize] = useState("");
	const [animationOver, setAnimationOver] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		setInterval(() => {
			setAnimationOver(true);
		}, 3000);
	}, []);

	useEffect(() => {
		api.events.DrawPrize({ eventId: 0 }).then(
			res => {
				if (isMountedRef.current) {
					if (
						res.data.errorCode === 0 ||
						res.data.errorCode === 100
					) {
						setPrize(res.data.data.prizeName);
						setCanDrawPrize(false);
					} else if (
						res.data.errorCode !== 0 &&
						res.data.errorCode !== 100
					) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}]${res.data.message}`
						});
						setAngPowPop(false);
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

	const closePop = () => {
		setAngPowPop(false);
	};

	return (
		<div id="popup" className="active">
			<div className="popangpao">
				<div className="redbox" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
			</div>
			<div className={`eventpop${animationOver ? " active" : ""}`}>
				<button className="icon icon-close" onClick={closePop} />
				<div className="title">{i18n.lbl_ImportantNote}</div>
				<div>
					{i18n.lbl_AngPow_Congratulations} <br />
					{i18n.lbl_AngPow_CreditedAccount1}
				</div>
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
