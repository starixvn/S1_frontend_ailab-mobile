import React, { useState } from "react";
import PropTypes from "prop-types";
import { referralPopBox } from "../common/context";
import ReferralPopbox from "./referral.popbox";

const Wrapper = ({ children }) => {
	const [referralBox, setReferralBox] = useState({ isOpen: false });

	return (
		<referralPopBox.Provider value={{ referralBox, setReferralBox }}>
			{children}
			<ReferralPopbox />
		</referralPopBox.Provider>
	);
};

Wrapper.propTypes = {
	children: PropTypes.node.isRequired
};

export default Wrapper;
