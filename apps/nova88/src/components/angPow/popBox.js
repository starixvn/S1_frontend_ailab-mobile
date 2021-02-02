import React, { useRef, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import api from "../../service/api";
import { loadingContext } from "../common/context";
import { siteId } from "../../config";

const useDrawPrize = ({ i18n, setAngPowPop, setCanDrawPrize, setPopBox }) => {
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
		api.events.DrawPrize({ eventId: siteId }).then(
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
	}, [i18n, setPopBox, setAngPowPop, setCanDrawPrize, setLoading]);

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
		if (prize) {
			setInterval(() => {
				setAnimationOver(true);
			}, 3000);
		}
	}, [prize]);

	const closePop = () => {
		setAngPowPop(false);
	};

	return prize ? (
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
	setAngPowPop: PropTypes.func.isRequired,
	setCanDrawPrize: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default AngPowPopBox;
