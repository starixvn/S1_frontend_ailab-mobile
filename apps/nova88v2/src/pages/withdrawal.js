import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "@reach/router";
import {
	userInfoContext,
	eWalletContext,
	withdrawalBlockSettingContext
} from "../components/common/context";
import Layout from "../components/common/layout";
import TabPage, { getMainClass } from "../components/common/tabPage";
import WithdrawalEWallet from "../components/withdrawal/withdrawal.EWallet";
import CryptoWithdrawal from "../components/withdrawal/withdrawal.crypto";
import Withdrawal from "../components/withdrawal/withdrawal";
import { withdrawal, withdrawalWithOutEWallet } from "../datas/defTabs";
import path from "../path";
import allowedCurrencyList from "../datas/allowedCurrencyList";

const IndexPage = props => {
	const navigate = useNavigate();
	const location = useLocation();
	const { userInfo } = useContext(userInfoContext);
	const { isShowEWallet } = useContext(eWalletContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);

	let defTabs = withdrawal;
	if (!isShowEWallet) {
		defTabs = withdrawalWithOutEWallet;
	}

	// * 這裡的篩選是從後台 payment Gateway --> Withdrawal Option Status
	// * 因有多個參數控制同個元件的情形 ex:isShowEWallet 所以這裡分開寫
	const filteredSettingTabs = () => {
		// * 這裡是多層結構且 defTabs 用 let --> 必須做深層拷貝
		const defTab = JSON.parse(JSON.stringify(defTabs));
		const subTabs = Object.entries(defTabs.withdrawal.subTabs)
			.filter(([_, tabs]) => {
				if (!tabs.type) return true;
				const result = withdrawalSettingTypeList?.find(typeEnum => {
					return typeEnum.type === tabs.type;
				})?.status;
				return result;
			})
			?.reduce((acc, cur) => {
				return { ...acc, [cur[0]]: { ...cur[1] } };
			}, {});

		defTab.withdrawal.subTabs = subTabs;

		return defTab;
	};

	const header = <TabPage defTabs={filteredSettingTabs()} />;

	useEffect(() => {
		// * 因有現在會從後台關閉頁面 但有固定預設進入點 withdrawal(bank card) 頁面會顯示空白頁面
		// * 故在頁面在 withdrawal(bank card) 時且後台關閉 withdrawal(bank card) 做導轉
		if (
			location.pathname.split("/")[2] === path.withdrawal.root &&
			Object.keys(filteredSettingTabs()?.withdrawal?.subTabs)?.length !==
				0 &&
			filteredSettingTabs()?.withdrawal?.subTabs?.withdrawal === undefined
		) {
			navigate(
				`/${userInfo.langId}/${
					Object.values(filteredSettingTabs()?.withdrawal?.subTabs)[0]
						?.to
				}`
			);
		} else if (
			Object.keys(filteredSettingTabs()?.withdrawal?.subTabs)?.length ===
			0
		) {
			navigate(`/${userInfo.langId}/${path.withdrawalHistory.root}`);
		}

		if (!allowedCurrencyList.bankCard.includes(userInfo.currencyId)) {
			navigate(`/${userInfo.langId}/${path.cryptoWithdrawal.root}`);
		}
	}, []);

	const judgeShowPage = () => {
		if (props.isCrypto) {
			return <CryptoWithdrawal />;
		}
		return props.isEWallet && isShowEWallet ? (
			<WithdrawalEWallet />
		) : (
			<Withdrawal />
		);
	};

	return (
		<Layout
			header={header}
			mainClass={getMainClass({
				defTabs: filteredSettingTabs(),
				location: props
			})}>
			{judgeShowPage()}
		</Layout>
	);
};
IndexPage.defaultProps = {
	isCrypto: false,
	isEWallet: false
};

IndexPage.propTypes = {
	isCrypto: PropTypes.bool,
	isEWallet: PropTypes.bool
};

export default IndexPage;
