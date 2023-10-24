import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import path from "../../path";
import { Link } from "../../route/link";
import {
	i18nContext,
	userInfoContext,
	popBoxContext,
	loadingContext,
	withdrawalBlockSettingContext
} from "../common/context";
import { paymentImgURL } from "../../config";
import api from "../../service/api";
import AddBankPanel from "./bankInfo.add";
import VIPLevel from "../common/vipLevel";
import { defCurrenyId } from "../common/common";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "../../datas/withdrawalSetting";

const BankInfo = ({ prevPage }) => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { setLoading } = useContext(loadingContext);
	const { withdrawalSettingTypeList } = useContext(
		withdrawalBlockSettingContext
	);
	const [custBankInfo, setCustBankInfo] = useState([]);
	const [currentPanel, setCurrentPanel] = useState("showBankPanel");
	const isMountedRef = useRef(null);

	const displayBankCard =
		withdrawalSettingTypeList?.find(
			item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.BankCard
		)?.status ?? true;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.currencyId === 96) {
			navigate(path.home.root);
			setLoading(false);
		}
		if (userInfo.isLogin) {
			setLoading(true);
			api.account.GetCustBankInfo().then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const { data } = res.data;
							if (data !== null) {
								const bankInfoDetail =
									data.bankInfoDetail ?? [];
								const getBankInfoArr = bankInfoDetail.map(i => {
									return {
										bankName: i.bankName,
										image: i.bankLogo,
										accountNo: i.accountNo,
										SysId: i.sysId,
										ifscCode: i?.ifscCode
									};
								});
								setCustBankInfo(() => getBankInfoArr);
							}
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
						setLoading(false);
					}
				}
			);
		}
	}, [i18n, setPopBox, userInfo.isLogin, setLoading]);

	const GetCustBankInfo = () => {
		setLoading(true);

		api.account.GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const { data } = res.data;
						if (data !== null) {
							const bankInfoDetail = data.bankInfoDetail ?? [];
							const getBankInfoArr = bankInfoDetail.map(i => {
								return {
									bankName: i.bankName,
									image: i.bankLogo,
									accountNo: i.accountNo,
									SysId: i.sysId,
									ifscCode: i?.ifscCode
								};
							});
							setCustBankInfo(getBankInfoArr);
							setUserInfo(prevState => ({
								...prevState,
								accountName: data.accountName
							}));
						}
					} else {
						setPopBox({
							isOpen: true,
							content: `[${res.data.errorCode}] ${res.data.message}`
						});
					}
					setLoading(false);
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
					setLoading(false);
				}
			}
		);
	};

	const toAddBankAccount = () => {
		setCurrentPanel("addBankPanel");
	};

	const removeAccountHandler = val => {
		const closePopBpx = () => {
			setPopBox({ isOpen: false });
		};

		const removeAccount = () => {
			const removeAccountData = {
				AccountName: userInfo.accountName,
				AccountNo: val.accountNo,
				SysId: val.SysId
			};
			setPopBox({ isOpen: false });
			setLoading(true);

			api.accountStrict.DelCustBankInfo(removeAccountData).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							GetCustBankInfo();
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
						setLoading(false);
					}
				}
			);
		};

		setPopBox({
			isOpen: true,
			title: i18n.lbl_ImportantNote,
			content: i18n.lbl_CheckConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="white" onClick={removeAccount}>
						{i18n.lbl_Yes}
					</button>
					<button className="orange" onClick={closePopBpx}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const arr = custBankInfo.map(item => {
		return (
			<BankAccountItem
				key={`bankAccount-${item.accountNo}`}
				title={item.bankName}
				accountNo={item.accountNo}
				removeAccountHandler={removeAccountHandler.bind(null, item)}
				image={`${paymentImgURL}/square/${item.image?.toLowerCase()}`}
				i18n={i18n}
				ifscCode={item?.ifscCode}
				currencyId={userInfo.currencyId}
			/>
		);
	});

	if (!displayBankCard) return null;

	return (
		<>
			{currentPanel === "showBankPanel" ? (
				<>
					{userInfo?.accountName ? (
						<>
							<VIPLevel userInfo={userInfo} i18n={i18n} />
							<div className="name" data-testid="accountName">
								{userInfo.accountName}
							</div>
							<div className="text-center text-gray">
								{i18n.lbl_BankAccountHint}
							</div>
						</>
					) : null}
					{custBankInfo && custBankInfo.length < 3 ? (
						<div className="btn-group">
							{prevPage === "deposit" ? (
								<Link to={path.deposit.root} className="cancel">
									{i18n.lbl_Back}
								</Link>
							) : null}
							<button
								className="icon icon-plus"
								onClick={toAddBankAccount}
								data-testid="addAccountBtn">
								{i18n.lbl_AddNewAccount}
							</button>
						</div>
					) : null}
				</>
			) : (
				<AddBankPanel
					accountName={userInfo?.accountName}
					setCurrentPanel={setCurrentPanel}
					i18n={i18n}
					setPopBox={setPopBox}
					GetCustBankInfo={GetCustBankInfo}
					setLoading={setLoading}
					currencyId={userInfo.currencyId}
					custBankInfo={custBankInfo}
				/>
			)}
			{currentPanel === "showBankPanel" && custBankInfo?.length > 0 ? (
				<>
					<div className="text-center text-org icon icon-library">
						{i18n.lbl_BankAccount}
					</div>
					<div className="bankAccount" data-testid="accountList">
						{arr}
					</div>
				</>
			) : null}
		</>
	);
};

BankInfo.defaultProps = {
	prevPage: null
};

BankInfo.propTypes = {
	prevPage: PropTypes.string
};

const BankAccountItem = props => {
	return (
		<div className="account">
			<div className="bankLogo">
				<img src={props.image} alt="bankLogo" />
			</div>
			<div className="info">
				<span className="title text-org">{props.title}</span>
				<span>{props.accountNo}</span>
				{props.currencyId === defCurrenyId.INR ? (
					<div>
						{props.i18n.lbl_IFSCCode}: {props.ifscCode}
					</div>
				) : null}
			</div>
			<button
				className="icon icon-bin clickBtn"
				onClick={props.removeAccountHandler}
			/>
		</div>
	);
};

BankAccountItem.defaultProps = {
	i18n: null,
	ifscCode: null,
	currencyId: null
};

BankAccountItem.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	accountNo: PropTypes.string.isRequired,
	removeAccountHandler: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string),
	ifscCode: PropTypes.string,
	currencyId: PropTypes.number
};

export default BankInfo;
