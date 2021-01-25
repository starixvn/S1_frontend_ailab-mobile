import React from "react";
import PropTypes from "prop-types";
import InputBox, { defIptStatus } from "../common/inputbox.hint";
import Dropdown from "../common/dropdown";

const AmountPanel = ({
	i18n,
	amount,
	EditAmount,
	warning,
	clickSubmit,
	selectedIdx,
	transferOptions,
	selectItem,
	allWalletsList
}) => {
	let _btnStatus = defIptStatus.default;
	if (warning.status === true) {
		_btnStatus = defIptStatus.warning;
	} else if (warning.status === false) {
		_btnStatus = defIptStatus.verified;
	}

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

			<div className="inputBoxLevel">
				<div className="left">
					<InputBox
						title={i18n.lbl_Amount}
						value={amount}
						inputType="tel"
						onChange={EditAmount}
						btnStatus={_btnStatus}
					/>
				</div>
				<div className="right">
					<div className="btn-group">
						<button className="blue" onClick={clickSubmit}>
							{i18n.lbl_transfer_submit}
						</button>
					</div>
				</div>
			</div>
			{warning.msg ? (
				<div className={`tip${warning.msg ? " open" : ""}`}>
					{warning.msg}
				</div>
			) : null}
		</div>
	);
};

AmountPanel.defaultProps = {
	i18n: {},
	warning: {},
	selectedIdx: null,
	transferOptions: [],
	selectItem: null,
	allWalletsList: []
};

AmountPanel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	amount: PropTypes.string.isRequired,
	EditAmount: PropTypes.func.isRequired,
	warning: PropTypes.shape({
		status: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
		msg: PropTypes.string
	}),
	clickSubmit: PropTypes.func.isRequired,
	selectedIdx: PropTypes.objectOf(PropTypes.any),
	transferOptions: PropTypes.objectOf(PropTypes.any),
	selectItem: PropTypes.func,
	allWalletsList: PropTypes.arrayOf(PropTypes.object)
};

export default AmountPanel;
