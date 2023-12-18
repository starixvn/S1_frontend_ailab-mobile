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
	_isConvert
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
			const { minAmount, maxAmount } = showMinMaxHint ? data : {};
			return (
				<Radio
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
	displayKey: ""
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
	_isConvert: PropTypes.bool.isRequired
};

export default GroupList;
