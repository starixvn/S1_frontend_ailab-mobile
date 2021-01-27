import React, { useState, useEffect, useRef, useContext } from "react";
import moment from "moment";
import { i18nContext, popBoxContext } from "../common/context";
import Condition from "./condition";
import History from "./history";
import AngPowPopBox from "./popBox.angPow";
import api from "../../service/api";

const AngPow = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const [currentTab, setCurrentTab] = useState("condition");
	const [AngPowPop, setAngPowPop] = useState(false);
	const [canDrawPrize, setCanDrawPrize] = useState(false);

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api.events.CheckDrawPrize({ eventId: 0 }).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setCanDrawPrize(true);
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
	}, [i18n, setPopBox]);

	const drawAngPow = () => {
		if (canDrawPrize) {
			setAngPowPop(true);
		}
	};

	const clickTab = tab => {
		if (tab !== currentTab) {
			setCurrentTab(tab);
		}
	};

	return (
		<>
			<div className="animation">
				<div
					className={`angpao${
						canDrawPrize === false ? " active" : ""
					}`}
					onClick={drawAngPow}>
					<div className="redbox" />
					{canDrawPrize === false ? (
						<div className="time">
							NEXT
							<div>
								<Counter />
							</div>
						</div>
					) : null}
				</div>
			</div>
			<div className="filterBtn">
				<button
					className={currentTab === "condition" ? "open" : ""}
					open
					onClick={() => clickTab("condition")}>
					Ang Pao Awards
				</button>
				<button
					className={currentTab === "history" ? "open" : ""}
					onClick={() => clickTab("history")}>
					MY Ang Pao
				</button>
			</div>

			{currentTab === "history" ? <History /> : <Condition />}
			{AngPowPop ? <AngPowPopBox setAngPowPop={setAngPowPop} /> : null}
		</>
	);
};

const Counter = () => {
	const end = moment().endOf("day");
	const [count, setCount] = useState("");

	setInterval(() => {
		const timeLeft = moment(end.diff(moment()));
		const formatted = timeLeft.format("HH:mm:ss");
		setCount(formatted);
	}, 1000);

	return <>{count}</>;
};

export default AngPow;
