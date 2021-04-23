import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const useGetUserPaymentData = ({ userInfo }) => {
	const [userPaymentSwitch, setUserPaymentSwitch] = useState(null);

	const userPaymentData =
		JSON.parse(
			localStorage.getItem(`${userInfo.userName}-lastPaymentInfo`)
		) ?? {};

	useEffect(() => {
		if (userInfo?.currencyId && userPaymentData) {
			setUserPaymentSwitch(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo?.currencyId]);

	useEffect(() => {
		if (userPaymentSwitch === false) {
			localStorage.removeItem(`${userInfo.userName}-lastPaymentInfo`);
		}
	}, [userPaymentSwitch, userInfo.userName]);

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
		setTip(tip === "" ? i18n.lbl_DepositLocalbankButtonInfo : "");
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
				<span>{i18n.lbl_DepositLocalbankButton}</span>
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
