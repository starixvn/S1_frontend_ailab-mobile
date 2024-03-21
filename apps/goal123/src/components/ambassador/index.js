import React from "react";
import Banner from "./Banner";
import { AmbassadorIntro } from "./AmbassorIntro";
import Career from "./Career";
import Rewards from "./Rewards";
import AppSection from "./AppSection";

const SponsorContent = () => {
	return (
		<>
			<Banner />
			<AmbassadorIntro />
			<Career />
			<Rewards />
			<AppSection />
		</>
	);
};

export default SponsorContent;
