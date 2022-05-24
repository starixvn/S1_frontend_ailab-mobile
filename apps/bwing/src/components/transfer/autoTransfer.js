import React, { useState } from "react";
import PropTypes from "prop-types";
import useHandleAutoTransfer from "./hook/useHandleAutoTransfer";

const AutoTransfer = ({ i18n, setPopBox }) => {
	const [autoTransferHint, setAutoTransferHint] = useState(false);
	const { autoTransfer, setWalletTransferStatus } = useHandleAutoTransfer({
		i18n,
		setPopBox
	});

	const onChangeAutoTransfer = () => {
		if (autoTransfer === false) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_Caution,
				content: i18n.lbl_AutoTransferHint,
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="blue"
							onClick={setWalletTransferStatus}>
							OK
						</button>
						<button
							className="gray"
							onClick={() => setPopBox({ isOpen: false })}>
							{i18n.lbl_Cancel}
						</button>
					</div>
				)
			});
		} else {
			setWalletTransferStatus();
		}
	};

	const clickTip = () => {
		setAutoTransferHint(prev => !prev);
	};

	return (
		<div className="rememberMode">
			<div className="swithModule">
				{i18n.lbl_Main_Wallet_Auto_Transfer}
				<button
					className={`switchBtn${autoTransfer ? " active" : ""}`}
					onClick={onChangeAutoTransfer}>
					<span>{autoTransfer ? "ON" : ""}</span>
					<span>{autoTransfer ? "" : "OFF"}</span>
					<div className={autoTransfer ? "active" : ""} />
				</button>
			</div>
			<div className="icon icon-information-solid" onClick={clickTip} />
			<div className={`inputInfo${autoTransferHint ? " active" : ""}`}>
				<span>{i18n.lbl_Caution}</span>
				{i18n.lbl_AutoTransferHint}
			</div>
		</div>
	);
};

AutoTransfer.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default AutoTransfer;
