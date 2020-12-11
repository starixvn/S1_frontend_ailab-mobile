import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

const useHandleBreadcrumb = ({ locationInfo = {}, skipLink = [], root }) => {
	const [linkList, setLinkList] = useState([]);

	useEffect(() => {
		const { path } = locationInfo;
		let beforeRootPath = path.split(root);
		let urlParams =
			beforeRootPath.length > 1
				? beforeRootPath[1].split("/:")
				: path.split("/:");
		urlParams = [root, ...urlParams];

		if (urlParams.length > 0) {
			let prevPath = "";
			let result = urlParams
				.filter(u => u && !skipLink.includes(u))
				.map(u => {
					prevPath += `/${locationInfo[u] ?? u}`;
					const link = {
						urlParam: u,
						path: prevPath,
						displayKey: u
					};
					return link;
				});

			setLinkList(result);
		}
	}, [locationInfo, skipLink, root]);

	return { linkList };
};

export const Breadcrumbs = ({
	root,
	mainKey,
	locationInfo = {},
	skipLink = []
}) => {
	const { linkList } = useHandleBreadcrumb({ locationInfo, skipLink, root });
	const rows = linkList.map((l, lidx) => {
		return (
			<li
				key={`${mainKey}-breadcrumb-${l.displayKey}`}
				className={`icon breadcrumb-item${
					lidx === linkList.length - 1 ? " open" : ""
				}`}>
				<Link to={l.path}>{l.displayKey}</Link>
			</li>
		);
	});
	return (
		<nav className="breadcrumb">
			<ul>{rows}</ul>
		</nav>
	);
};

Breadcrumbs.propTypes = {
	root: PropTypes.string.isRequired
};
