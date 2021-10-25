import React, { useContext, useRef } from "react";
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
			<a
				key={`streaming-quickSelect-${item.displayKey}`}
				className={item.type === selected ? "open" : ""}
				onClick={clickQuickSelect.bind(this, item.type)}>
				{i18n[item.displayKey] ?? item.displayKey}
			</a>
		);
	});

	return (
		<div className="sporttv">
			<div className="tag">{quickSelectArr}</div>
		</div>
	);
};

Panel.propTypes = {
	handleSelect: PropTypes.func.isRequired
};

export default Panel;
