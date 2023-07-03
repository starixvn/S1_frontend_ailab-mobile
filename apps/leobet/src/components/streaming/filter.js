import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "Context";
import { defStreamingCategory } from "./defStreaming";

const Panel = ({ handleSelect, selected }) => {
	const wrapperDiv = useRef(null);
	const { i18n } = useContext(i18nContext);

	const clickQuickSelect = type => {
		if (selected !== type) {
			handleSelect(type);
		}
	};

	const quickSelectArr = Object.values(defStreamingCategory).map(item => {
		return (
			<button
				key={`streaming-quickSelect-${item.displayKey}`}
				className={item.type === selected ? "active" : ""}
				onClick={clickQuickSelect.bind(this, item.type)}>
				{i18n[item.displayKey] ?? item.displayKey}
			</button>
		);
	});

	const clickToScroll = () => {
		wrapperDiv.current.scrollTo({
			left: wrapperDiv.current.scrollLeft + 80,
			behavior: "smooth"
		});
	};

	return (
		<div className="quickSelect" ref={wrapperDiv}>
			{quickSelectArr}
			<i
				className="icon icon-keyboard_arrow_right"
				onClick={clickToScroll}
			/>
		</div>
	);
};

Panel.propTypes = {
	handleSelect: PropTypes.func.isRequired
};

export default Panel;
