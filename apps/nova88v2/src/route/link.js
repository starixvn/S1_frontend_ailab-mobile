/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, forwardRef } from "react";
import { Link as ReachRouterLink } from "@reach/router";
import PropTypes from "prop-types";
import { userInfoContext } from "../components/common/context";
import { GET_LANG_ID } from "../service/language";

export const Link = forwardRef((props, ref) => {
	const { userInfo } = useContext(userInfoContext);
	const langId = userInfo.langId ?? GET_LANG_ID();
	const to = props.to === "/" ? "" : props.to;
	const _passProps = { ...props, to: `/${langId}/${to}` };
	return <ReachRouterLink ref={ref} {..._passProps} />;
});

Link.propTypes = {
	to: PropTypes.string.isRequired
};
