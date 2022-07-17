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
	imgKeyWithExtension,
	displayKey,
	_isConvert,
	isCrypto,
	titleClassName,
	i18n
}) => {
	const rows = dataList?.map(data => {
		const _mainKey = `${mainKey}-${data[idKey]}`;
		const isSelect = selected === data[idKey];
		const itemLabel = () => {
			let result;
			if (isCrypto && title === i18n.lbl_PaymentModes) {
				result = data.groupName;
			} else if (isCrypto && title === i18n.lbl_SelectChannel) {
				result = data.channelName;
			} else {
				result = data.bankCode ?? data.payName ?? data.groupName;
			}
			return result;
		};

		return (
			<div>
				<div
					className={`bankName${isSelect ? " active" : ""}`}
					key={_mainKey}
					onClick={() => {
						SelectPayment({
							groupInfo:
								idKey === "payId" ||
								idKey === "groupId" ||
								isCrypto
									? data
									: bindingItem,
							bankInfo: bindFullObj ? data : data[idKey]
						});
					}}>
					<img
						src={`${prefixImgUrl}${
							imgKeyWithExtension
								? data[imgKey]?.toLowerCase()
								: `${data[imgKey]?.toLowerCase()}.png`
						}`}
						alt={data[imgKey] ?? ""}
					/>
					<i className="icon icon-icon32px_check" />
				</div>
				<div>{itemLabel()}</div>
			</div>
		);
	});

	return (
		dataList?.length > 0 && (
			<>
				<div
					className={`title${
						titleClassName ? ` ${titleClassName}` : ""
					}`}>
					<span className="text-org">*</span>
					{title}
				</div>
				<div className="selectModule selectNew">{rows}</div>
			</>
		)
	);
};

GroupList.defaultProps = {
	dataList: [],
	selected: null,
	bindFullObj: false,
	imgKeyWithExtension: false,
	bindingItem: null,
	displayKey: "",
	isCrypto: false,
	titleClassName: "",
	i18n: {}
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
	displayKey: PropTypes.string,
	_isConvert: PropTypes.bool.isRequired,
	isCrypto: PropTypes.bool,
	titleClassName: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string)
};

export default GroupList;
