import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

const useHandleBreadcrumb = ({
	locationInfo = {},
	skipLink = [],
	root,
	customDisplayKey = {}
}) => {
	const [linkList, setLinkList] = useState([]);

	useEffect(() => {
		const { path } = locationInfo;
		const beforeRoot = path?.split(root);
		let urlParams =
			beforeRoot?.length > 1
				? beforeRoot[1].split("/:")
				: path?.split("/:");
		urlParams = urlParams ? [root, ...urlParams] : [root];

		const specialLink = {};
		if (skipLink.length > 0) {
			skipLink.forEach(skip => {
				let specialIdx = urlParams?.findIndex(u => u === skip);
				if (specialIdx > 0) {
					const specialItem = urlParams[specialIdx - 1];
					specialLink[
						specialItem
					] = `${locationInfo[specialItem]}/${locationInfo[skip]}`;
				}
			});
		}

		if (urlParams.length > 0) {
			let prevPath = "";
			let result = urlParams
				.filter(u => u && u !== "/" && !skipLink.includes(u))
				.map(u => {
					const currentPath = specialLink[u]
						? specialLink[u]
						: locationInfo[u] ?? u;
					prevPath += `/${currentPath}`;
					const link = {
						urlParam: u,
						path: prevPath,
						displayKey: customDisplayKey[u] ?? `lbl_${u}`
					};
					return link;
				});

			setLinkList(result);
		}
	}, [locationInfo, skipLink, root, customDisplayKey]);

	return { linkList };
};

export const Breadcrumbs = ({
	root,
	mainKey,
	locationInfo,
	skipLink,
	i18n,
	customDisplayKey
}) => {
	const { linkList } = useHandleBreadcrumb({
		locationInfo,
		skipLink,
		root,
		customDisplayKey
	});
	const rows = linkList.map((l, lidx) => {
		return (
			<li
				key={`${mainKey}-breadcrumb-${l.displayKey}`}
				className={`icon breadcrumb-item${
					lidx === linkList.length - 1 ? " open" : ""
				}`}>
				<Link to={l.path}>{i18n[l.displayKey] ?? l.displayKey}</Link>
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

Breadcrumbs.defaultProps = {
	skipLink: [],
	locationInfo: {},
	i18n: {},
	root: "",
	customDisplayKey: {}
};
