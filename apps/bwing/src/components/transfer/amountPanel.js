import React from "react";
import PropTypes from "prop-types";
import InputBox from "../common/inputbox.info";
import Dropdown from "../common/dropdown";

const AmountPanel = ({
	i18n,
	amount,
	EditAmount,
	inputStatus,
	clickSubmit,
	selectedIdx,
	transferOptions,
	selectItem,
	allWalletsList,
	clickInfo,
	_isConvert
}) => {
	return (
		<div className="depositInBox">
			<div>
				<div className="input-title">{i18n.lbl_From}</div>
				<div className="inputBox">
					<Dropdown
						mainKey="transfer-From"
						options={
							selectedIdx.transferTo === null
								? allWalletsList
								: transferOptions.transferFrom
						}
						placeholder={i18n.lbl_TransferFrom}
						selectedIdx={selectedIdx.transferFrom}
						i18n={i18n}
						onSelectItem={selectItem.bind(this, "transferFrom")}
						colName="transferFrom"
					/>
				</div>
			</div>

			<div>
				<div className="input-title">{i18n.lbl_To}</div>
				<div className="inputBox">
					<Dropdown
						mainKey="transfer-To"
						options={
							selectedIdx.transferFrom === null
								? allWalletsList
								: transferOptions.transferTo
						}
						placeholder={i18n.lbl_TransferTo}
						selectedIdx={selectedIdx.transferTo}
						onSelectItem={selectItem.bind(this, "transferTo")}
						i18n={i18n}
						colName="transferTo"
					/>
				</div>
			</div>
			<InputBox
				title={i18n.lbl_Amount}
				value={amount}
				inputType="tel"
				onChange={EditAmount}
				btnStatus={inputStatus.checked}
				tip={inputStatus.msg}
				submitBtn={true}
				i18n={i18n}
				clickSubmit={clickSubmit}
				clickInfo={clickInfo}
				numberConvert={_isConvert}
			/>
		</div>
	);
};

AmountPanel.defaultProps = {
	i18n: {},
	inputStatus: {},
	selectedIdx: null,
	transferOptions: [],
	selectItem: null,
	allWalletsList: [],
	clickInfo: () => null
};

AmountPanel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	amount: PropTypes.string.isRequired,
	EditAmount: PropTypes.func.isRequired,
	inputStatus: PropTypes.shape({
		checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
		msg: PropTypes.string
	}),
	clickSubmit: PropTypes.func.isRequired,
	selectedIdx: PropTypes.objectOf(PropTypes.any),
	transferOptions: PropTypes.objectOf(PropTypes.any),
	selectItem: PropTypes.func,
	allWalletsList: PropTypes.arrayOf(PropTypes.object),
	clickInfo: PropTypes.func
};

export default AmountPanel;
