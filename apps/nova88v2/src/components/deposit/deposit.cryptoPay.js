import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import config from "../../config";
import { isConvert, number_format } from "../common/common";
import { useHandleAmount } from "../hook/useHandleAmount";

export const Panel = props => props.children;

const Main = props => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { paymentList } = props;
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [selGroup, setSelGroup] = useState(paymentList[0]);

	const { amount, warning, EditAmount, VaildAmount } = useHandleAmount({
		currencyId: userInfo.currencyId,
		minAmount: selGroup?.minAmount,
		maxAmount: selGroup?.maxAmount,
		i18n,
		digits: 0
	});

	const SelectPayment = ({ groupInfo }) => {
		if (selGroup !== groupInfo?.groupId) {
			setSelGroup(() => groupInfo);
		}
	};

	const ClickSubmit = () => {
		const confirmAmount =
			selGroup.amountRule === 3 && selGroup.amountList?.length > 0
				? amount / 1000
				: amount;

		const result = VaildAmount({ _amount: confirmAmount });

		if (result) {
			const RedirectToNext = real_amount => {
				setPopBox(prevState => ({
					...prevState,
					isOpen: false
				}));
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqCryptoPay?ChannelId=${selGroup.channelId}&Amount=${real_amount}`
				);
				window.location.reload();
			};

			const real_amount = _isConvert
				? confirmAmount * 1000
				: confirmAmount;
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: (
					<>
						<p>{i18n.lbl_ConfirmDeposit}</p>

						<div className="icon icon-BTC" />
						<div>
							<ul>
								<li className="text-org">
									{i18n.lbl_DepositAmount} :
								</li>
								<li>
									{number_format(real_amount, _isConvert)}
								</li>
							</ul>
						</div>
					</>
				),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="blue"
							onClick={() =>
								setPopBox(prevState => ({
									...prevState,
									isOpen: false
								}))
							}>
							{i18n.lbl_Cancel}
						</button>
						<button
							className="orange"
							onClick={RedirectToNext.bind(this, real_amount)}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)
			});
		}
	};

	return (
		<div className="depositModule active">
			<div className="title text-org icon icon-BTC">
				{`${i18n.lbl_CreditTime}: ${i18n[props.creditTimeKey]}`}
			</div>

			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectPayment}
				selected={selGroup.groupId}
				mainKey="deposit-full-cryptoPay-groupList"
				imgKey="groupName"
				idKey="groupId"
				prefixImgUrl={`${config.cloudImgURL}/SiteSkin/img/Payment/`}
				displayKey="payName"
				_isConvert={_isConvert}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={selGroup}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				msg={warning.msg}
				status={warning.status}
				EditAmount={EditAmount}
				payType="cryptoPay"
				tip={i18n.lbl_AmountTooltip?.replace(
					"{{0}}",
					selGroup?.minAmount
						? number_format(selGroup?.minAmount, _isConvert, 0)
						: 1
				)}
			/>
			<div className="btn-group">
				<button className="orange" onClick={ClickSubmit}>
					{i18n.lbl_Submit}
				</button>
			</div>
		</div>
	);
};

Main.propTypes = {
	paymentList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Main;
