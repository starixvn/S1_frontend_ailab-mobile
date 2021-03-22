import React from "react";
import PropTypes from "prop-types";

const Btn = ({ isOpen, displayText, value, isLogin, beforeLogin, onClick }) => {
	const handleClick = () => onClick(value, isLogin, beforeLogin);
	return (
		<button
			className={isOpen ? "active" : ""}
			value={value}
			onClick={handleClick}>
			{displayText}
		</button>
	);
};

Btn.defaultProps = {
	isOpen: false,
	displayText: "",
	value: "",
	isLogin: false,
	beforeLogin: false
};

Btn.propTypes = {
	isOpen: PropTypes.bool,
	displayText: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClick: PropTypes.func.isRequired,
	isLogin: PropTypes.bool,
	beforeLogin: PropTypes.bool
};

const BtnBar = ({
	btnListClass,
	defBtns,
	i18n,
	selected,
	handleSelect,
	mainKey,
	isLogin,
	title
}) => {
	const rows = Object.values(defBtns).map(item => (
		<Btn
			key={`${mainKey}-${item.value}`}
			isOpen={item.value === selected}
			displayText={i18n[item.displayKey]}
			value={item.value}
			isLogin={isLogin}
			beforeLogin={item.beforeLogin}
			onClick={handleSelect}
		/>
	));

	const btnList = <div className={btnListClass}>{rows}</div>;

	return title ? (
		<>
			<div className="text">{title}</div>
			{btnList}
		</>
	) : (
		btnList
	);
};

BtnBar.defaultProps = {
	btnListClass: "filterBtn",
	mainKey: "",
	isLogin: false,
	title: null
};

BtnBar.propTypes = {
	btnListClass: PropTypes.string,
	defBtns: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.any).isRequired,
	selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		.isRequired,
	handleSelect: PropTypes.func.isRequired,
	mainKey: PropTypes.string,
	isLogin: PropTypes.bool,
	title: PropTypes.string
};

export default BtnBar;
