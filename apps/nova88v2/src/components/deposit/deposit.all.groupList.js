import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
	mainKey,
	dataList,
	SelectPayment,
	selected,
	title,
	imgKey,
	idKey,
	bindFullObj,
	bindingItem,
	prefixImgUrl,
	imgKeyWithExtension
}) => {
	const rows = dataList?.map(data => {
		const _mainKey = `${mainKey}-${data[idKey]}`;
		const isSelect = selected === data[idKey];
		return (
			<div
				className={`bankName${isSelect ? " active" : ""}`}
				key={_mainKey}
				onClick={() =>
					SelectPayment({
						groupInfo: bindingItem,
						bankInfo: bindFullObj ? data : data[idKey]
					})
				}>
				<img
					src={`${prefixImgUrl}${
						imgKeyWithExtension
							? data[imgKey]
							: `${data[imgKey]}.png`
					}`}
					alt={data[imgKey] ?? ""}
				/>
				<i className="icon icon-icon32px_check" />
			</div>
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
