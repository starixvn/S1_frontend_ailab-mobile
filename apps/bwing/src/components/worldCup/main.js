import React from "react";
import Intro from "./intro";
import Fixture from "./fixture";
import Event from "./event";

const Main = () => {
	return (
		<div className="worldCup">
			<Intro />
			<Fixture />
			<Event />
		</div>
	);
};

export default Main;
