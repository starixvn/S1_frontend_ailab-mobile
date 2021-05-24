import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext, i18nContext } from "Context";
import { Link } from "@Router";
import Logo from "../common/logo";
import path from "../../path";
import Balance from "./balance";

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
	id,
	hideId
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const headerClassName = !title ? "" : "header";

	return (
		<header className={headerClassName} id={hideId ? "" : id}>
			{hideLogo ? null : (
				<>
					{userInfo.isLogin ? (
						<Balance i18n={i18n} userInfo={userInfo} />
					) : null}
					<a href={`/${userInfo.langId}`}>
						<Logo langId={userInfo.langId} />
					</a>
				</>
			)}
			{title ? (
				<HeaderTitle
					title={title}
					link={link}
					titleClass={titleClass}
					navBar={navBar}
				/>
			) : (
				<HeaderInfo userInfo={userInfo} i18n={i18n} />
			)}
			{filter || null}
			{children}
		</header>
	);
};

const HeaderInfo = ({ userInfo, i18n }) => {
	return (
		<div className="headerInfo">
			{userInfo.isLogin ? (
				<>
					{i18n.lbl_Welcome}
					<Link className="MemberID" to={path.profile.root}>
						{userInfo.userName}
					</Link>
				</>
			) : null}
		</div>
	);
};

HeaderInfo.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
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
	id: "header",
	hideId: false
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
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	hideId: PropTypes.bool
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
