import React, { useRef, useEffect, useState } from "react";
import api from "../../service/api";

const AngPowPopBox = ({ setAngPowPop }) => {
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
					if (res.data.errorCode === 0) {
						setPrize(res.data.data.prizeName);
					} else if (
						res.data.errorCode !== 0 &&
						res.data.errorCode !== 100
					) {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}]${res.data.message}`
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
	}, []);

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
				<div className="title">Important Note</div>
				<div>
					恭喜发财! <br />
					恭喜，您的红包
				</div>
				<div className="am">{prize}</div>
				<div>已汇入您的户口！</div>
			</div>
		</div>
	);
};

export default AngPowPopBox;
