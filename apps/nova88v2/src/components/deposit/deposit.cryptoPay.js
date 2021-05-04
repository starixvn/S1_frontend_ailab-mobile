import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import GroupList from "./deposit.groupList";
import AmountInput from "./deposit.amountInput";
import PageVerify from "./deposit.pageVerify";
import config from "../../config";
import { isConvert, number_format } from "../common/common";
import { useHandleAmount } from "../hook/useHandleAmount";
import path from "../../path";

export const Panel = props => props.children;

const Main = props => {
	const navigate = useNavigate();
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { paymentList } = props;
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [selGroupId, setSelGroupId] = useState(paymentList[0].groupId);

	const [pageVerify, setPageVerify] = useState(true);
	const curSelPayment = paymentList.find(el => el.groupId === selGroupId);

	const { amount, warning, EditAmount, VaildAmount } = useHandleAmount({
		currencyId: userInfo.currencyId,
		minAmount: curSelPayment?.minAmount,
		maxAmount: curSelPayment?.maxAmount,
		i18n,
		digits: 0
	});

	const SelectPayment = ({ groupInfo }) => {
		if (selGroupId !== groupInfo?.groupId) {
			setSelGroupId(() => groupInfo?.groupId);
		}
	};

	const ClickSubmit = () => {
		if (pageVerify) {
			const confirmAmount =
				curSelPayment.amountRule === 3 &&
				curSelPayment.amountList?.length > 0
					? amount / 1000
					: amount;

			const result = VaildAmount({ _amount: confirmAmount });

			if (result) {
				const RedirectToNext = real_amount => {
					setPopBox(prevState => ({
						...prevState,
						isOpen: false
					}));
					navigate(`/${userInfo.langId}/${path.deposit.root}`);
					window.open(
						`${config.openURL}/${userInfo.langId}/Cashier/DepositReqCryptoPay?ChannelId=${curSelPayment.channelId}&Amount=${real_amount}`
					);
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
									<li className="text-org">
										{i18n.lbl_ExchangeRate} :
									</li>
									<li>{curSelPayment.sellRate}</li>
									<li className="text-org">
										{i18n.lbl_ExchangeAmount} :
									</li>
									<li>
										{(real_amount / curSelPayment.sellRate)
											.toFixed(8)
											.replace(/\.0+$/, "")}
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
								onClick={RedirectToNext.bind(
									this,
									real_amount
								)}>
								{i18n.lbl_Submit}
							</button>
						</div>
					)
				});
			}
		}
	};

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	PageVerify(
		userInfo,
		i18n,
		setPopBox,
		navigate,
		setPageVerify,
		props.location.state?.paymentList?.length >= 0
	);

	return (
		<div className="depositModule active">
			<div className="title text-org icon icon-BTC">
				{`${i18n.lbl_CreditTime}: ${i18n[props.creditTimeKey]}`}
			</div>

			<GroupList
				title={i18n.lbl_PaymentModes}
				dataList={paymentList}
				SelectPayment={SelectPayment}
				selected={selGroupId}
				mainKey="deposit-full-cryptoPay-groupList"
				imgKey="payName"
				idKey="groupId"
				prefixImgUrl={`${config.cloudImgURL}/SiteSkin/img/Payment/`}
				displayKey="payName"
				_isConvert={_isConvert}
				showMinMaxHint={true}
			/>
			<AmountInput
				title={i18n.lbl_DepositAmount}
				channel={curSelPayment}
				i18n={i18n}
				_isConvert={_isConvert}
				amount={amount}
				msg={warning.msg}
				status={warning.status}
				EditAmount={EditAmount}
				payType="cryptoPay"
				tip={i18n.lbl_AmountTooltip?.replace(
					"{{0}}",
					curSelPayment?.minAmount
						? number_format(curSelPayment?.minAmount, _isConvert, 0)
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

Main.defaultProps = {
	location: {}
};

Main.propTypes = {
	location: PropTypes.objectOf(PropTypes.any)
};

export default Main;
