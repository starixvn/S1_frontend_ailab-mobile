import React, { useEffect, useRef, useContext, useState } from "react";
import config from "../../config";
import { popBoxContext } from "../common/context";
import { api_DelCustBankInfo } from "../../service/api/accountStrict";
import Loading from "../common/loading";

export default ({ i18n, accountName, custBankList, reload }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const delBankAccount = (sysId, accountNo) => {
		const ClickCancel = () => {
			setPopBox({
				isOpen: false
			});
		};

		const deleteCard = (sysId, accountNo) => {
			setPopBox({
				isOpen: false
			});
			setLoading(true);

			api_DelCustBankInfo({
				AccountName: accountName,
				AccountNo: accountNo,
				SysId: sysId
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
								title: i18n["lbl_ImportantNote"],
								content: res.data.message
							});
							setLoading(false);
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n["lbl_ImportantNote"],
							content: i18n["msg_ApiServerError"]
						});
						setLoading(false);
					}
				}
			);
		};

		setPopBox({
			isOpen: true,
			title: i18n["lbl_ImportantNote"],
			content: i18n["lbl_CheckConfirm"],
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button
						className="gray"
						onClick={deleteCard.bind(this, sysId, accountNo)}>
						{i18n["lbl_Yes"]}
					</button>
					<button className="blue" onClick={ClickCancel}>
						{i18n["lbl_No"]}
					</button>
				</div>
			)
		});
	};

	let arr = custBankList?.map(item => {
		return (
			<div className="bankCard" key={`bankCard-${item.accountNo}`}>
				<img
					alt="BankLogo"
					src={`${config.imgUrl}/common/images/BankLogo/${item.image}`}
				/>
				<p>{item.accountNo}</p>
				<button
					aria-label="delBankAccount"
					className="icon icon-bin clickBtn"
					onClick={delBankAccount.bind(
						this,
						item.SysId,
						item.accountNo
					)}></button>
			</div>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="depositTitle textLeft borderTop">
				<h1>{i18n["lbl_BankAccount"].toUpperCase()}</h1>
				<p>
					{i18n["lbl_NumberOfBankAccounts"]}:{" "}
					{custBankList?.length ?? 0}/3
				</p>
			</div>
			{custBankList?.length > 0 ? arr : null}
		</>
	);
};
