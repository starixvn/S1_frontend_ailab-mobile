import React from "react";

const Btn = ({ isOpen, displayText, onClick, value }) => (
	<button className={isOpen ? "open" : ""} value={value} onClick={onClick}>
		{displayText}
	</button>
);

const BtnBar = ({
	btnListClass = "filterBtn",
	defBtns,
	i18n = {},
	selected,
	handleSelect,
	mainKey
}) => {
	const rows = Object.values(defBtns).map(item => (
		<Btn
			key={`${mainKey}-${item.value}`}
			isOpen={item.value === selected}
			displayText={i18n[item.displayKey]}
			onClick={handleSelect}
			value={item.value}
		/>
	));
	return <div className={btnListClass}>{rows}</div>;
};

export default BtnBar;
