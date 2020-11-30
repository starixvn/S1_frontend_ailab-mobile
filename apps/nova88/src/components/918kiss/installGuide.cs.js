import React from "react";
import Step1 from "../../styles/img/918/cs/Help_01.png";
import Step2 from "../../styles/img/918/cs/Help_02.png";
import Step3 from "../../styles/img/918/cs/Help_03.png";
import Step4 from "../../styles/img/918/cs/Help_04.png";
import Step5 from "../../styles/img/918/cs/Help_05.png";
import Step6 from "../../styles/img/918/cs/Help_06.png";
import Step7 from "../../styles/img/918/cs/Help_07.png";
import Step8 from "../../styles/img/918/cs/Help_08.png";
import Step9 from "../../styles/img/918/cs/Help_09.png";
import Step10 from "../../styles/img/918/cs/Help_10.png";
import Step11 from "../../styles/img/918/cs/Help_11.png";

export default ({ displayText }) => (
	<div className="installGuide">
		{displayText}
		<div>
			<img src={Step1} alt="step1" />
			<img src={Step2} alt="step2" />
			<img src={Step3} alt="step3" />
			<img src={Step4} alt="step4" />
			<img src={Step5} alt="step5" />
			<img src={Step6} alt="step6" />
			<img src={Step7} alt="step7" />
			<img src={Step8} alt="step8" />
			<img src={Step9} alt="step9" />
			<img src={Step10} alt="step10" />
			<img src={Step11} alt="step11" />
		</div>
	</div>
);
