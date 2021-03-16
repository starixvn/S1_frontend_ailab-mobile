import React from "react";
import PropTypes from "prop-types";
import Radio from "./deposit.all.radio";

const GroupList = ({
	mainKey,
	dataList,
	SelectPayment,
	selected,
	title,
	imgKey,
	idKey,
	bindFullObj,
	prefixImgUrl,
	imgKeyWithExtension,
	bindingItem
}) => {
	const rows = dataList?.map(data => {
		const _mainKey = `${mainKey}-${data[idKey]}`;
		return (
			<Radio
				key={_mainKey}
				id={`${_mainKey}-radio`}
				radioGroup={mainKey}
				imgUrl={`${prefixImgUrl}${
					imgKeyWithExtension ? data[imgKey] : `${data[imgKey]}.png`
				}`}
				imgAlt={data[imgKey] ?? ""}
				onChange={SelectPayment.bind(
					this,
					bindFullObj ? data : data[idKey],
					bindingItem
				)}
				isSelect={selected === data[idKey]}
			/>
		);
	});
	return (
		<>
			<div className="title">
				<span className="text-org">*</span>
				{title}
			</div>
			<div className="selectModule">{rows}</div>
		</>
	);
};

GroupList.defaultProps = {
	dataList: null,
	selected: null,
	bindFullObj: false,
	imgKeyWithExtension: false,
	bindingItem: null
};

GroupList.propTypes = {
	dataList: PropTypes.arrayOf(PropTypes.object),
	SelectPayment: PropTypes.func.isRequired,
	selected: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.object
	]),
	title: PropTypes.string.isRequired,
	mainKey: PropTypes.string.isRequired,
	imgKey: PropTypes.string.isRequired,
	idKey: PropTypes.string.isRequired,
	bindFullObj: PropTypes.bool,
	prefixImgUrl: PropTypes.string.isRequired,
	imgKeyWithExtension: PropTypes.bool,
	bindingItem: PropTypes.objectOf(PropTypes.any)
};

export default GroupList;
