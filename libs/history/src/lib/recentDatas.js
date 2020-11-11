import React, { useContext, useState } from "react";
import { isConvert } from "@ailab-mobile/common";
import { i18nContext, userInfoContext } from "Context";
import { Detail } from "./components/detail";
import { transferDirection } from "./common/common";
import { defTransactionType } from "./common/def";
import path from "Path";
import { Content } from "./components/content";

export const RecentDatas = ({ datas, transactionType }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [isOpen, setOpen] = useState(false);
	const _isConvert = isConvert(userInfo.currencyId);

	let _path = null;
	if (transactionType === defTransactionType.deposit) {
		_path = path.deposit.sub.history.root;
	} else if (transactionType === defTransactionType.withdrawal) {
		_path = path.withdrawal.sub.history.root;
	} else {
		_path = path.transfer.sub.history.root;
	}

	const HandleOpen = () => {
		setOpen(prevState => !prevState);
	};

	let hasData = datas.Datas && datas.Datas.length > 0;

	let rows =
		hasData &&
		datas.Datas.map(item => {
			const _transferDirection = transferDirection(
				item.direction,
				i18n.lbl_MainWallet,
				i18n.lbl_Wallet_Saba
			);

			return (
				<Detail
					key={`${transactionType}-recent-${item.transId}`}
					i18n={i18n}
					{...item}
					transactionType={transactionType}
					className={`info infoBlack${
						transactionType === defTransactionType.transfer
							? " transfer"
							: ""
					}`}
					_isConvert={_isConvert}
					SubmitProof={
						datas.SubmitProof
							? datas.SubmitProof.bind(
									this,
									item?.bankInfo,
									item?.depositRep,
									item?.amount,
									item?.transId,
									item?.picFileName,
									item?.refId
							  )
							: null
					}
					ClickCancel={
						datas.ClickCancel
							? datas.ClickCancel.bind(this, item.transId)
							: null
					}
					startWallet={_transferDirection?.startWallet}
					endWallet={_transferDirection?.endWallet}
				/>
			);
		});

	return (
		<Content
			i18n={i18n}
			isRecentDatas={true}
			arr={rows}
			HandleOpen={HandleOpen}
			isOpen={isOpen}
			getHistoryState={hasData}
			ReloadFunc={datas.ReloadFunc}
			_path={_path}
		/>
	);
};
