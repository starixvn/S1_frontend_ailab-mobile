import React from "react";
import PropTypes from "prop-types";
import { Wrapper } from "@ailab-mobile/promotion";
import PromotionContent from "./PromotionContent";

const Promotion = ({ location, navBar, ...rest }) => {
	return (
		<Wrapper {...rest}>
			<PromotionContent location={location} navBar={navBar} />
		</Wrapper>
	);
};

export default Promotion;

Promotion.defaultProps = {
	location: null,
	navBar: null
};

Promotion.propTypes = {
	location: PropTypes.objectOf(PropTypes.any),
	navBar: PropTypes.arrayOf(PropTypes.any)
};
