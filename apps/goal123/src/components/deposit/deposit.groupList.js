import React from "react";
import PropTypes from "prop-types";
import Radio from "./deposit.radio";

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
	bindingItem,
	i18n,
	displayKey,
	showMinMaxHint,
	_isConvert,
	className,
	bankClassName
}) => {
	const rows = dataList?.map(data => {
		const _mainKey = `${mainKey}-${data[idKey]}`;
		const { minAmount, maxAmount } = showMinMaxHint ? data : {};
		return (
			<Radio
				bankClassName={bankClassName}
				className={className}
				key={_mainKey}
				id={`${_mainKey}-radio`}
				radioGroup={mainKey}
				imgUrl={`${prefixImgUrl}${
					imgKeyWithExtension
						? data[imgKey]?.toLowerCase()
						: `${data[imgKey]?.toLowerCase()}.png`
				}`}
				imgAlt={data[imgKey] ?? ""}
				onChange={SelectPayment.bind(
					this,
					bindFullObj ? data : data[idKey],
					bindingItem
				)}
				isSelect={selected === data[idKey]}
				displayName={data[displayKey]}
				minAmount={minAmount}
				maxAmount={maxAmount}
				_isConvert={_isConvert}
				i18n={i18n}
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
	bindingItem: null,
	showMinMaxHint: false,
	displayKey: "",
	className: "",
	bankClassName: ""
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
	bindingItem: PropTypes.objectOf(PropTypes.any),
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	showMinMaxHint: PropTypes.bool,
	displayKey: PropTypes.string,
	_isConvert: PropTypes.bool.isRequired,
	className: PropTypes.string,
	bankClassName: PropTypes.string
};

export default GroupList;
