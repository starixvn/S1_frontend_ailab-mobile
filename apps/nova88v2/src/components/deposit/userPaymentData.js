import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const useGetUserPaymentData = ({ userInfo }) => {
	const [userPaymentSwitch, setUserPaymentSwitch] = useState(false);
	const userPaymentData =
		JSON.parse(
			localStorage.getItem(`${userInfo.userName}-lastPaymentInfo`)
		) ?? {};

	window.onbeforeunload = () => {
		removeState();
	};

	useEffect(() => {
		if (userInfo.currencyId) {
			const paymentSwitch = JSON.parse(
				localStorage.getItem(`${userInfo.userName}-userPaymentSwitch`)
			);
			setUserPaymentSwitch(paymentSwitch);
		}
	}, [userInfo.currencyId, userInfo.userName]);

	useEffect(() => {
		return () => {
			removeState();
		};
	}, []);

	const removeState = () => {
		if (userInfo.currencyId) {
			const paymentSwitch = JSON.parse(
				localStorage.getItem(`${userInfo.userName}-userPaymentSwitch`)
			);

			if (paymentSwitch === false) {
				localStorage.removeItem(`${userInfo.userName}-lastPaymentInfo`);
				localStorage.removeItem(
					`${userInfo.userName}-userPaymentSwitch`
				);
			}
		}
	};

	const handleUserPaymentSwitch = ({ status }) => {
		setUserPaymentSwitch(status);
		localStorage.setItem(
			`${userInfo.userName}-userPaymentSwitch`,
			JSON.stringify(status)
		);
	};

	const handleUserPaymentData = ({ userData }) => {
		if (userPaymentSwitch) {
			localStorage.setItem(
				`${userInfo.userName}-lastPaymentInfo`,
				JSON.stringify(userData)
			);
		} else {
			localStorage.removeItem(`${userInfo.userName}-lastPaymentInfo`);
		}
	};

	return {
		userPaymentData,
		handleUserPaymentData,
		userPaymentSwitch,
		handleUserPaymentSwitch
	};
};

const UserPaymentSwitch = ({
	i18n,
	userPaymentSwitch,
	handleUserPaymentSwitch
}) => {
	const [tip, setTip] = useState("");

	const clickInfo = () => {
		setTip(tip === "" ? i18n.lbl_DepositLocalbankButtonInfo : "");
	};

	const switchPaymentMode = () => {
		handleUserPaymentSwitch({ status: !userPaymentSwitch });
	};

	return (
		<>
			<div className="swithModule">
				<button
					className={`switchBtn${userPaymentSwitch ? " active" : ""}`}
					onClick={switchPaymentMode}>
					<span>{userPaymentSwitch ? "ON" : ""}</span>
					<span>{userPaymentSwitch ? "" : "OFF"}</span>
					<div className={userPaymentSwitch ? "active" : ""} />
				</button>
				{i18n.lbl_DepositLocalbankButton}
			</div>
			<button className="icon icon-question" onClick={clickInfo} />
			<div className={`inputInfo${tip ? " active" : ""}`}>{tip}</div>
		</>
	);
};

UserPaymentSwitch.defaultProps = {
	userPaymentSwitch: null
};

UserPaymentSwitch.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userPaymentSwitch: PropTypes.bool,
	handleUserPaymentSwitch: PropTypes.func.isRequired
};

export default UserPaymentSwitch;
