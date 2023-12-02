import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import Layout from "../components/common/layout";
import { Link } from "../route/link";
import path from "../path";
import TabPage, { getMainClass } from "../components/common/tabPage";
import {
	i18nContext,
	userInfoContext,
	popBoxContext
} from "../components/common/context";
import api from "../service/api";
import { number_format, isConvert } from "../components/common/common";
import { tpWalletsListType } from "../components/transfer/transfer.def";
import ReloadSpin from "../components/common/reloadSpin";
import useGetBalance from "../components/hook/useGetMainBalance";
import useGetTpBalance from "../components/hook/useGetTpBalance";
import { myWallet as bankInfoTabs } from "../datas/defTabs";
import allowedCurrencyList from "../datas/allowedCurrencyList";

const Wallet = () => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [bonusWallets, setBonusWallet] = useState({});
	const { mainWalletInfo, GetBalance } = useGetBalance({
		isLogin: userInfo.isLogin
	});

	const [tpWallets, setLists] = useState([]);
	const { tpWalletsList, GetTpWalletList } = useGetTpBalance({
		isLogin: userInfo.isLogin,
		listType: tpWalletsListType.afterTransWallets
	});

	const refresh = () => {
		GetTpWalletList();
		GetBalance();
	};

	useEffect(() => {
		if (userInfo.isLogin) {
			setLists(tpWalletsList);
			api.account.GetCustBonusWallet().then(
				res => {
					if (res.data.errorCode === 0) {
						const result = {};
						res.data.data.forEach(b => {
							result[b.tpId] = b;
						});
						setBonusWallet(result);
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		} else {
			navigate(`/${userInfo.langId}`);
		}
	}, [tpWalletsList, mainWalletInfo]);

	let total = tpWallets.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.balance;
	}, 0);
	total += mainWalletInfo.balance;
	Object.values(bonusWallets).forEach(w => {
		total += w.bonus;
	});
	const _tpWalletArrs = tpWallets.map(t => {
		return (
			<TpWalletItem
				key={`tpWallet-${t.id}`}
				title={t.displayText}
				currencyId={userInfo.currencyId}
				balance={t.balance}
				bonusWallet={bonusWallets[t.id]}
			/>
		);
	});

	// * 直接拿 bonusWallets 第一個值 (改為單一錢包後，一次只會回傳一筆)
	const bonusWallet = Object.values(bonusWallets || {})[0];
	return (
		<>
			<div className="walletTotal">
				<div className="icon icon-icon32px_wallet">
					<span>{i18n[`Currency_${userInfo.currencyId}`]}</span>
					<span>{total.toFixed(2)}</span>
				</div>
				<ReloadSpin func={refresh} />
			</div>
			<MainWallet
				currencyId={userInfo.currencyId}
				balance={mainWalletInfo.balance}
				bonusWallet={bonusWallet}
			/>
			{_tpWalletArrs}
			<div className="btn-group">
				<Link
					to={`${path.deposit.root}`}
					className="icon icon-deposit white">
					{i18n.lbl_Deposit}
				</Link>
				{allowedCurrencyList.transferFunds.includes(
					userInfo.currencyId
				) && (
					<Link
						to={`${path.transfer.root}`}
						className="icon icon-transfer white">
						{i18n.lbl_Transfer}
					</Link>
				)}
			</div>
		</>
	);
};

const MainWallet = ({ currencyId, balance, bonusWallet }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="account">
			<div className="info">
				<span>{i18n.lbl_MainWallet}</span>
				<div>{number_format(balance, isConvert(currencyId))}</div>
			</div>
			{bonusWallet && (
				<BonusWallet
					key="bonus-Wallet-0"
					currencyId={userInfo.currencyId}
					bonusWallet={bonusWallet}
				/>
			)}
		</div>
	);
};

MainWallet.defaultProps = {
	currencyId: null,
	balance: null,
	bonusWallet: null
};

MainWallet.propTypes = {
	currencyId: PropTypes.number,
	balance: PropTypes.number,
	bonusWallet: PropTypes.objectOf(PropTypes.any)
};

const TpWalletItem = ({ currencyId, title, balance, bonusWallet }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="account">
			<div className="info">
				<span>{title}</span>
				<div>{number_format(balance, isConvert(currencyId))}</div>
			</div>
			{bonusWallet && (
				<BonusWallet
					key={`bonus-Wallet-${bonusWallet?.tpId}`}
					currencyId={userInfo.currencyId}
					bonusWallet={bonusWallet}
				/>
			)}
		</div>
	);
};

TpWalletItem.defaultProps = {
	title: "",
	currencyId: null,
	balance: null,
	bonusWallet: null
};

TpWalletItem.propTypes = {
	title: PropTypes.string,
	currencyId: PropTypes.number,
	balance: PropTypes.number,
	bonusWallet: PropTypes.objectOf(PropTypes.any)
};

const BonusWallet = ({
	currencyId,
	bonusWallet: { bonus, turnover, rollover, promoCategoryId }
}) => {
	const percentage =
		turnover > rollover ? 100 : ((turnover / rollover) * 100).toFixed(2);
	const { i18n } = useContext(i18nContext);
	return (
		<div className="account active">
			<div className="info">
				<span>{i18n[`lbl_BonusWallet_${promoCategoryId}`]}</span>
				<div>{number_format(bonus, isConvert(currencyId))}</div>
			</div>
			<div className="progressBarModule">
				<div className="percentage">{percentage} %</div>
				<div className="bar">
					<div
						className="progress"
						style={{ width: `${percentage}%` }}
					/>
				</div>
			</div>
		</div>
	);
};

BonusWallet.defaultProps = {
	currencyId: null,
	bonusWallet: null
};

BonusWallet.propTypes = {
	currencyId: PropTypes.number,
	bonusWallet: PropTypes.objectOf(PropTypes.any)
};

const IndexPage = props => {
	const defTabs = bankInfoTabs;
	const header = <TabPage defTabs={defTabs} />;
	const { prevPage } = props?.location?.state;

	return (
		<Layout
			header={header}
			mainClass={getMainClass({ defTabs, location: props })}>
			<Wallet prevPage={prevPage} />
		</Layout>
	);
};
IndexPage.defaultProps = {
	location: null
};

IndexPage.propTypes = {
	location: PropTypes.objectOf(PropTypes.any)
};
export default IndexPage;
