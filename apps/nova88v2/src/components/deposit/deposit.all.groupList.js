import React, { useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "../common/context";
import { number_format } from "../common/common";

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
	channel,
	_isConvert,
	showMinMaxHint
}) => {
	const { i18n } = useContext(i18nContext);
	const rows = dataList?.map(data => {
		const _mainKey = `${mainKey}-${data[idKey]}`;
		const isSelect = selected === data[idKey];

		return (
			<div
				className={`bankName${isSelect ? " active" : ""}`}
				key={_mainKey}
				onClick={() =>
					SelectPayment({
						groupInfo:
							idKey === "payId" || idKey === "groupId"
								? data
								: bindingItem,
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
				<div className="bank">
					<div>{data[displayKey]}</div>
					{!channel ? (
						<div>
							{showMinMaxHint &&
							data?.minAmount &&
							data?.maxAmount
								? `${i18n.lbl_MinMaxAmount}: ${number_format(
										data.minAmount,
										_isConvert
								  )} / ${number_format(
										data.maxAmount,
										_isConvert
								  )}`
								: ""}
						</div>
					) : (
						<div>
							{showMinMaxHint &&
							channel?.minAmount &&
							channel?.maxAmount
								? `${i18n.lbl_MinMaxAmount}: ${number_format(
										channel.minAmount,
										_isConvert
								  )} / ${number_format(
										channel.maxAmount,
										_isConvert
								  )}`
								: ""}
						</div>
					)}
				</div>
			</div>
		);
	});

	return (
		dataList?.length > 0 && (
			<>
				<div className="title">
					<span className="text-org">*</span>
					{title}
				</div>
				<div className="selectModule">{rows}</div>
			</>
		)
	);
};

GroupList.defaultProps = {
	dataList: null,
	selected: null,
	bindFullObj: false,
	imgKeyWithExtension: false,
	bindingItem: null,
	displayKey: "",
	channel: null,
	showMinMaxHint: false
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
	channel: PropTypes.objectOf(PropTypes.any),
	_isConvert: PropTypes.bool.isRequired,
	showMinMaxHint: PropTypes.bool
};

export default GroupList;
