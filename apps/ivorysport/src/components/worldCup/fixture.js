import React, { useState, useEffect, useRef, useContext } from "react";
import { i18nContext, popBoxContext, userInfoContext } from "../common/context";
import {
	matchType,
	knockoutsEvent,
	defGroupsData
} from "./fixture.matches.def";
import api from "../../service/api";
import Groups from "./fixture.groups";
import Matches from "./fixture.matches";
import Prize from "./fixture.prize";

const defaultKnockoutsEvent = knockoutsEvent.roundOf16.eventName;
const defaultGroupsEvent = Object.keys(defGroupsData)[0];

const Fixture = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);
	const [prediction, setPrediction] = useState(null);
	const [matches, setMatches] = useState(matchType.groups);
	const [event, setEvent] = useState(defaultGroupsEvent);

	const clickMatchType = type => {
		if (type !== matches) {
			setMatches(type);
		}
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api.worldCupPrediction
			.GetWorldCupPredictionSetting({
				langId: userInfo.langId
			})
			.then(
				res => {
					if (isMountedRef.current) {
						const { data, errorCode, message } = res.data;
						if (errorCode === 0) {
							setPrediction(data);
						} else {
							setPopBox({
								isOpen: true,
								content: `[${errorCode}] ${message}`
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
					}
				}
			);
	}, []);

	useEffect(() => {
		const defaultEvent =
			matches === matchType.knockouts
				? defaultKnockoutsEvent
				: defaultGroupsEvent;

		setEvent(defaultEvent);
	}, [matches]);

	const selectEvent = ({ type, eventName }) => {
		if (matches === type) {
			setEvent(eventName);
		}
	};

	return (
		<div className="fixture">
			<div className="title">{i18n.lbl_fixture}</div>
			<Prize
				matches={matches}
				event={event}
				clickMatchType={clickMatchType}
				i18n={i18n}
			/>
			<div className="tab-group open">
				<Matches
					matches={matches}
					prediction={prediction}
					event={event}
					selectEvent={selectEvent}
					i18n={i18n}
					langId={userInfo.langId}
				/>
			</div>
			<Groups options={prediction?.selectOptions} i18n={i18n} />
		</div>
	);
};

export default Fixture;
