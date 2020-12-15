import React from "react";

const Btn = ({ isOpen, displayText, onClick, value }) => (
	<button className={isOpen ? "open" : ""} value={value} onClick={onClick}>
		{displayText}
	</button>
);

const BtnBar = ({
	btnListClass = "ranBotton",
	defBtns,
	i18n = {},
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
			onClick={handleSelect.bind(
				this,
				item.value,
				isLogin,
				item.beforeLogin
			)}
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

export default BtnBar;
