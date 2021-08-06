import React from "react";
import PropTypes from "prop-types";
import useHandleAutoTransfer from "./hook/useHandleAutoTransfer";

const AutoTransfer = ({ i18n, setPopBox }) => {
	const { autoTransfer, setWalletTransferStatus } = useHandleAutoTransfer({
		i18n,
		setPopBox
	});
	return (
		<div className="swithModule">
			{i18n.lbl_Main_Wallet_Auto_Transfer}
			<button
				className={`switchBtn${autoTransfer ? " active" : ""}`}
				onClick={setWalletTransferStatus}>
				<span>{autoTransfer ? "ON" : ""}</span>
				<span>{autoTransfer ? "" : "OFF"}</span>
				<div className={autoTransfer ? "active" : ""} />
			</button>
		</div>
	);
};

AutoTransfer.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setPopBox: PropTypes.func.isRequired
};

export default AutoTransfer;
