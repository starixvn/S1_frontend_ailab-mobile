import { useState, useEffect } from "react";

const useGetUserPaymentData = ({ userInfo }) => {
	const [userPaymentData, setUserPaymentData] = useState({});

	useEffect(() => {
		if (userInfo?.currencyId) {
			const paymentData = JSON.parse(
				localStorage.getItem(`${userInfo.userName}-lastPaymentInfo`)
			);
			setUserPaymentData(paymentData ?? {});
		}
	}, [userInfo?.currencyId]);

	const handleUserPaymentData = ({ userData }) => {
		localStorage.setItem(
			`${userInfo.userName}-lastPaymentInfo`,
			JSON.stringify(userData)
		);
	};

	return { userPaymentData, handleUserPaymentData };
};

export default useGetUserPaymentData;
