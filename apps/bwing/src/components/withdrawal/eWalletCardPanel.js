import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { paymentNoSiteImgURL } from "../../config";
import { api_DelCustEWalletInfo } from "../../service/api/accountStrict";
import { popBoxContext } from "../common/context";
import path from "../../path";
import EWalletAddCard from "../member/eWallet.addCard";

const EWalletCardPanel = ({
	i18n,
	custEWalletInfo,
	selectedEWallet,
	setSelectedEWallet,
	setRedirectPath,
	GetCustEWalletInfo,
	SelectEWallet
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const ClosePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const addBankAccount = () => {
		setRedirectPath(`/${path.member.root}/${path.member.sub.eWallet.root}`);
	};

	const delAccount = (accountNo, sysId) => {
		const delBankInfo = () => {
			api_DelCustEWalletInfo({
				AccountNo: accountNo,
				SysId: sysId
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							GetCustEWalletInfo();
							if (
								accountNo === selectedEWallet?.accountNo &&
								sysId === selectedEWallet?.sysId
							) {
								setSelectedEWallet(null);
							}
							setPopBox({ isOpen: false });
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError
						});
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
					<button className="gray" onClick={delBankInfo}>
						{i18n.lbl_Yes}
					</button>
					<button className="blue" onClick={ClosePopBox}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const arr = custEWalletInfo?.map(item => {
		const _key = `withdrawal-eWalletCard-${item.sysId}-${item.accountNo}`;
		const _checked =
			item.accountNo === selectedEWallet?.accountNo &&
			item.sysId === selectedEWallet?.sysId;

		return (
			<EWalletCard
				key={_key}
				checkKey={`${item.sysId}-${item.accountNo}`}
				{...item}
				selectAccount={SelectEWallet.bind(this, item)}
				checked={_checked}
				delAccount={delAccount.bind(this, item.accountNo, item.sysId)}
			/>
		);
	});
	return (
		<div className="addBank">
			<div className="remainder">
				{i18n.lbl_NumberOfBankAccounts}:{custEWalletInfo?.length ?? 0}/3
			</div>
			{custEWalletInfo.length > 0 ? arr : null}

			{custEWalletInfo.length < 3 ? (
				<div className="addBankName noBank" onClick={addBankAccount}>
					<div className="icon icon-plus" />
					<div>{i18n.lbl_AddEWallet}</div>
				</div>
			) : null}
		</div>
	);
};

const EWalletCard = props => {
	return (
		<div className="addBankName">
			<div className="addBankInfo">
				<div className="bankName">
					<img
						src={`${paymentNoSiteImgURL}/${props.eWalletLogo?.toLowerCase()}`}
						alt={props.eWalletName}
					/>
				</div>
				<div>
					{props.hideDelBtn ? null : (
						<button
							className="icon icon-bin"
							onClick={props.delAccount}
						/>
					)}
					<div className="checkbox">
						<input
							type="checkbox"
							id={props.checkKey}
							onChange={props.selectAccount}
							checked={props.checked}
						/>
						<label
							htmlFor={props.checkKey}
							className="icon icon-checkbox-checked"
						/>
					</div>
				</div>
			</div>
			<div className="addBankInfo">
				<div>
					<span>{props.accountNo?.slice(0, 4)}</span>
					<span>{props.accountNo?.slice(4, 8)}</span>
					<span>{props.accountNo?.slice(8, 12)}</span>
					<span>{props.accountNo?.slice(12, 16)}</span>
				</div>
			</div>
		</div>
	);
};

EWalletCard.defaultProps = {
	hideDelBtn: false
};

EWalletCard.prototype = {
	accountNo: PropTypes.string.isRequired,
	key: PropTypes.string.isRequired,
	checkKey: PropTypes.string.isRequired,
	selectAccount: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	delAccount: PropTypes.func.isRequired,
	eWalletLogo: PropTypes.string.isRequired,
	eWalletName: PropTypes.string.isRequired,
	eWalletSite: PropTypes.string.isRequired,
	sysId: PropTypes.number.isRequired,
	hideDelBtn: PropTypes.bool
};

EWalletCardPanel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	custEWalletInfo: PropTypes.func.isRequired,
	selectedEWallet: PropTypes.objectOf(PropTypes.string).isRequired,
	setSelectedEWallet: PropTypes.func.isRequired,
	setRedirectPath: PropTypes.func.isRequired,
	GetCustEWalletInfo: PropTypes.func.isRequired,
	SelectEWallet: PropTypes.func.isRequired
};

export default EWalletCardPanel;
