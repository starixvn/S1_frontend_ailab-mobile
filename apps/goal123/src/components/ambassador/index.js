import React from "react";
import AmbassadorIntro from "./AmbassadorIntro";
import CareerSection from "./CareerSection";
import RewardSection from "./RewardSection";
import AppDownloadSection from "./AppDownloadSection";
import AmbassadorBanner from "./AmbassadorBanner";

const AmbassadorContent = () => {
	return (
		<>
			<AmbassadorBanner />
			<AmbassadorIntro />
			<CareerSection />
			<RewardSection />
			<AppDownloadSection />
		</>
	);
};

export default AmbassadorContent;
