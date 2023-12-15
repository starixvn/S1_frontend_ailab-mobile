import React from "react";
import PropTypes from "prop-types";
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
	isCrypto,
	titleClassName,
	i18n,
	_isConvert,
	displayKey
}) => {
	// * 有些資料是用 redux toolkit fetch 而來 (ex: quickTransfer)
	// * redux 裡的陣列會出現 frozen 以防止 redux state 發生突變的情形 (The array is frozen to prevent mutation of the redux state.)
	// * 透過 dataList => [...dataList] 解決
	// * https://stackoverflow.com/questions/53420055/error-while-sorting-array-of-objects-cannot-assign-to-read-only-property-2-of
	const rows = [...dataList]
		?.sort((a, b) => {
			// payId=0時,payName=LetsPay
			if (a.payId === 0 && b.payId !== 0) {
				return -1;
			}
			if (a.payId !== 0 && b.payId === 0) {
				return 1;
			}
			return 0;
		})
		.map(data => {
			const _mainKey = `${mainKey}-${data[idKey]}`;
			const isSelect = selected === data[idKey];

			const { maxAmount, minAmount } = data;

			const itemLabel = () => {
				let result;
				if (isCrypto && title === i18n.lbl_PaymentModes) {
					result = data.groupName;
				} else if (isCrypto && title === i18n.lbl_SelectChannel) {
					result = data.channelName;
				} else {
					result = data.bankCode ?? data[displayKey];
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
					<div className="subtitle">{itemLabel()}</div>
					{minAmount === null || maxAmount === null ? null : (
						<div className="subinfo">
							<span>
								{`${i18n?.lbl_Min}: ${
									minAmount === 0
										? i18n.lbl_Unlimited
										: number_format(
												minAmount,
												_isConvert,
												0
										  )
								}`}
							</span>
							<span>
								{`${i18n?.lbl_Max}: ${
									maxAmount === 0
										? i18n.lbl_Unlimited
										: number_format(
												maxAmount,
												_isConvert,
												0
										  )
								}`}
							</span>
						</div>
					)}
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
	isCrypto: false,
	titleClassName: "",
	i18n: {},
	_isConvert: null
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
	isCrypto: PropTypes.bool,
	titleClassName: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string),
	_isConvert: PropTypes.bool
};

export default GroupList;
