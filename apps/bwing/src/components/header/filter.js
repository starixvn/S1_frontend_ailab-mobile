import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "Context";
import { defStreamingCategory } from "../streaming/defStreaming";

const Panel = ({ handleSelect, selected }) => {
	const { i18n } = useContext(i18nContext);
	const clickQuickSelect = type => {
		if (selected !== type) {
			handleSelect(type);
		}
	};

	const quickSelectArr = Object.values(defStreamingCategory).map(item => {
		return (
			<div
				key={`streaming-quickSelect-${item.displayKey}`}
				className={`lobby-scrollbar-item ${
					item.type === selected ? "active" : ""
				}`}
				onClick={clickQuickSelect.bind(this, item.type)}>
				{i18n[item.displayKey] ?? item.displayKey}
			</div>
		);
	});

	return <div className="lobby-scrollbar">{quickSelectArr}</div>;
};

Panel.propTypes = {
	handleSelect: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired
};

export default Panel;
