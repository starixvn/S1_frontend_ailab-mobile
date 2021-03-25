import React, { useContext } from "react";
import PropTypes from "prop-types";
import { userInfoContext, i18nContext } from "Context";
import { Link } from "@Router";
import Logo from "../common/logo";
import path from "../../path";

const HeaderTitle = ({ title = "", link = "" }) =>
	title ? (
		<div className="title">
			{link} {title}
		</div>
	) : null;

const Header = ({
	title,
	hideLogo,
	filter,
	children,
	link,
	setShowingShortcut
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
				<HeaderTitle title={title} link={link} />
			) : (
				<HeaderBtn
					userInfo={userInfo}
					setShowingShortcut={setShowingShortcut}
				/>
			)}
			{filter || null}
			{children}
		</header>
	);
};

const HeaderBtn = ({ userInfo, setShowingShortcut }) => {
	const { i18n } = useContext(i18nContext);

	let content = null;
	if (userInfo?.isLogin) {
		content = (
			<HeaderInfo
				userName={userInfo?.userName}
				setShowingShortcut={setShowingShortcut}
			/>
		);
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

const HeaderInfo = ({ userName, setShowingShortcut }) => {
	const showShortcut = () => {
		setShowingShortcut(prev => !prev);
	};

	return (
		<div className="headerInfo" onClick={showShortcut}>
			<button className="MemberID">
				{userName}
				<span className="icon icon-arrow_drop_down" />
			</button>
		</div>
	);
};

HeaderInfo.defaultProps = {
	userName: "",
	setShowingShortcut: () => null
};

HeaderInfo.propTypes = {
	userName: PropTypes.string,
	setShowingShortcut: PropTypes.func
};

Header.defaultProps = {
	filter: null,
	title: null,
	hideLogo: false,
	link: null,
	children: null,
	setShowingShortcut: () => null
};

Header.propTypes = {
	filter: PropTypes.node,
	title: PropTypes.string,
	hideLogo: PropTypes.bool,
	link: PropTypes.node,
	children: PropTypes.node,
	setShowingShortcut: PropTypes.func
};

HeaderTitle.defaultProps = {
	title: null,
	link: null
};

HeaderTitle.propTypes = {
	title: PropTypes.string,
	link: PropTypes.string
};

export default Header;
