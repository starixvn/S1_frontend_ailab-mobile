import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext, i18nContext } from "Context";
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
	navBar
}) => {
	const { userInfo } = useContext(userInfoContext);
	const headerClassName = !title ? "" : "header";

	return (
		<header className={headerClassName} id="header">
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
				<HeaderBtn userInfo={userInfo} />
			)}
			{filter || null}
			{children}
		</header>
	);
};

const HeaderBtn = ({ userInfo }) => {
	const { i18n } = useContext(i18nContext);

	let content = null;
	if (userInfo?.isLogin) {
		content = <HeaderInfo userName={userInfo?.userName} />;
	} else {
		content = (
			<div className="headerButton">
				<Link
					className="loginBtn"
					to={path.login.root}
					state={{ fromHeader: true }}>
					{i18n.lbl_Login}
				</Link>
				<Link
					className="joinBtn"
					to={path.join.root}
					state={{ fromHeader: true }}>
					{i18n.lbl_JoinNow}
				</Link>
			</div>
		);
	}

	return content;
};

const HeaderInfo = ({ userName }) => {
	return (
		<div className="headerInfo">
			<Link className="MemberID" to={path.profile.root}>
				{userName}
				<span className="icon icon-arrow_drop_down" />
			</Link>
		</div>
	);
};

HeaderInfo.defaultProps = {
	userName: ""
};

HeaderInfo.propTypes = {
	userName: PropTypes.string
};

Header.defaultProps = {
	filter: null,
	title: null,
	hideLogo: false,
	link: null,
	children: null,
	titleClass: undefined,
	navBar: null
};

Header.propTypes = {
	filter: PropTypes.node,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	hideLogo: PropTypes.bool,
	link: PropTypes.node,
	children: PropTypes.node,
	titleClass: PropTypes.string,
	navBar: PropTypes.node
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
