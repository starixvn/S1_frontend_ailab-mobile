/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from "react";
import { Link as ReachRouterLink } from "@reach/router";
import PropTypes from "prop-types";

export const Link = forwardRef((props, ref) => {
	const to = props.to === "/" ? "" : props.to;
	const _passProps = { ...props, to: `/${to}` };
	return <ReachRouterLink ref={ref} {..._passProps} />;
});

Link.propTypes = {
	to: PropTypes.string.isRequired
};
