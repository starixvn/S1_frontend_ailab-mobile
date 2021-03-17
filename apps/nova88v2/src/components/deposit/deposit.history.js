import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
	i18nContext,
	popBoxContext,
	userInfoContext,
	bankSlipPopBoxContext
} from "Context";
import moment from "moment";
import { number_format, isConvert } from "../common/common";
import AUTO_FETCHING_DATA from "../../service/autoFetchingData";
import ReloadSpin from "../common/reloadSpin";
import api from "../../service/api";
import Detail from "./historyDetail";

const Panel = ({
	history,
	setHistory,
	pageInfo,
	setPageInfo,
	filterData,
	clickSubmit,
	submitFilter
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [processing, setProcessing] = useState(false);
	const { setbankSlipPopBox } = useContext(bankSlipPopBoxContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	AUTO_FETCHING_DATA(
		api.payment.GetDepositInfoHistory,
		filterData,
		pageInfo,
		setHistory,
		setPageInfo,
		setPopBox,
		processing,
		setProcessing,
		clickSubmit
	);

	const ClickCancel = transId => {
		const ClickSubmit = () => {
			setPopBox({ isOpen: false });
			api.payment.SetDepositCancel(transId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setHistory(prevState => {
								const newD = [...prevState];
								const idx = newD.findIndex(
									x => x.transId === transId
								);
								newD[idx].status = 5;
								return newD;
							});
						} else {
							setPopBox({
								isOpen: true,
								title: i18n.lbl_ImportantNote,
								content: res.data.message
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: i18n.msg_ApiServerError
						});
						setProcessing(false);
					}
				}
			);
		};

		const ClickPopBoxCancel = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			content: i18n.lbl_CancelConfirm,
			hasBtn: true,
			btnBar: (
				<div className="btn-group">
					<button className="white" onClick={ClickSubmit}>
						{i18n.lbl_Yes}
					</button>
					<button className="orange" onClick={ClickPopBoxCancel}>
						{i18n.lbl_No}
					</button>
				</div>
			)
		});
	};

	const SubmitProof = ({
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		refId
	}) => {
		const { currencyId, ...restBankInfo } = bankInfo;
		const { accountName, accountNo } = depositRep;
		setbankSlipPopBox(() => ({
			depositTime: `${moment().format("yyyy-MM-DDT")}${moment().format(
				"HH:mm"
			)}`,
			...restBankInfo,
			transId,
			accountNo,
			accountName,
			isOpen: true,
			real_amount: amount,
			amount: number_format(amount, _isConvert),
			picFileName,
			refId
		}));
	};

	const arr = history?.map(item => {
		return (
			<Detail
				key={`depositHistory-${item.transId}`}
				status={item.status}
				transId={item.transId}
				createTime={item.createTime}
				amount={item.amount}
				depositType={item.depositType}
				_isConvert={_isConvert}
				ClickCancel={ClickCancel.bind(this, item.transId)}
				SubmitProof={SubmitProof.bind(this, { ...item })}
				i18n={i18n}
			/>
		);
	});

	let infoList = null;
	if (history?.length > 0) {
		infoList = <div className="infoList">{arr}</div>;
	} else {
		infoList = (
			<div className="nodata icon icon-nodata">
				<div className="txt-white">{i18n.msg_NoData}</div>
			</div>
		);
	}

	let subContent = null;
	if (history) {
		subContent = (
			<div className="recent active">
				<div className="recentTransactions">
					<ReloadSpin
						func={submitFilter.bind(this, {
							startDay: filterData?.StartDate,
							endDay: filterData?.EndDate,
							isUnix: true
						})}
					/>
				</div>
				{infoList}
			</div>
		);
	}

	return subContent;
};

Panel.defaultProps = {
	history: null,
	setHistory: null,
	pageInfo: { pageNumber: 0, totalPages: 0 },
	setPageInfo: null,
	filterData: {},
	clickSubmit: null,
	submitFilter: null
};

Panel.propTypes = {
	history: PropTypes.arrayOf(PropTypes.object),
	setHistory: PropTypes.func,
	pageInfo: PropTypes.objectOf(PropTypes.number),
	setPageInfo: PropTypes.func,
	filterData: PropTypes.objectOf(PropTypes.number),
	clickSubmit: PropTypes.bool,
	submitFilter: PropTypes.func
};

export default Panel;
