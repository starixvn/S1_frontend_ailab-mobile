import React, { useEffect, useRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import { paymentNoSiteImgURL } from "../../config";
import { popBoxContext } from "../common/context";
import { api_DelCustEWalletInfo } from "../../service/api/accountStrict";
import Loading from "../common/loading";

const EWalletShowCard = ({ i18n, custEWalletInfo, reload }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const delBankAccount = (sysId, accountNo) => {
		const ClickCancel = () => {
			setPopBox({
				isOpen: false
			});
		};

		const deleteCard = (_sysId, _accountNo) => {
			setPopBox({
				isOpen: false
			});
			setLoading(true);

			api_DelCustEWalletInfo({
				AccountNo: _accountNo,
				SysId: _sysId
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							reload();
							setPopBox({
								isOpen: false
							});
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`
							});
							setLoading(false);
						}
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
					<button
						className="gray"
						onClick={deleteCard.bind(this, sysId, accountNo)}>
						{i18n.lbl_Yes}
					</button>
					<button className="blue" onClick={ClickCancel}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};
	const arr = custEWalletInfo?.map(item => {
		return (
			<div
				className="bankCard"
				key={`eWalletCard-${item.SysId}-${item.accountNo}`}
				data-testid="account">
				<img
					alt="BankLogo"
					src={`${paymentNoSiteImgURL}/${item.image?.toLowerCase()}`}
				/>
				<p>{item.accountNo}</p>
				<button
					aria-label="delBankAccount"
					className="icon icon-bin clickBtn"
					onClick={delBankAccount.bind(
						this,
						item.SysId,
						item.accountNo
					)}
				/>
			</div>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<>
			<div
				className="depositTitle textLeft borderTop"
				data-testid="showCardPanel">
				<h1>{i18n.lbl_EWalletAccount.toUpperCase()}</h1>
				<p>
					{i18n.lbl_NumberOfEWalletAccounts}:{" "}
					{custEWalletInfo?.length ?? 0}
					/3
				</p>
			</div>
			{custEWalletInfo?.length > 0 ? arr : null}
		</>
	);
};

EWalletShowCard.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	custEWalletInfo: PropTypes.objectOf(PropTypes.array).isRequired,
	reload: PropTypes.func.isRequired
};

export default EWalletShowCard;
