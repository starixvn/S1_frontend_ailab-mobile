import React, { useRef } from "react";
import Intro from "./intro";
import Fixture from "./fixture";
import Event from "./event";

const Main = () => {
	const eventPageRef = useRef(null);
	const scrollToEvent = () => {
		if (eventPageRef && eventPageRef.current) {
			eventPageRef.current.scrollIntoView({
				behavior: "smooth"
			});
		}
	};

	return (
		<>
			<Intro scrollToEvent={scrollToEvent} />
			<div className="eventPage__bottom" ref={eventPageRef}>
				<Fixture />
				<Event />
			</div>
		</>
	);
};

export default Main;
