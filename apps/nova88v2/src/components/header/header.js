import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext } from "Context";
import { Link } from "@Router";
import Logo from "../common/logo";
import path from "../../path";

const HeaderTitle = ({ title = "", link = "", titleClass = "title", navBar }) =>
	title ? (
		<>
			<div className={titleClass}>
				{link} {title}
			</div>
			{navBar}
		</>
	) : null;

const Header = ({
	title,
	hideLogo,
	filter,
	children,
	link,
	titleClass = "title",
	navBar,
	setShowingShortcut,
	id
}) => {
	const { userInfo } = useContext(userInfoContext);
	const headerClassName = !title ? "" : "header";

	return (
		<header className={headerClassName} id={id}>
			{hideLogo ? null : (
				<a href={`/${userInfo.langId}`}>
					<Logo langId={userInfo.langId} />
				</a>
			)}
			{title ? (
				<HeaderTitle
					title={title}
					link={link}
					titleClass={titleClass}
					navBar={navBar}
				/>
			) : (
				<HeaderInfo userInfo={userInfo} />
			)}
			{filter || null}
			{children}
		</header>
	);
};

const HeaderInfo = ({ userInfo }) => {
	return (
		<div className="headerInfo">
			{userInfo.isLogin ? (
				<Link className="MemberID" to={path.profile.root}>
					{userInfo.userName}
				</Link>
			) : null}
		</div>
	);
};

HeaderInfo.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

Header.defaultProps = {
	filter: null,
	title: null,
	hideLogo: false,
	link: null,
	children: null,
	titleClass: undefined,
	navBar: null,
	setShowingShortcut: () => null,
	id: "header"
};

Header.propTypes = {
	filter: PropTypes.node,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	hideLogo: PropTypes.bool,
	link: PropTypes.node,
	children: PropTypes.node,
	titleClass: PropTypes.string,
	navBar: PropTypes.node,
	setShowingShortcut: PropTypes.func,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

HeaderTitle.defaultProps = {
	title: false,
	link: "",
	titleClass: null,
	navBar: null
};

HeaderTitle.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	link: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	titleClass: PropTypes.string,
	navBar: PropTypes.node
};

export default Header;
