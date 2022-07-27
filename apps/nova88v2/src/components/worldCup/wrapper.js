import React, { useState } from "react";
import PropTypes from "prop-types";
import { worldCupPopBox } from "../common/context";
import WorldCupPopBox from "./promoPopbox";

const Wrapper = ({ children }) => {
	const [worldCupBox, setWorldCupBox] = useState({ isOpen: false });

	return (
		<worldCupPopBox.Provider value={{ worldCupBox, setWorldCupBox }}>
			{children}
			<WorldCupPopBox />
		</worldCupPopBox.Provider>
	);
};

Wrapper.propTypes = {
	children: PropTypes.node.isRequired
};

export default Wrapper;
