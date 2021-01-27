import React from "react";

const Condition = () => {
	return (
		<div className="eventModule active">
			<div className="title">New Year Free Ang Pao Giveaway</div>
			<div className="text-gray">Start: 11-02-2021 00:00:00 GMT+8</div>
			<div className="text-gray">End: 26-02-2021 23:59:59 GMT+8</div>
			<div>at least 1 Deposit and has at least 1 settled bet before</div>
			<div className="title">Other Conditions</div>
			<div className="text-gray">
				<ul>
					<li>
						Each account to participant 1 time/ per day on the first
						login
					</li>
					<li>
						Member won before can participant again tomorrow, 1 time
						a day only
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Condition;
