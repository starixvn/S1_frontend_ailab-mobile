import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const useGetUserPaymentData = ({ userInfo }) => {
	const [userPaymentData, setUserPaymentData] = useState({});
	const [userPaymentSwitch, setUserPaymentSwitch] = useState(null);

	useEffect(() => {
		if (userInfo?.currencyId) {
			const paymentData = JSON.parse(
				localStorage.getItem(`${userInfo.userName}-lastPaymentInfo`)
			);

			if (paymentData) {
				setUserPaymentData(paymentData);
				setUserPaymentSwitch(true);
			}
		}
	}, [userInfo?.currencyId, userPaymentSwitch]);

	useEffect(() => {
		if (userPaymentSwitch === false) {
			localStorage.removeItem(`${userInfo.userName}-lastPaymentInfo`);
			setUserPaymentData({});
		}
	}, [userPaymentSwitch]);

	const handleUserPaymentData = ({ userData }) => {
		if (userPaymentSwitch) {
			localStorage.setItem(
				`${userInfo.userName}-lastPaymentInfo`,
				JSON.stringify(userData)
			);
		}
	};

	return {
		userPaymentData,
		handleUserPaymentData,
		userPaymentSwitch,
		setUserPaymentSwitch
	};
};

const UserPaymentSwitch = ({
	i18n,
	userPaymentSwitch,
	setUserPaymentSwitch
}) => {
	const [tip, setTip] = useState("");

	const clickInfo = () => {
		setTip(tip === "" ? i18n.ibi_PaymentModeInfo : "");
	};

	const switchPaymentMode = () => {
		setUserPaymentSwitch(!userPaymentSwitch);
	};

	return (
		<div className="rememberMode">
			<label className="checkbox autoTransfer">
				<input type="checkbox" onClick={switchPaymentMode} />
				<i
					className={`icon icon-checkbox${
						userPaymentSwitch ? "-checked" : ""
					}`}
				/>
				<span>{i18n.lbl_RememberPaymentMode}</span>
			</label>
			<button className="icon icon-question" onClick={clickInfo} />
			<div className={`inputInfo${tip ? " active" : ""}`}>{tip}</div>
		</div>
	);
};

UserPaymentSwitch.defaultProps = {
	userPaymentSwitch: null
};

UserPaymentSwitch.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userPaymentSwitch: PropTypes.bool,
	setUserPaymentSwitch: PropTypes.func.isRequired
};

export default UserPaymentSwitch;
